var number_sort = function(a,b) { return a - b; };

function RNAUtilities() {
    var self = this;

    // the brackets to use when constructing dotbracket strings
    // with pseudoknots
    self.bracket_left =  "([{<ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    self.bracket_right = ")]}>abcdefghijklmnopqrstuvwxyz".split("");

    self.inverse_brackets = function(bracket) {
        res = {};
        for (i = 0; i < bracket.length; i++) {
            res[bracket[i]] = i;
        }
        return res;
    };

    self.maximumMatching = function maximumMatching(pt){
        // Courtesy of the great Ronny Lorenz

        var n = pt[0];
        var TURN = 0;    //minimal number of nucleotides in the hairpin

        /* array init */
        mm = new Array(n + 1);
        for(var i = 0; i <= n; i++){
            mm[i] = new Array(n + 1);
            for(var j = i; j <= n; j++)
            mm[i][j] = 0;
        }
        var maximum = 0;

        /* actual computation */
        for(var i = n - TURN - 1; i > 0; i--)

        for(var j = i + TURN + 1; j <= n; j++){
            maximum = mm[i][j-1];

            for(var l = j - TURN - 1; l >= i; l--) {
                if(pt[l] === j) {

                    // we have a base pair here
                    maximum = Math.max(maximum, ((l > i) ? mm[i][l-1] : 0) + 1 + ((j - l - 1 > 0) ? mm[l+1][j-1] : 0));
                }
            }

            mm[i][j] = maximum;
        }

        maximum = mm[1][n];

        return mm;
    };

    self.backtrackMaximumMatching = function(mm, old_pt) {
      var pt = Array.apply(null, 
                           Array(mm.length)).map(function() { return 0 }); 
                           //create an array containing zeros

      self.mm_bt(mm, pt, old_pt, 1, mm.length-1);
      return pt;
    }

    self.mm_bt = function(mm, pt, old_pt, i, j){
        // Create a pairtable from the backtracking
      var maximum = mm[i][j];
      var TURN = 0;

      if(j - i - 1 < TURN) return;    /* no more pairs */

      if(mm[i][j-1] == maximum){      /* j is unpaired */
        self.mm_bt(mm, pt, old_pt, i, j-1);
        return;
      }

      for(var q = j - TURN - 1; q >= i; q--){  /* j is paired with some q */
        if (old_pt[j] !== q)
            continue;

        var left_part     = (q > i) ? mm[i][q-1] : 0;
        var enclosed_part = (j - q - 1 > 0) ? mm[q+1][j-1] : 0;

        if(left_part + enclosed_part + 1 == maximum) {
            // there's a base pair between j and q
            pt[q] = j;
            pt[j] = q;

            if(i < q) 
                self.mm_bt(mm, pt, old_pt, i, q - 1);

            self.mm_bt(mm, pt, old_pt, q + 1, j - 1);
            return;
        }
      }

      //alert(i + "," + j + ": backtracking failed!");
      console.log("FAILED!!!" + i + "," + j + ": backtracking failed!");

    };

    self.dotbracketToPairtable = function(dotbracket) {
        // create an array and initialize it to 0
        pt = Array.apply(null, new Array(dotbracket.length + 1)).map(Number.prototype.valueOf,0);
        
        //  the first element is always the length of the RNA molecule
        pt[0] = dotbracket.length;

        // store the pairing partners for each symbol
        stack = {};
        for (i = 0; i < self.bracket_left.length; i++) {
            stack[i] = [];
        }

        // lookup the index of each symbol in the bracket array
        inverse_bracket_left = self.inverse_brackets(self.bracket_left);
        inverse_bracket_right = self.inverse_brackets(self.bracket_right);

        for (i = 0; i < dotbracket.length; i++) {
            a = dotbracket[i];
            ni = i + 1;

            if (a == '.') {
                // unpaired
                pt[ni] = 0;
            } else {
                if (a in inverse_bracket_left) {
                    // open pair?
                    stack[inverse_bracket_left[a]].push(ni);
                } else if (a in inverse_bracket_right){
                    // close pair?
                    j = stack[inverse_bracket_right[a]].pop();

                    pt[ni] = j;
                    pt[j] = ni;
                } else {
                    throw "Unknown symbol in dotbracket string";
                }
            }
        }

        for (key in stack) {
            if (stack[key].length > 0) {
                throw "Unmatched base at position " + stack[key][0];
            }
        }

        return pt;
    };

    self.insert_into_stack = function(stack, i, j) {
        var k = 0;
        while (stack[k].length > 0 && stack[k][stack[k].length - 1] < j) {
            k += 1;
        }

        stack[k].push(j);
        return k;
    };

    self.delete_from_stack = function(stack, j) {
        var k = 0;
        while (stack[k].length === 0 || stack[k][stack[k].length-1] != j) {
            k += 1;
        }
        stack[k].pop();
        return k;
    };

    self.pairtableToDotbracket = function(pt) {
        // store the pairing partners for each symbol
        stack = {};
        for (i = 0; i < pt[0]; i++) {
            stack[i] = [];
        }

        seen = {};
        res = "";
        for (i = 1; i < pt[0] + 1; i++) {
            if (pt[i] !== 0 && pt[i] in seen) {
                throw "Invalid pairtable contains duplicate entries";
            }
            seen[pt[i]] = true;

            if (pt[i] === 0) {
                res += '.';
            } else {
                if (pt[i] > i) {
                    res += self.bracket_left[self.insert_into_stack(stack, i, pt[i])];
                } else {
                    res += self.bracket_right[self.delete_from_stack(stack, i)];
                }
            }
        }

        return res;
    };

    self.find_unmatched = function(pt, from, to) {
        /*
         * Find unmatched nucleotides in this molecule.
         */
        var to_remove = [];
        var unmatched = [];

        var orig_from = from;
        var orig_to = to;

        for (var i = from; i <= to; i++)
            if (pt[i] !== 0 && (pt[i] < from || pt[i] > to))
                unmatched.push([i,pt[i]]);

        for (i = orig_from; i <= orig_to; i++) {
            while (pt[i] === 0 && i <= orig_to) i++;

            to = pt[i];

            while (pt[i] === to) {
                i++;
                to--;
            }
            
            to_remove = to_remove.concat(self.find_unmatched(pt, i, to));
        }

        if (unmatched.length > 0)
            to_remove.push(unmatched);

        return to_remove;
    };

    self.removePseudoknotsFromPairtable = function(pt) {
        /* Remove the pseudoknots from this structure in such a fashion
         * that the least amount of base-pairs need to be broken
         *
         * The pairtable is manipulated in place and a list of tuples
         * indicating the broken base pairs is returned.
         */

        var mm = self.maximumMatching(pt);
        var new_pt = self.backtrackMaximumMatching(mm, pt);
        var removed = [];

        for (var i = 1; i < pt.length; i++) {
            if (pt[i] < i)
                continue;

            if (new_pt[i] != pt[i])  {
                removed.push([i, pt[i]]);
                pt[pt[i]] = 0;
                pt[i] = 0;
            }
        }

        return removed;
    };

}

rnaUtilities = new RNAUtilities();
