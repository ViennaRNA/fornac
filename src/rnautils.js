var numberSort = function(a,b) { return a - b; };

function arraysEqual(a, b) {
    // courtesy of 
    // http://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
    simpleXyCoordinates = function(pair_table)
    {
        var INIT_ANGLE=0.;     /* initial bending angle */
        var INIT_X = 100.;     /* coordinate of first digit */
        var INIT_Y = 100.;     /* see above */
        var RADIUS =  15.;

        var x = [], y = [];

        var i, len;
        var  alpha;

        len = pair_table[0];
        var angle = Array.apply(null, new Array(len+5)).map(Number.prototype.valueOf,0); 
        var loop_size = Array.apply(null, new Array(16+Math.floor(len/5)))
        .map(Number.prototype.valueOf, 0); 
        var stack_size = Array.apply(null, new Array(16+Math.floor(len/5)))
        .map(Number.prototype.valueOf, 0); 

        lp = stk = 0;
        var PIHALF = Math.PI / 2;


        loop = function(i, j, pair_table)
        /* i, j are the positions AFTER the last pair of a stack; i.e
           i-1 and j+1 are paired. */
        {
            var count = 2;   /* counts the VERTICES of a loop polygon; that's
                                NOT necessarily the number of unpaired bases!
                                Upon entry the loop has already 2 vertices, namely
                                the pair i-1/j+1.  */

            var    r = 0, bubble = 0; /* bubble counts the unpaired digits in loops */

            var    i_old, partner, k, l, start_k, start_l, fill, ladder;
            var    begin, v, diff;
            var  polygon;

            var remember = Array.apply(null, new Array((1+Math.floor((j-i)/5)*2))).map(Number.prototype.valueOf, 0);

            i_old = i-1, j++;         /* j has now been set to the partner of the
                                         previous pair for correct while-loop
                                         termination.  */
            while (i != j) {
                partner = pair_table[i];
                if ((!partner) || (i==0))
                    i++, count++, bubble++;
                else {
                    count += 2;
                    k = i, l = partner;    /* beginning of stack */
                    remember[++r] = k;
                    remember[++r] = l;
                    i = partner+1;         /* next i for the current loop */

                    start_k = k, start_l = l;
                    ladder = 0;
                    do {
                        k++, l--, ladder++;        /* go along the stack region */
                    }
                    while (pair_table[k] == l);

                    fill = ladder-2;
                    if (ladder >= 2) {
                        angle[start_k+1+fill] += PIHALF;   /*  Loop entries and    */
                        angle[start_l-1-fill] += PIHALF;   /*  exits get an        */
                        angle[start_k]        += PIHALF;   /*  additional PI/2.    */
                        angle[start_l]        += PIHALF;   /*  Why ? (exercise)    */
                        if (ladder > 2) {
                            for (; fill >= 1; fill--) {
                                angle[start_k+fill] = Math.PI;    /*  fill in the angles  */
                                angle[start_l-fill] = Math.PI;    /*  for the backbone    */
                            }
                        }
                    }
                    stack_size[++stk] = ladder;
                    loop(k, l, pair_table);
                }
            }

            polygon = Math.PI*(count-2)/count; /* bending angle in loop polygon */
            remember[++r] = j;
            begin = i_old < 0 ? 0 : i_old;
            for (v = 1; v <= r; v++) {
                diff  = remember[v]-begin;
                for (fill = 0; fill <= diff; fill++)
                angle[begin+fill] += polygon;
                if (v > r)
                    break;
                begin = remember[++v];
            }
            loop_size[++lp] = bubble;
        }

        loop(0, len+1, pair_table);
        loop_size[lp] -= 2;     /* correct for cheating with function loop */

        alpha = INIT_ANGLE;
        x[0]  = INIT_X;
        y[0]  = INIT_Y;

        poss = [];

        poss.push([x[0], y[0]]);
        for (i = 1; i < len; i++) {
            x[i] = x[i-1]+RADIUS*Math.cos(alpha);
            y[i] = y[i-1]+RADIUS*Math.sin(alpha);

            poss.push([x[i], y[i]]);
            alpha += Math.PI-angle[i+1];
        }

        return poss;
    }
    if (a === b) return true;
    if (a === null || b === null) return false;
    if (a.length != b.length) return false;

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

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
