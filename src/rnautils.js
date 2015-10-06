var numberSort = function(a,b) { return a - b; };

function RNAUtilities() {
    var self = this;

    // the brackets to use when constructing dotbracket strings
    // with pseudoknots
    self.bracketLeft =  "([{<ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    self.bracketRight = ")]}>abcdefghijklmnopqrstuvwxyz".split("");

    self.inverseBrackets = function(bracket) {
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

    self.backtrackMaximumMatching = function(mm, oldPt) {
      var pt = Array.apply(null, 
                           Array(mm.length)).map(function() { return 0 }); 
                           //create an array containing zeros

      self.mmBt(mm, pt, oldPt, 1, mm.length-1);
      return pt;
    }

    self.mmBt = function(mm, pt, oldPt, i, j){
        // Create a pairtable from the backtracking
      var maximum = mm[i][j];
      var TURN = 0;

      if(j - i - 1 < TURN) return;    /* no more pairs */

      if(mm[i][j-1] == maximum){      /* j is unpaired */
        self.mmBt(mm, pt, oldPt, i, j-1);
        return;
      }

      for(var q = j - TURN - 1; q >= i; q--){  /* j is paired with some q */
        if (oldPt[j] !== q)
            continue;

        var leftPart     = (q > i) ? mm[i][q-1] : 0;
        var enclosedPart = (j - q - 1 > 0) ? mm[q+1][j-1] : 0;

        if(leftPart + enclosedPart + 1 == maximum) {
            // there's a base pair between j and q
            pt[q] = j;
            pt[j] = q;

            if(i < q) 
                self.mmBt(mm, pt, oldPt, i, q - 1);

            self.mmBt(mm, pt, oldPt, q + 1, j - 1);
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
        for (i = 0; i < self.bracketLeft.length; i++) {
            stack[i] = [];
        }

        // lookup the index of each symbol in the bracket array
        inverseBracketLeft = self.inverseBrackets(self.bracketLeft);
        inverseBracketRight = self.inverseBrackets(self.bracketRight);

        for (i = 0; i < dotbracket.length; i++) {
            a = dotbracket[i];
            ni = i + 1;

            if (a == '.') {
                // unpaired
                pt[ni] = 0;
            } else {
                if (a in inverseBracketLeft) {
                    // open pair?
                    stack[inverseBracketLeft[a]].push(ni);
                } else if (a in inverseBracketRight){
                    // close pair?
                    j = stack[inverseBracketRight[a]].pop();

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

    self.insertIntoStack = function(stack, i, j) {
        var k = 0;
        while (stack[k].length > 0 && stack[k][stack[k].length - 1] < j) {
            k += 1;
        }

        stack[k].push(j);
        return k;
    };

    self.deleteFromStack = function(stack, j) {
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
                    res += self.bracketLeft[self.insertIntoStack(stack, i, pt[i])];
                } else {
                    res += self.bracketRight[self.deleteFromStack(stack, i)];
                }
            }
        }

        return res;
    };

    self.findUnmatched = function(pt, from, to) {
        /*
         * Find unmatched nucleotides in this molecule.
         */
        var toRemove = [];
        var unmatched = [];

        var origFrom = from;
        var origTo = to;

        for (var i = from; i <= to; i++)
            if (pt[i] !== 0 && (pt[i] < from || pt[i] > to))
                unmatched.push([i,pt[i]]);

        for (i = origFrom; i <= origTo; i++) {
            while (pt[i] === 0 && i <= origTo) i++;

            to = pt[i];

            while (pt[i] === to) {
                i++;
                to--;
            }
            
            toRemove = toRemove.concat(self.findUnmatched(pt, i, to));
        }

        if (unmatched.length > 0)
            toRemove.push(unmatched);

        return toRemove;
    };

    self.removePseudoknotsFromPairtable = function(pt) {
        /* Remove the pseudoknots from this structure in such a fashion
         * that the least amount of base-pairs need to be broken
         *
         * The pairtable is manipulated in place and a list of tuples
         * indicating the broken base pairs is returned.
         */

        var mm = self.maximumMatching(pt);
        var newPt = self.backtrackMaximumMatching(mm, pt);
        var removed = [];

        for (var i = 1; i < pt.length; i++) {
            if (pt[i] < i)
                continue;

            if (newPt[i] != pt[i])  {
                removed.push([i, pt[i]]);
                pt[pt[i]] = 0;
                pt[i] = 0;
            }
        }

        return removed;
    };

}
rnaUtilities = new RNAUtilities();
