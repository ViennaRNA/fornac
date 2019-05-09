var numberSort = function(a,b) { return a - b; };

export function arraysEqual(a, b) {
    // courtesy of 
    // http://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
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

export function RNAUtilities() {
    var self = this;

    // the brackets to use when constructing dotbracket strings
    // with pseudoknots
    self.bracketLeft =  "([{<ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    self.bracketRight = ")]}>abcdefghijklmnopqrstuvwxyz".split("");

    self.inverseBrackets = function(bracket) {
        var res = {};
        for (var i = 0; i < bracket.length; i++) {
            res[bracket[i]] = i;
        }
        return res;
    };

    self.maximumMatching = function maximumMatching(pt){
        // Courtesy of the great Ronny Lorenz

        var n = pt[0];
        var TURN = 0;    //minimal number of nucleotides in the hairpin

        /* array init */
        var mm = new Array(n + 1);
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
      console.log('FAILED!!!' + i + ',' + j + ': backtracking failed!');

    };

    self.dotbracketToPairtable = function(dotbracket) {
        // create an array and initialize it to 0
        var pt = Array.apply(null, new Array(dotbracket.length + 1)).map(Number.prototype.valueOf,0);
        
        //  the first element is always the length of the RNA molecule
        pt[0] = dotbracket.length;

        // store the pairing partners for each symbol
        var stack = {};
        for (var i = 0; i < self.bracketLeft.length; i++) {
            stack[i] = [];
        }

        // lookup the index of each symbol in the bracket array
        var inverseBracketLeft = self.inverseBrackets(self.bracketLeft);
        var inverseBracketRight = self.inverseBrackets(self.bracketRight);

        for (var i = 0; i < dotbracket.length; i++) {
            var a = dotbracket[i];
            var ni = i + 1;

            if (a == '.' || a == 'o') {
                // unpaired
                pt[ni] = 0;
            } else {
                if (a in inverseBracketLeft) {
                    // open pair?
                    stack[inverseBracketLeft[a]].push(ni);
                } else if (a in inverseBracketRight){
                    // close pair?
                    var j = stack[inverseBracketRight[a]].pop();

                    pt[ni] = j;
                    pt[j] = ni;
                } else {
                    throw "Unknown symbol in dotbracket string";
                }
            }
        }

        for (var key in stack) {
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
        var stack = {};
        for (var i = 0; i < pt[0]; i++) {
            stack[i] = [];
        }

        var seen = {};
        var res = "";
        var i;
        for (var i = 1; i < pt[0] + 1; i++) {
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
        var i;

        for (var i = from; i <= to; i++)
            if (pt[i] !== 0 && (pt[i] < from || pt[i] > to))
                unmatched.push([i,pt[i]]);

        for (var i = origFrom; i <= origTo; i++) {
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

    self.ptToElements = function(pt, level, i, j, dotBracketBreaks) {
        /* Convert a pair table to a list of secondary structure 
         * elements:
         *
         * [['s',1,[2,3]]
         *
         * The 's' indicates that an element can be a stem. It can also be
         * an interior loop ('i'), a hairpin loop ('h') or a multiloop ('m')
         *
         * The second number (1 in this case) indicates the depth or
         * how many base pairs have to be broken to get to this element.
         *
         * Finally, there is the list of nucleotides which are part of
         * of this element.
         */
        var elements = [];
        var u5 = [i-1];
        var u3 = [j+1];

        if (arguments.length < 5)
            dotBracketBreaks = [];

        if (i > j)
            return [];
            
            //iterate over the unpaired regions on either side
            //this is either 5' and 3' unpaired if level == 0
            //or an interior loop or a multiloop
            for (; pt[i] === 0; i++) { u5.push(i); }
            for (; pt[j] === 0; j--) { u3.push(j); }

            if (i > j) {
                //hairpin loop or one large unpaired molecule
                u5.push(i);
                if (level === 0)
                    return [['e',level, u5.sort(numberSort)]];
                else {
                    // check to see if we have chain breaks due
                    // to multiple strands in the input
                    var external = false;
                    var left = [];
                    var right = [];
                    for (var k = 0; k < u5.length; k++) {
                        if (external)
                            right.push(u5[k]);
                        else
                            left.push(u5[k]);

                        if (dotBracketBreaks.indexOf(u5[k]) >= 0)
                            external = true;
                    }

                    if (external) {
                        return [['h',level, u5.sort(numberSort)]];
                    }
                    else
                        // if not, this is a simple hairpin loop
                        return [['h',level, u5.sort(numberSort)]];
                }
            }

            if (pt[i] != j) {
                //multiloop
                var m = u5;
                var k = i;

                // the nucleotide before and the starting nucleotide
                m.push(k);
                while (k <= j) {
                    // recurse into a stem
                    elements = elements.concat(self.ptToElements(pt, level, k, pt[k], dotBracketBreaks));

                    // add the nucleotides between stems
                    m.push(pt[k]);
                    k = pt[k] + 1;
                    for (; pt[k] === 0 && k <= j; k++) { m.push(k);}
                    m.push(k);
                }
                m.pop();
                m = m.concat(u3);
                
                if (m.length > 0) {
                    if (level === 0)
                        elements.push(['e', level, m.sort(numberSort)]);
                    else
                        elements.push(['m', level, m.sort(numberSort)]);
                }
                
                return elements;
            }

            if (pt[i] === j) {
                //interior loop
                u5.push(i);
                u3.push(j);

                var combined = u5.concat(u3);
                if (combined.length > 4) {
                    if (level === 0)
                        elements.push(['e',level, u5.concat(u3).sort(numberSort)]);
                    else
                        elements.push(['i',level, u5.concat(u3).sort(numberSort)]);
                }
            } 

            var s = [];
            //go through the stem
            while (pt[i] === j && i < j) {
                //one stem
                s.push(i);
                s.push(j);

                i += 1;
                j -= 1;

                level += 1;
            }

            u5 = [i-1];
            u3 = [j+1];
            elements.push(['s', level, s.sort(numberSort)]);

        return elements.concat(self.ptToElements(pt, level, i, j, dotBracketBreaks));
    };

}

export var rnaUtilities = new RNAUtilities();

export function ColorScheme(colorsText) {
    var self = this;
    self.colorsText = colorsText;

    self.parseRange = function(rangeText) {
        //parse a number range such as 1-10 or 3,7,9 or just 7
        var parts = rangeText.split(',')
        var nums = [];

        for (var i = 0; i < parts.length; i++) {
            //could be 1 or 10-11  or something like that
            var parts1 = parts[i].split('-');

            if (parts1.length == 1)
                nums.push(parseInt(parts1[0]));
            else if (parts1.length == 2) {
                var from = parseInt(parts1[0]);
                var to = parseInt(parts1[1]);

                // add each number in this range
                for (var j = from; j <= to; j++) 
                    nums.push(j)
            } else {
                console.log('Malformed range (too many dashes):', rangeText);
            }
        }

        return nums;
    }

    self.parseColorText = function(colorText) {
        /* Parse the text of an RNA color string. Instructions and description
         * of the format are given below.
         *
         * The return is a json double dictionary indexed first by the 
         * molecule name, then by the nucleotide. This is then applied
         * by force.js to the RNAs it is displaying. When no molecule
         * name is specified, the color is applied to all molecules*/
        var lines = colorText.split('\n');
        var currMolecule = '';
        var counter = 1;
        var colorsJson = {colorValues: {'':{}}, range:['white', 'steelblue']};
        var domainValues = [];


        for (var i = 0; i < lines.length; i++) {

            if (lines[i][0] == '>') {
                // new molecule
                currMolecule = lines[i].trim().slice(1);
                counter = 1;

                colorsJson.colorValues[currMolecule] = {};
                continue;
            }

            let words = lines[i].trim().split(/[\s]+/);

            for (var j = 0; j < words.length; j++) {
                if (isNaN(words[j])) {
                    if (words[j].search('range') === 0) {
                        //there's a color scale in this entry
                        let parts = words[j].split('=');
                        let partsRight = parts[1].split(':')
                        colorsJson.range = [partsRight[0], partsRight[1]];
                        continue;
                    }

                    if (words[j].search('domain') == 0) {
                        //there's a color scale in this entry
                        let parts = words[j].split('=');
                        let partsRight = parts[1].split(':')
                        colorsJson.domain = [partsRight[0], partsRight[1]];
                        continue;
                    }

                    // it's not a number, should be a combination 
                    // of a number (nucleotide #) and a color
                    let parts = words[j].split(':');
                    let nums = self.parseRange(parts[0]);
                    let color = parts[1]

                    for (var k = 0; k < nums.length; k++) {
                        if (isNaN(color)) {
                            colorsJson.colorValues[currMolecule][nums[k]] = color;
                        } else {
                            colorsJson.colorValues[currMolecule][nums[k]] = +color;
                            domainValues.push(Number(color));
                        }
                    }
                } else {
                    //it's a number, so we add it to the list of values
                    //seen for this molecule
                    colorsJson.colorValues[currMolecule][counter] = Number(words[j]);
                    counter += 1;

                    domainValues.push(Number(words[j]));
                }
            }
        }

        if (!('domain' in colorsJson))
            colorsJson.domain = [Math.min.apply(null, domainValues), Math.max.apply(null, domainValues)];

        self.colorsJson = colorsJson;

        return self;
    };

    self.normalizeColors = function() {
        /* 
         * Normalize the passed in values so that they range from
         * 0 to 1
         */
        var value;

        for (var moleculeName in self.colorsJson) {
            var minNum = Number.MAX_VALUE;
            var maxNum = Number.MIN_VALUE;

            // iterate once to find the min and max values;
            for (var resnum in self.colorsJson.colorValues[moleculeName]) {
                value = self.colorsJson.colorValues[moleculeName][resnum];
                if (typeof value == 'number') {
                    if (value < minNum)
                        minNum = value;
                    if (value > maxNum)
                        maxNum = value;
                }
            }

            // iterate again to normalize
            for (resnum in self.colorsJson.colorValues[moleculeName]) {
                value = self.colorsJson.colorValues[moleculeName][resnum];
                if (typeof value == 'number') {
                    self.colorsJson.colorValues[moleculeName][resnum] = (value - minNum ) / (maxNum - minNum);
                }
            }
        }

        return self;
    };

    self.parseColorText(self.colorsText);
    return self;
}
