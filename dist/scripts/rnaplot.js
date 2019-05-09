(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["rnaplot"] = factory();
	else
		root["rnaplot"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(26);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ProteinGraph = ProteinGraph;
	exports.RNAGraph = RNAGraph;
	exports.moleculesToJson = moleculesToJson;

	var _rnautils = __webpack_require__(2);

	var _slugid = __webpack_require__(3);

	var _slugid2 = _interopRequireDefault(_slugid);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var numberSort = function numberSort(a, b) {
	    return a - b;
	};

	function isNormalInteger(str) {
	    //http://stackoverflow.com/a/10834843/899470
	    return (/^\+?(0|[1-9]\d*)$/.test(str)
	    );
	}

	if (typeof String.prototype.trim === 'undefined') {
	    String.prototype.trim = function () {
	        return String(this).replace(/^\s+|\s+$/g, '');
	    };
	}

	function ProteinGraph(structName, size, uid) {
	    var self = this;

	    self.type = 'protein';
	    self.size = size;
	    self.nodes = [{ 'name': 'P',
	        'num': 1,
	        'radius': 3 * Math.sqrt(size),
	        'rna': self,
	        'nodeType': 'protein',
	        'structName': structName,
	        'elemType': 'p',
	        'size': size,
	        'uid': _slugid2.default.nice() }];

	    self.links = [];
	    self.uid = _slugid2.default.nice();

	    self.addUids = function (uids) {
	        for (var i = 0; i < uids.length; i++) {
	            self.nodes[i].uid = uids[i];
	        }return self;
	    };

	    self.getUids = function () {
	        /* Get the positions of each node so that they
	         * can be passed to elementsToJson later
	         */
	        uids = [];
	        for (var i = 0; i < self.dotbracket.length; i++) {
	            uids.push(self.nodes[i].uid);
	        }return uids;
	    };
	}

	function RNAGraph(seq, dotbracket, structName, startNumber) {
	    var self = this;

	    self.type = 'rna';
	    self.circularizeExternal = false;

	    if (arguments.length === 0) {
	        self.seq = '';
	        self.dotbracket = '';
	        self.structName = '';
	    } else {
	        self.seq = seq;
	        self.dotbracket = dotbracket; //i.e. ..((..))..
	        self.structName = structName;
	    }

	    if (arguments.length < 4) {
	        startNumber = 1;
	    }

	    self.circular = false;

	    if (self.dotbracket.length > 0 && self.dotbracket[self.dotbracket.length - 1] == '*') {
	        //circular RNA
	        self.dotbracket = self.dotbracket.slice(0, self.dotbracket.length - 1);
	        self.circular = true;
	    }

	    self.uid = _slugid2.default.nice();

	    self.elements = []; //store the elements and the 
	    //nucleotides they contain
	    self.pseudoknotPairs = [];
	    self.nucsToNodes = {};

	    self.addUids = function (uids) {
	        var nucleotideNodes = self.nodes.filter(function (d) {
	            return d.nodeType == 'nucleotide';
	        });

	        for (var i = 0; i < uids.length && i < nucleotideNodes.length; i++) {
	            nucleotideNodes[i].uid = uids[i];
	        }

	        return self;
	    };

	    self.computePairtable = function () {
	        self.pairtable = _rnautils.rnaUtilities.dotbracketToPairtable(self.dotbracket);
	    };

	    self.removeBreaks = function (targetString) {
	        // Remove all chain breaks (denoted with a '&', which indicate
	        // that the input represents more than one strand)
	        var breaks = [];
	        var breakIndex = -1;

	        while ((breakIndex = targetString.indexOf('&')) >= 0) {
	            breaks.push(breakIndex);
	            targetString = targetString.substring(0, breakIndex) + targetString.substring(breakIndex + 1, targetString.length);
	        }

	        return { targetString: targetString, breaks: breaks };
	    };

	    var ret = self.removeBreaks(self.dotbracket);
	    self.dotbracket = ret.targetString;
	    self.dotBracketBreaks = ret.breaks;

	    ret = self.removeBreaks(self.seq);
	    self.seq = ret.targetString;
	    self.seqBreaks = ret.breaks;

	    self.calculateStartNumberArray = function () {
	        self.startNumberArray = [];
	        var breaks = 0;

	        for (var i = 0; i < self.dotbracket.length; i++) {
	            self.startNumberArray.push(startNumber);

	            if (self.dotbracket[i] == 'o') {
	                startNumber = -i;
	            }
	        }
	    };

	    self.calculateStartNumberArray();

	    self.rnaLength = self.dotbracket.length;

	    if (!(0, _rnautils.arraysEqual)(self.dotBracketBreaks, self.seqBreaks)) {
	        console.log('WARNING: Sequence and structure breaks not equal');
	        console.log('WARNING: Using the breaks in the structure');
	    }

	    self.computePairtable();

	    self.addPositions = function (nodeType, positions) {
	        var labelNodes = self.nodes.filter(function (d) {
	            return d.nodeType == nodeType;
	        });

	        for (var i = 0; i < labelNodes.length; i++) {
	            labelNodes[i].x = positions[i][0];
	            labelNodes[i].px = positions[i][0];
	            labelNodes[i].y = positions[i][1];
	            labelNodes[i].py = positions[i][1];
	        }

	        return self;
	    };

	    self.breakNodesToFakeNodes = function () {
	        // convert all the nodes following breaks to fake nodes
	        var labelNodes = self.nodes.filter(function (d) {
	            return d.nodeType == 'nucleotide';
	        });

	        // if a node was an artifical break node, convert it to a middle
	        for (var i = 0; i < labelNodes.length; i++) {
	            if (self.dotbracket[i] == 'o') labelNodes[i].nodeType = 'middle';
	        }

	        var _loop = function _loop(_i) {
	            broken = false;

	            // change the elemType of the other nodes in the element containing
	            // the break

	            for (var j = 0; j < self.elements[_i][2].length; j++) {
	                if (self.dotBracketBreaks.indexOf(self.elements[_i][2][j]) >= 0) broken = true;
	            }

	            if (broken) {
	                self.elements[_i][2].map(function (x) {
	                    if (x == 0) return;
	                    self.nodes[x - 1].elemType = 'e';
	                });
	            } else {
	                self.elements[_i][2].map(function (x) {
	                    if (x == 0) return;
	                    self.nodes[x - 1].elemType = self.elements[_i][0];
	                });
	            }
	        };

	        for (var _i = 0; _i < self.elements.length; _i++) {
	            var broken;

	            _loop(_i);
	        }
	        return self;
	    };

	    self.getPositions = function (nodeType) {
	        var positions = [];
	        var nucleotideNodes = self.nodes.filter(function (d) {
	            return d.nodeType == nodeType;
	        });

	        for (var i = 0; i < nucleotideNodes.length; i++) {
	            positions.push([nucleotideNodes[i].x, nucleotideNodes[i].y]);
	        }return positions;
	    };

	    self.getUids = function () {
	        /* Get the positions of each node so that they
	         * can be passed to elementsToJson later
	         */
	        var uids = [];
	        for (var i = 0; i < self.dotbracket.length; i++) {
	            uids.push(self.nodes[i].uid);
	        }return uids;
	    };

	    self.reinforceStems = function () {
	        var pt = self.pairtable;
	        var relevantElements = self.elements.filter(function (d) {
	            return d[0] == 's' && d[2].length >= 4;
	        });

	        for (var i = 0; i < relevantElements.length; i++) {
	            var allNucs = relevantElements[i][2];
	            var _nucs = allNucs.slice(0, allNucs.length / 2);

	            for (var j = 0; j < _nucs.length - 1; j++) {
	                self.addFakeNode([_nucs[j], _nucs[j + 1], pt[_nucs[j + 1]], pt[_nucs[j]]]);
	            }
	        }

	        return self;
	    };

	    self.reinforceLoops = function () {
	        /* 
	         * Add a set of fake nodes to enforce the structure
	         */
	        var filterNucs = function filterNucs(d) {
	            return d !== 0 && d <= self.dotbracket.length;
	        };

	        for (var i = 0; i < self.elements.length; i++) {
	            if (self.elements[i][0] == 's' || !self.circularizeExternal && self.elements[i][0] == 'e') continue;

	            var nucs = self.elements[i][2].filter(filterNucs);

	            if (self.elements[i][0] == 'e') {
	                var newNode1 = { 'name': '',
	                    'num': -3,
	                    //'radius': 18 * radius -6,
	                    'radius': 0,
	                    'rna': self,
	                    'nodeType': 'middle',
	                    'elemType': 'f',
	                    'nucs': [],
	                    'x': self.nodes[self.rnaLength - 1].x,
	                    'y': self.nodes[self.rnaLength - 1].y,
	                    'px': self.nodes[self.rnaLength - 1].px,
	                    'py': self.nodes[self.rnaLength - 1].py,
	                    'uid': _slugid2.default.nice() };
	                var newNode2 = { 'name': '',
	                    'num': -2,
	                    //'radius': 18 * radius -6,
	                    'radius': 0,
	                    'rna': self,
	                    'nodeType': 'middle',
	                    'elemType': 'f',
	                    'nucs': [],
	                    'x': self.nodes[0].x,
	                    'y': self.nodes[0].y,
	                    'px': self.nodes[0].px,
	                    'py': self.nodes[0].py,
	                    'uid': _slugid2.default.nice() };

	                nucs.push(self.nodes.length + 1);
	                nucs.push(self.nodes.length + 2);
	                self.nodes.push(newNode1);
	                self.nodes.push(newNode2);
	            }

	            self.addFakeNode(nucs);
	        }

	        return self;
	    };

	    self.updateLinkUids = function () {
	        for (var i = 0; i < self.links.length; i++) {
	            self.links[i].uid = self.links[i].source.uid + self.links[i].target.uid;
	        }

	        return self;
	    };

	    self.addFakeNode = function (nucs) {
	        var linkLength = 18; //make sure this is consistent with the value in force.js
	        var nodeWidth = 6;
	        var angle = 3.1415 * 2 / (2 * nucs.length);
	        var radius = linkLength / (2 * Math.tan(angle));

	        var fakeNodeUid = '';

	        for (var i = 0; i < nucs.length; i++) {
	            fakeNodeUid += self.nodes[nucs[i] - 1].uid;
	        }var newNode = { 'name': '',
	            'num': -1,
	            //'radius': 18 * radius -6,
	            'radius': radius,
	            'rna': self,
	            'nodeType': 'middle',
	            'elemType': 'f',
	            'nucs': nucs,
	            'uid': fakeNodeUid };
	        self.nodes.push(newNode);

	        var newX = 0;
	        var newY = 0;
	        var coordsCounted = 0;

	        angle = (nucs.length - 2) * 3.14159 / (2 * nucs.length);
	        radius = 0.5 / Math.cos(angle);

	        for (var j = 0; j < nucs.length; j++) {
	            if (nucs[j] === 0 || nucs[j] > self.dotbracket.length) continue;

	            //link to the center node
	            self.links.push({ 'source': self.nodes[nucs[j] - 1],
	                'target': self.nodes[self.nodes.length - 1],
	                'linkType': 'fake',
	                'value': radius,
	                'uid': _slugid2.default.nice() });

	            if (nucs.length > 4) {
	                //link across the loop
	                self.links.push({ 'source': self.nodes[nucs[j] - 1],
	                    'target': self.nodes[nucs[(j + Math.floor(nucs.length / 2)) % nucs.length] - 1],
	                    'linkType': 'fake',
	                    'value': radius * 2,
	                    'uid': _slugid2.default.nice() });
	            }

	            var ia = (nucs.length - 2) * 3.14159 / nucs.length;
	            var c = 2 * Math.cos(3.14159 / 2 - ia / 2);
	            //link to over-neighbor
	            self.links.push({ 'source': self.nodes[nucs[j] - 1],
	                'target': self.nodes[nucs[(j + 2) % nucs.length] - 1],
	                'linkType': 'fake',
	                'value': c });

	            // calculate the mean of the coordinats in this loop
	            // and place the fake node there
	            var fromNode = self.nodes[nucs[j] - 1];
	            if ('x' in fromNode) {
	                newX += fromNode.x;
	                newY += fromNode.y;

	                coordsCounted += 1;
	            }
	        }

	        if (coordsCounted > 0) {
	            // the nucleotides had set positions so we can calculate the position
	            // of the fake node
	            newNode.x = newX / coordsCounted;
	            newNode.y = newY / coordsCounted;
	            newNode.px = newNode.x;
	            newNode.py = newNode.y;
	        }

	        return self;
	    };

	    self.connectFakeNodes = function () {
	        var linkLength = 18;

	        // We want to be able to connect all of the fake nodes
	        // and create a structure consisting of just them
	        var filterOutNonFakeNodes = function filterOutNonFakeNodes(d) {
	            return d.nodeType == 'middle';
	        };

	        var nucsToNodes = {};
	        var fakeNodes = self.nodes.filter(filterOutNonFakeNodes);
	        var linked = {};

	        // initialize the nucleotides to nodes
	        for (var i = 1; i <= self.nodes.length; i++) {
	            nucsToNodes[i] = [];
	        }for (var i = 0; i < fakeNodes.length; i++) {
	            var thisNode = fakeNodes[i];

	            // each fake node represents a certain set of nucleotides (thisNode.nucs)
	            for (var j = 0; j < thisNode.nucs.length; j++) {
	                var thisNuc = thisNode.nucs[j];

	                // check to see if this nucleotide has been seen in another fake node
	                // if it has, then we add a link between the two nodes
	                for (var k = 0; k < nucsToNodes[thisNuc].length; k++) {
	                    if (JSON.stringify([nucsToNodes[thisNuc][k].uid, thisNode.uid].sort()) in linked) continue; //already linked

	                    var distance = nucsToNodes[thisNuc][k].radius + thisNode.radius;

	                    self.links.push({ 'source': nucsToNodes[thisNuc][k],
	                        'target': thisNode,
	                        'value': distance / linkLength,
	                        'linkType': 'fake_fake' });

	                    // note that we've already seen this link
	                    linked[JSON.stringify([nucsToNodes[thisNuc][k].uid, thisNode.uid].sort())] = true;
	                }

	                nucsToNodes[thisNuc].push(thisNode);
	            }
	        }

	        return self;
	    };

	    self.addExtraLinks = function (extraLinks) {
	        if (typeof extraLinks == 'undefined') return self;

	        for (var i = 0; i < extraLinks.length; i++) {
	            var source = self.getNodeFromNucleotides(extraLinks[i].from);
	            var target = self.getNodeFromNucleotides(extraLinks[i].to);

	            var newLink = { 'source': source, 'target': target, 'linkType': 'extra',
	                'extraLinkType': extraLinks[i].linkType, 'uid': _slugid2.default.nice() };

	            self.links.push(newLink);
	        }

	        return self;
	    };

	    self.elementsToJson = function () {
	        /* Convert a set of secondary structure elements to a json
	         * representation of the graph that can be used with d3's
	         * force-directed layout to generate a visualization of 
	         * the structure.
	         */
	        var pt = self.pairtable;
	        var elements = self.elements;

	        self.nodes = [];
	        self.links = [];

	        //create a reverse lookup so we can find out the type
	        //of element that a node is part of
	        var elemTypes = {};

	        //sort so that we count stems last
	        self.elements.sort();

	        for (var i = 0; i < self.elements.length; i++) {
	            var nucs = self.elements[i][2];
	            for (var j = 0; j < nucs.length; j++) {
	                elemTypes[nucs[j]] = self.elements[i][0];
	            }
	        }

	        for (var _i2 = 1; _i2 <= pt[0]; _i2++) {
	            var nodeName = self.seq[_i2 - 1];

	            if (self.dotBracketBreaks.indexOf(_i2 - 1) >= 0 || self.dotBracketBreaks.indexOf(_i2 - 2) >= 0) {
	                nodeName = '';
	            }

	            //create a node for each nucleotide
	            self.nodes.push({ 'name': nodeName,
	                'num': _i2 + self.startNumberArray[_i2 - 1] - 1,
	                'radius': 5,
	                'rna': self,
	                'nodeType': 'nucleotide',
	                'structName': self.structName,
	                'elemType': elemTypes[_i2],
	                'uid': _slugid2.default.nice(),
	                'linked': false });
	        }

	        for (var _i3 = 0; _i3 < self.nodes.length; _i3++) {
	            if (_i3 === 0) self.nodes[_i3].prevNode = null;else {
	                self.nodes[_i3].prevNode = self.nodes[_i3 - 1];
	            }

	            if (_i3 == self.nodes.length - 1) self.nodes[_i3].nextNode = null;else {
	                self.nodes[_i3].nextNode = self.nodes[_i3 + 1];
	            }
	        }

	        for (var _i4 = 1; _i4 <= pt[0]; _i4++) {

	            if (pt[_i4] !== 0) {
	                // base-pair links
	                self.links.push({ 'source': self.nodes[_i4 - 1],
	                    'target': self.nodes[pt[_i4] - 1],
	                    'linkType': 'basepair',
	                    'value': 1,
	                    'uid': _slugid2.default.nice() });
	            }

	            if (_i4 > 1) {
	                // backbone links
	                if (self.dotBracketBreaks.indexOf(_i4 - 1) === -1 && self.dotBracketBreaks.indexOf(_i4 - 2) == -1 && self.dotBracketBreaks.indexOf(_i4 - 3) == -1) {
	                    // there is no break in the strands here
	                    // we can add a backbone link
	                    self.links.push({ 'source': self.nodes[_i4 - 2],
	                        'target': self.nodes[_i4 - 1],
	                        'linkType': 'backbone',
	                        'value': 1,
	                        'uid': _slugid2.default.nice() });
	                    self.nodes[_i4 - 1].linked = true;
	                }
	            }
	        }

	        //add the pseudoknot links
	        for (var _i5 = 0; _i5 < self.pseudoknotPairs.length; _i5++) {
	            self.links.push({ 'source': self.nodes[self.pseudoknotPairs[_i5][0] - 1],
	                'target': self.nodes[self.pseudoknotPairs[_i5][1] - 1],
	                'linkType': 'pseudoknot',
	                'value': 1,
	                'uid': _slugid2.default.nice() });
	        }

	        if (self.circular) {
	            self.links.push({ 'source': self.nodes[0],
	                'target': self.nodes[self.rnaLength - 1],
	                'linkType': 'backbone',
	                'value': 1,
	                'uid': _slugid2.default.nice() });
	        }

	        return self;
	    };

	    self.ptToElements = function (pt, level, i, j) {
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
	        var u5 = [i - 1];
	        var u3 = [j + 1];

	        if (i > j) return [];

	        //iterate over the unpaired regions on either side
	        //this is either 5' and 3' unpaired if level == 0
	        //or an interior loop or a multiloop
	        for (; pt[i] === 0; i++) {
	            u5.push(i);
	        }
	        for (; pt[j] === 0; j--) {
	            u3.push(j);
	        }

	        if (i > j) {
	            //hairpin loop or one large unpaired molecule
	            u5.push(i);
	            if (level === 0) return [['e', level, u5.sort(numberSort)]];else {
	                // check to see if we have chain breaks due
	                // to multiple strands in the input
	                var external = false;
	                var left = [];
	                var right = [];
	                for (var k = 0; k < u5.length; k++) {
	                    if (external) right.push(u5[k]);else left.push(u5[k]);

	                    if (self.dotBracketBreaks.indexOf(u5[k]) >= 0) external = true;
	                }

	                if (external) {
	                    return [['h', level, u5.sort(numberSort)]];
	                } else
	                    // if not, this is a simple hairpin loop
	                    return [['h', level, u5.sort(numberSort)]];
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
	                elements = elements.concat(self.ptToElements(pt, level, k, pt[k]));

	                // add the nucleotides between stems
	                m.push(pt[k]);
	                k = pt[k] + 1;
	                for (; pt[k] === 0 && k <= j; k++) {
	                    m.push(k);
	                }
	                m.push(k);
	            }
	            m.pop();
	            m = m.concat(u3);

	            if (m.length > 0) {
	                if (level === 0) elements.push(['e', level, m.sort(numberSort)]);else elements.push(['m', level, m.sort(numberSort)]);
	            }

	            return elements;
	        }

	        if (pt[i] === j) {
	            //interior loop
	            u5.push(i);
	            u3.push(j);

	            var combined = u5.concat(u3);
	            if (combined.length > 4) {
	                if (level === 0) elements.push(['e', level, u5.concat(u3).sort(numberSort)]);else elements.push(['i', level, u5.concat(u3).sort(numberSort)]);
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

	        u5 = [i - 1];
	        u3 = [j + 1];
	        elements.push(['s', level, s.sort(numberSort)]);

	        return elements.concat(self.ptToElements(pt, level, i, j));
	    };

	    self.addLabels = function (startNumber, labelInterval) {
	        if (arguments.length === 0) {
	            startNumber = 1;
	            labelInterval = 10;
	        }

	        if (arguments.length === 1) labelInterval = 10;

	        if (labelInterval === 0) return self;

	        if (labelInterval <= 0) console.log('The label interval entered in invalid:', labelInterval);

	        for (var i = 1; i <= self.pairtable[0]; i++) {
	            // add labels
	            if (i % labelInterval === 0) {
	                //create a node for each label
	                var newX, newY;

	                var thisNode = self.nodes[i - 1];
	                var prevNode, nextNode;
	                var prevVec, nextVec;

	                if (self.rnaLength == 1) {
	                    nextVec = [thisNode.x - 15, thisNode.y];
	                    prevVec = [thisNode.x - 15, thisNode.y];
	                } else {
	                    // if we're labelling the first node, then label it in relation to the last
	                    if (i == 1) prevNode = self.nodes[self.rnaLength - 1];else prevNode = self.nodes[i - 2];

	                    // if we're labelling the last node, then label it in relation to the first
	                    if (i == self.rnaLength) nextNode = self.nodes[0];else nextNode = self.nodes[i];

	                    // this nucleotide and its neighbors are paired
	                    if (self.pairtable[nextNode.num] !== 0 && self.pairtable[prevNode.num] !== 0 && self.pairtable[thisNode.num] !== 0) {
	                        prevNode = nextNode = self.nodes[self.pairtable[thisNode.num] - 1];
	                    }

	                    // this node is paired but at least one of its neighbors is unpaired
	                    // place the label in the direction of the two neighbors
	                    if (self.pairtable[thisNode.num] !== 0 && (self.pairtable[nextNode.num] === 0 || self.pairtable[prevNode.num] === 0)) {
	                        nextVec = [thisNode.x - nextNode.x, thisNode.y - nextNode.y];
	                        prevVec = [thisNode.x - prevNode.x, thisNode.y - prevNode.y];
	                    } else {
	                        nextVec = [nextNode.x - thisNode.x, nextNode.y - thisNode.y];
	                        prevVec = [prevNode.x - thisNode.x, prevNode.y - thisNode.y];
	                    }
	                }

	                var combinedVec = [nextVec[0] + prevVec[0], nextVec[1] + prevVec[1]];
	                var vecLength = Math.sqrt(combinedVec[0] * combinedVec[0] + combinedVec[1] * combinedVec[1]);
	                var normedVec = [combinedVec[0] / vecLength, combinedVec[1] / vecLength];
	                var offsetVec = [-15 * normedVec[0], -15 * normedVec[1]];

	                var newX = self.nodes[i - 1].x + offsetVec[0];
	                var newY = self.nodes[i - 1].y + offsetVec[1];

	                var newNode = { 'name': i + self.startNumberArray[i - 1] - 1,
	                    'num': -1,
	                    'radius': 6,
	                    'rna': self,
	                    'nodeType': 'label',
	                    'structName': self.structName,
	                    'elemType': 'l',
	                    'x': newX,
	                    'y': newY,
	                    'px': newX,
	                    'py': newY,
	                    'uid': _slugid2.default.nice() };
	                var newLink = { 'source': self.nodes[i - 1],
	                    'target': newNode,
	                    'value': 1,
	                    'linkType': 'label_link',
	                    'uid': _slugid2.default.nice() };

	                self.nodes.push(newNode);
	                self.links.push(newLink);
	            }
	        }

	        return self;
	    };

	    self.recalculateElements = function () {
	        self.removePseudoknots();
	        self.elements = self.ptToElements(self.pairtable, 0, 1, self.dotbracket.length);

	        if (self.circular) {
	            //check to see if the external loop is a hairpin or a multiloop
	            externalLoop = self.elements.filter(function (d) {
	                if (d[0] == 'e') return true;
	            });

	            if (externalLoop.length > 0) {
	                eloop = externalLoop[0];
	                nucs = eloop[2].sort(numberSort);

	                prev = nucs[0];
	                hloop = true;
	                numGreater = 0;
	                for (var i = 1; i < nucs.length; i++) {
	                    if (nucs[i] - prev > 1) {
	                        numGreater += 1;
	                    }
	                    prev = nucs[i];
	                }

	                if (numGreater == 1) {
	                    eloop[0] = 'h';
	                } else if (numGreater == 2) {
	                    eloop[0] = 'i';
	                } else {
	                    eloop[0] = 'm';
	                }
	            }
	        }

	        return self;
	    };

	    self.reassignLinkUids = function () {
	        // reassign uids to the links, corresponding to the uids of the two nodes
	        // they connect
	        var i;

	        for (var i = 0; i < self.links.length; i++) {
	            self.links[i].uid = self.links[i].source.uid + self.links[i].target.uid;
	        }

	        return self;
	    };

	    self.removePseudoknots = function () {
	        if (self.pairtable.length > 1) self.pseudoknotPairs = self.pseudoknotPairs.concat(_rnautils.rnaUtilities.removePseudoknotsFromPairtable(self.pairtable));

	        return self;
	    };

	    self.addPseudoknots = function () {
	        /* Add all of the pseudoknot pairs which are stored outside
	         * of the pairtable back to the pairtable
	         */
	        var pt = self.pairtable;
	        var pseudoknotPairs = self.pseudoknotPairs;

	        for (var i = 0; i < pseudoknotPairs.length; i++) {
	            pt[pseudoknotPairs[i][0]] = pseudoknotPairs[i][1];
	            pt[pseudoknotPairs[i][1]] = pseudoknotPairs[i][0];
	        }

	        self.pseudoknotPairs = [];
	        return self;
	    };

	    self.addName = function (name) {
	        if (typeof name == 'undefined') {
	            self.name = '';
	            return self;
	        } else {
	            self.name = name;
	            return self;
	        }
	    };

	    if (self.rnaLength > 0) self.recalculateElements();

	    self.getNodeFromNucleotides = function (nucs) {
	        /* Get a node given a nucleotide number or an array of nucleotide
	         * numbers indicating an element node */
	        if (Object.prototype.toString.call(nucs) === '[object Array]') {
	            for (var j = 0; j < self.nodes.length; j++) {
	                if ('nucs' in self.nodes[j]) {
	                    if (self.nodes[j].nucs.equals(nucs)) {
	                        return self.nodes[j];
	                    }
	                }
	            }
	        } else {
	            for (var j = 0; j < self.nodes.length; j++) {
	                if (self.nodes[j].num == nucs) {
	                    return self.nodes[j];
	                }
	            }
	        }

	        console.log('ERROR: No node found for nucs:', nucs);
	        return null;
	    };
	}

	function moleculesToJson(moleculesJson) {
	    /* Convert a list of RNA and protein molecules to a list of RNAGraph
	     * ProteinGraph and extraLinks structure */

	    var nodes = {}; //index the nodes by uid
	    var graphs = [];
	    var extraLinks = [];

	    // Create the graphs for each molecule
	    for (var i = 0; i < moleculesJson.molecules.length; i++) {
	        var molecule = moleculesJson.molecules[i];
	        var rg;

	        if (molecule.type == 'rna') {
	            rg = new RNAGraph(molecule.seq, molecule.ss, molecule.header);
	            rg.circularizeExternal = true;
	            rg.elementsToJson().addPositions('nucleotide', molecule.positions).addLabels().reinforceStems().reinforceLoops();
	        } else if (molecule.type == 'protein') {
	            rg = new ProteinGraph(molecule.header, molecule.size);
	        }

	        rg.addUids(molecule.uids);

	        for (var j = 0; j < rg.nodes.length; j++) {
	            nodes[rg.nodes[j].uid] = rg.nodes[j];
	        }

	        graphs.push(rg);
	    }

	    //Add the extra links
	    for (var i = 0; i < moleculesJson.extraLinks.length; i++) {
	        link = moleculesJson.extraLinks[i];

	        link.source = nodes[link.source];
	        link.target = nodes[link.target];
	        link.uid = _slugid2.default.nice();

	        extraLinks.push(link);
	    }

	    return { 'graphs': graphs, 'extraLinks': extraLinks };
	};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.arraysEqual = arraysEqual;
	exports.RNAUtilities = RNAUtilities;
	exports.ColorScheme = ColorScheme;
	var numberSort = function numberSort(a, b) {
	    return a - b;
	};

	function arraysEqual(a, b) {
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

	function RNAUtilities() {
	    var self = this;

	    // the brackets to use when constructing dotbracket strings
	    // with pseudoknots
	    self.bracketLeft = "([{<ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
	    self.bracketRight = ")]}>abcdefghijklmnopqrstuvwxyz".split("");

	    self.inverseBrackets = function (bracket) {
	        var res = {};
	        for (var i = 0; i < bracket.length; i++) {
	            res[bracket[i]] = i;
	        }
	        return res;
	    };

	    self.maximumMatching = function maximumMatching(pt) {
	        // Courtesy of the great Ronny Lorenz

	        var n = pt[0];
	        var TURN = 0; //minimal number of nucleotides in the hairpin

	        /* array init */
	        var mm = new Array(n + 1);
	        for (var i = 0; i <= n; i++) {
	            mm[i] = new Array(n + 1);
	            for (var j = i; j <= n; j++) {
	                mm[i][j] = 0;
	            }
	        }
	        var maximum = 0;

	        /* actual computation */
	        for (var i = n - TURN - 1; i > 0; i--) {

	            for (var j = i + TURN + 1; j <= n; j++) {
	                maximum = mm[i][j - 1];

	                for (var l = j - TURN - 1; l >= i; l--) {
	                    if (pt[l] === j) {

	                        // we have a base pair here
	                        maximum = Math.max(maximum, (l > i ? mm[i][l - 1] : 0) + 1 + (j - l - 1 > 0 ? mm[l + 1][j - 1] : 0));
	                    }
	                }

	                mm[i][j] = maximum;
	            }
	        }maximum = mm[1][n];

	        return mm;
	    };

	    self.backtrackMaximumMatching = function (mm, oldPt) {
	        var pt = Array.apply(null, Array(mm.length)).map(function () {
	            return 0;
	        });
	        //create an array containing zeros

	        self.mmBt(mm, pt, oldPt, 1, mm.length - 1);
	        return pt;
	    };

	    self.mmBt = function (mm, pt, oldPt, i, j) {
	        // Create a pairtable from the backtracking
	        var maximum = mm[i][j];
	        var TURN = 0;

	        if (j - i - 1 < TURN) return; /* no more pairs */

	        if (mm[i][j - 1] == maximum) {
	            /* j is unpaired */
	            self.mmBt(mm, pt, oldPt, i, j - 1);
	            return;
	        }

	        for (var q = j - TURN - 1; q >= i; q--) {
	            /* j is paired with some q */
	            if (oldPt[j] !== q) continue;

	            var leftPart = q > i ? mm[i][q - 1] : 0;
	            var enclosedPart = j - q - 1 > 0 ? mm[q + 1][j - 1] : 0;

	            if (leftPart + enclosedPart + 1 == maximum) {
	                // there's a base pair between j and q
	                pt[q] = j;
	                pt[j] = q;

	                if (i < q) self.mmBt(mm, pt, oldPt, i, q - 1);

	                self.mmBt(mm, pt, oldPt, q + 1, j - 1);
	                return;
	            }
	        }

	        //alert(i + "," + j + ": backtracking failed!");
	        console.log('FAILED!!!' + i + ',' + j + ': backtracking failed!');
	    };

	    self.dotbracketToPairtable = function (dotbracket) {
	        // create an array and initialize it to 0
	        var pt = Array.apply(null, new Array(dotbracket.length + 1)).map(Number.prototype.valueOf, 0);

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
	                } else if (a in inverseBracketRight) {
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

	    self.insertIntoStack = function (stack, i, j) {
	        var k = 0;
	        while (stack[k].length > 0 && stack[k][stack[k].length - 1] < j) {
	            k += 1;
	        }

	        stack[k].push(j);
	        return k;
	    };

	    self.deleteFromStack = function (stack, j) {
	        var k = 0;
	        while (stack[k].length === 0 || stack[k][stack[k].length - 1] != j) {
	            k += 1;
	        }
	        stack[k].pop();
	        return k;
	    };

	    self.pairtableToDotbracket = function (pt) {
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

	    self.findUnmatched = function (pt, from, to) {
	        /*
	         * Find unmatched nucleotides in this molecule.
	         */
	        var toRemove = [];
	        var unmatched = [];

	        var origFrom = from;
	        var origTo = to;
	        var i;

	        for (var i = from; i <= to; i++) {
	            if (pt[i] !== 0 && (pt[i] < from || pt[i] > to)) unmatched.push([i, pt[i]]);
	        }for (var i = origFrom; i <= origTo; i++) {
	            while (pt[i] === 0 && i <= origTo) {
	                i++;
	            }to = pt[i];

	            while (pt[i] === to) {
	                i++;
	                to--;
	            }

	            toRemove = toRemove.concat(self.findUnmatched(pt, i, to));
	        }

	        if (unmatched.length > 0) toRemove.push(unmatched);

	        return toRemove;
	    };

	    self.removePseudoknotsFromPairtable = function (pt) {
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
	            if (pt[i] < i) continue;

	            if (newPt[i] != pt[i]) {
	                removed.push([i, pt[i]]);
	                pt[pt[i]] = 0;
	                pt[i] = 0;
	            }
	        }

	        return removed;
	    };

	    self.ptToElements = function (pt, level, i, j, dotBracketBreaks) {
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
	        var u5 = [i - 1];
	        var u3 = [j + 1];

	        if (arguments.length < 5) dotBracketBreaks = [];

	        if (i > j) return [];

	        //iterate over the unpaired regions on either side
	        //this is either 5' and 3' unpaired if level == 0
	        //or an interior loop or a multiloop
	        for (; pt[i] === 0; i++) {
	            u5.push(i);
	        }
	        for (; pt[j] === 0; j--) {
	            u3.push(j);
	        }

	        if (i > j) {
	            //hairpin loop or one large unpaired molecule
	            u5.push(i);
	            if (level === 0) return [['e', level, u5.sort(numberSort)]];else {
	                // check to see if we have chain breaks due
	                // to multiple strands in the input
	                var external = false;
	                var left = [];
	                var right = [];
	                for (var k = 0; k < u5.length; k++) {
	                    if (external) right.push(u5[k]);else left.push(u5[k]);

	                    if (dotBracketBreaks.indexOf(u5[k]) >= 0) external = true;
	                }

	                if (external) {
	                    return [['h', level, u5.sort(numberSort)]];
	                } else
	                    // if not, this is a simple hairpin loop
	                    return [['h', level, u5.sort(numberSort)]];
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
	                for (; pt[k] === 0 && k <= j; k++) {
	                    m.push(k);
	                }
	                m.push(k);
	            }
	            m.pop();
	            m = m.concat(u3);

	            if (m.length > 0) {
	                if (level === 0) elements.push(['e', level, m.sort(numberSort)]);else elements.push(['m', level, m.sort(numberSort)]);
	            }

	            return elements;
	        }

	        if (pt[i] === j) {
	            //interior loop
	            u5.push(i);
	            u3.push(j);

	            var combined = u5.concat(u3);
	            if (combined.length > 4) {
	                if (level === 0) elements.push(['e', level, u5.concat(u3).sort(numberSort)]);else elements.push(['i', level, u5.concat(u3).sort(numberSort)]);
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

	        u5 = [i - 1];
	        u3 = [j + 1];
	        elements.push(['s', level, s.sort(numberSort)]);

	        return elements.concat(self.ptToElements(pt, level, i, j, dotBracketBreaks));
	    };
	}

	var rnaUtilities = exports.rnaUtilities = new RNAUtilities();

	function ColorScheme(colorsText) {
	    var self = this;
	    self.colorsText = colorsText;

	    self.parseRange = function (rangeText) {
	        //parse a number range such as 1-10 or 3,7,9 or just 7
	        var parts = rangeText.split(',');
	        var nums = [];

	        for (var i = 0; i < parts.length; i++) {
	            //could be 1 or 10-11  or something like that
	            var parts1 = parts[i].split('-');

	            if (parts1.length == 1) nums.push(parseInt(parts1[0]));else if (parts1.length == 2) {
	                var from = parseInt(parts1[0]);
	                var to = parseInt(parts1[1]);

	                // add each number in this range
	                for (var j = from; j <= to; j++) {
	                    nums.push(j);
	                }
	            } else {
	                console.log('Malformed range (too many dashes):', rangeText);
	            }
	        }

	        return nums;
	    };

	    self.parseColorText = function (colorText) {
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
	        var colorsJson = { colorValues: { '': {} }, range: ['white', 'steelblue'] };
	        var domainValues = [];

	        for (var i = 0; i < lines.length; i++) {

	            if (lines[i][0] == '>') {
	                // new molecule
	                currMolecule = lines[i].trim().slice(1);
	                counter = 1;

	                colorsJson.colorValues[currMolecule] = {};
	                continue;
	            }

	            var words = lines[i].trim().split(/[\s]+/);

	            for (var j = 0; j < words.length; j++) {
	                if (isNaN(words[j])) {
	                    if (words[j].search('range') === 0) {
	                        //there's a color scale in this entry
	                        var _parts = words[j].split('=');
	                        var partsRight = _parts[1].split(':');
	                        colorsJson.range = [partsRight[0], partsRight[1]];
	                        continue;
	                    }

	                    if (words[j].search('domain') == 0) {
	                        //there's a color scale in this entry
	                        var _parts2 = words[j].split('=');
	                        var _partsRight = _parts2[1].split(':');
	                        colorsJson.domain = [_partsRight[0], _partsRight[1]];
	                        continue;
	                    }

	                    // it's not a number, should be a combination 
	                    // of a number (nucleotide #) and a color
	                    var parts = words[j].split(':');
	                    var nums = self.parseRange(parts[0]);
	                    var color = parts[1];

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

	        if (!('domain' in colorsJson)) colorsJson.domain = [Math.min.apply(null, domainValues), Math.max.apply(null, domainValues)];

	        self.colorsJson = colorsJson;

	        return self;
	    };

	    self.normalizeColors = function () {
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
	                    if (value < minNum) minNum = value;
	                    if (value > maxNum) maxNum = value;
	                }
	            }

	            // iterate again to normalize
	            for (resnum in self.colorsJson.colorValues[moleculeName]) {
	                value = self.colorsJson.colorValues[moleculeName][resnum];
	                if (typeof value == 'number') {
	                    self.colorsJson.colorValues[moleculeName][resnum] = (value - minNum) / (maxNum - minNum);
	                }
	            }
	        }

	        return self;
	    };

	    self.parseColorText(self.colorsText);
	    return self;
	}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	// The MIT License (MIT)
	//
	// Copyright (c) 2014 Jonas Finnemann Jensen
	//
	// Permission is hereby granted, free of charge, to any person obtaining a copy
	// of this software and associated documentation files (the "Software"), to deal
	// in the Software without restriction, including without limitation the rights
	// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	// copies of the Software, and to permit persons to whom the Software is
	// furnished to do so, subject to the following conditions:
	//
	// The above copyright notice and this permission notice shall be included in
	// all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	// THE SOFTWARE.

	module.exports = __webpack_require__(4);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {// The MIT License (MIT)
	//
	// Copyright (c) 2014 Jonas Finnemann Jensen
	//
	// Permission is hereby granted, free of charge, to any person obtaining a copy
	// of this software and associated documentation files (the "Software"), to deal
	// in the Software without restriction, including without limitation the rights
	// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	// copies of the Software, and to permit persons to whom the Software is
	// furnished to do so, subject to the following conditions:
	//
	// The above copyright notice and this permission notice shall be included in
	// all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	// THE SOFTWARE.

	var uuid = __webpack_require__(9);

	/**
	 * Returns the given uuid as a 22 character slug. This can be a regular v4
	 * slug or a "nice" slug.
	 */
	exports.encode = function(uuid_) {
	  var bytes   = uuid.parse(uuid_);
	  var base64  = (new Buffer(bytes)).toString('base64');
	  var slug = base64
	              .replace(/\+/g, '-')  // Replace + with - (see RFC 4648, sec. 5)
	              .replace(/\//g, '_')  // Replace / with _ (see RFC 4648, sec. 5)
	              .substring(0, 22);    // Drop '==' padding
	  return slug;
	};

	/**
	 * Returns the uuid represented by the given v4 or "nice" slug
	 */
	exports.decode = function(slug) {
	  var base64 = slug
	                  .replace(/-/g, '+')
	                  .replace(/_/g, '/')
	                  + '==';
	  return uuid.unparse(new Buffer(base64, 'base64'));
	};

	/**
	 * Returns a randomly generated uuid v4 compliant slug
	 */
	exports.v4 = function() {
	  var bytes   = uuid.v4(null, new Buffer(16));
	  var base64  = bytes.toString('base64');
	  var slug = base64
	              .replace(/\+/g, '-')  // Replace + with - (see RFC 4648, sec. 5)
	              .replace(/\//g, '_')  // Replace / with _ (see RFC 4648, sec. 5)
	              .substring(0, 22);    // Drop '==' padding
	  return slug;
	};

	/** 
	 * Returns a randomly generated uuid v4 compliant slug which conforms to a set
	 * of "nice" properties, at the cost of some entropy. Currently this means one
	 * extra fixed bit (the first bit of the uuid is set to 0) which guarantees the
	 * slug will begin with [A-Za-f]. For example such slugs don't require special
	 * handling when used as command line parameters (whereas non-nice slugs may
	 * start with `-` which can confuse command line tools).
	 *
	 * Potentially other "nice" properties may be added in future to further
	 * restrict the range of potential uuids that may be generated.
	 */
	exports.nice = function() {
	  var bytes   = uuid.v4(null, new Buffer(16));
	  bytes[0] = bytes[0] & 0x7f;  // unset first bit to ensure [A-Za-f] first char
	  var base64  = bytes.toString('base64');
	  var slug = base64
	              .replace(/\+/g, '-')  // Replace + with - (see RFC 4648, sec. 5)
	              .replace(/\//g, '_')  // Replace / with _ (see RFC 4648, sec. 5)
	              .substring(0, 22);    // Drop '==' padding
	  return slug;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5).Buffer))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */

	'use strict'

	var base64 = __webpack_require__(6)
	var ieee754 = __webpack_require__(7)
	var isArray = __webpack_require__(8)

	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.

	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()

	/*
	 * Export kMaxLength after typed array support is determined.
	 */
	exports.kMaxLength = kMaxLength()

	function typedArraySupport () {
	  try {
	    var arr = new Uint8Array(1)
	    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
	    return arr.foo() === 42 && // typed array instances can be augmented
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}

	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}

	function createBuffer (that, length) {
	  if (kMaxLength() < length) {
	    throw new RangeError('Invalid typed array length')
	  }
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = new Uint8Array(length)
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    if (that === null) {
	      that = new Buffer(length)
	    }
	    that.length = length
	  }

	  return that
	}

	/**
	 * The Buffer constructor returns instances of `Uint8Array` that have their
	 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
	 * returns a single octet.
	 *
	 * The `Uint8Array` prototype remains unmodified.
	 */

	function Buffer (arg, encodingOrOffset, length) {
	  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
	    return new Buffer(arg, encodingOrOffset, length)
	  }

	  // Common case.
	  if (typeof arg === 'number') {
	    if (typeof encodingOrOffset === 'string') {
	      throw new Error(
	        'If encoding is specified then the first argument must be a string'
	      )
	    }
	    return allocUnsafe(this, arg)
	  }
	  return from(this, arg, encodingOrOffset, length)
	}

	Buffer.poolSize = 8192 // not used by this implementation

	// TODO: Legacy, not needed anymore. Remove in next major version.
	Buffer._augment = function (arr) {
	  arr.__proto__ = Buffer.prototype
	  return arr
	}

	function from (that, value, encodingOrOffset, length) {
	  if (typeof value === 'number') {
	    throw new TypeError('"value" argument must not be a number')
	  }

	  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
	    return fromArrayBuffer(that, value, encodingOrOffset, length)
	  }

	  if (typeof value === 'string') {
	    return fromString(that, value, encodingOrOffset)
	  }

	  return fromObject(that, value)
	}

	/**
	 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	 * if value is a number.
	 * Buffer.from(str[, encoding])
	 * Buffer.from(array)
	 * Buffer.from(buffer)
	 * Buffer.from(arrayBuffer[, byteOffset[, length]])
	 **/
	Buffer.from = function (value, encodingOrOffset, length) {
	  return from(null, value, encodingOrOffset, length)
	}

	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	  if (typeof Symbol !== 'undefined' && Symbol.species &&
	      Buffer[Symbol.species] === Buffer) {
	    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
	    Object.defineProperty(Buffer, Symbol.species, {
	      value: null,
	      configurable: true
	    })
	  }
	}

	function assertSize (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('"size" argument must be a number')
	  } else if (size < 0) {
	    throw new RangeError('"size" argument must not be negative')
	  }
	}

	function alloc (that, size, fill, encoding) {
	  assertSize(size)
	  if (size <= 0) {
	    return createBuffer(that, size)
	  }
	  if (fill !== undefined) {
	    // Only pay attention to encoding if it's a string. This
	    // prevents accidentally sending in a number that would
	    // be interpretted as a start offset.
	    return typeof encoding === 'string'
	      ? createBuffer(that, size).fill(fill, encoding)
	      : createBuffer(that, size).fill(fill)
	  }
	  return createBuffer(that, size)
	}

	/**
	 * Creates a new filled Buffer instance.
	 * alloc(size[, fill[, encoding]])
	 **/
	Buffer.alloc = function (size, fill, encoding) {
	  return alloc(null, size, fill, encoding)
	}

	function allocUnsafe (that, size) {
	  assertSize(size)
	  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < size; ++i) {
	      that[i] = 0
	    }
	  }
	  return that
	}

	/**
	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	 * */
	Buffer.allocUnsafe = function (size) {
	  return allocUnsafe(null, size)
	}
	/**
	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	 */
	Buffer.allocUnsafeSlow = function (size) {
	  return allocUnsafe(null, size)
	}

	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') {
	    encoding = 'utf8'
	  }

	  if (!Buffer.isEncoding(encoding)) {
	    throw new TypeError('"encoding" must be a valid string encoding')
	  }

	  var length = byteLength(string, encoding) | 0
	  that = createBuffer(that, length)

	  var actual = that.write(string, encoding)

	  if (actual !== length) {
	    // Writing a hex string, for example, that contains invalid characters will
	    // cause everything after the first invalid character to be ignored. (e.g.
	    // 'abxxcd' will be treated as 'ab')
	    that = that.slice(0, actual)
	  }

	  return that
	}

	function fromArrayLike (that, array) {
	  var length = array.length < 0 ? 0 : checked(array.length) | 0
	  that = createBuffer(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	function fromArrayBuffer (that, array, byteOffset, length) {
	  array.byteLength // this throws if `array` is not a valid ArrayBuffer

	  if (byteOffset < 0 || array.byteLength < byteOffset) {
	    throw new RangeError('\'offset\' is out of bounds')
	  }

	  if (array.byteLength < byteOffset + (length || 0)) {
	    throw new RangeError('\'length\' is out of bounds')
	  }

	  if (byteOffset === undefined && length === undefined) {
	    array = new Uint8Array(array)
	  } else if (length === undefined) {
	    array = new Uint8Array(array, byteOffset)
	  } else {
	    array = new Uint8Array(array, byteOffset, length)
	  }

	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = array
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromArrayLike(that, array)
	  }
	  return that
	}

	function fromObject (that, obj) {
	  if (Buffer.isBuffer(obj)) {
	    var len = checked(obj.length) | 0
	    that = createBuffer(that, len)

	    if (that.length === 0) {
	      return that
	    }

	    obj.copy(that, 0, 0, len)
	    return that
	  }

	  if (obj) {
	    if ((typeof ArrayBuffer !== 'undefined' &&
	        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
	      if (typeof obj.length !== 'number' || isnan(obj.length)) {
	        return createBuffer(that, 0)
	      }
	      return fromArrayLike(that, obj)
	    }

	    if (obj.type === 'Buffer' && isArray(obj.data)) {
	      return fromArrayLike(that, obj.data)
	    }
	  }

	  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
	}

	function checked (length) {
	  // Note: cannot use `length < kMaxLength()` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}

	function SlowBuffer (length) {
	  if (+length != length) { // eslint-disable-line eqeqeq
	    length = 0
	  }
	  return Buffer.alloc(+length)
	}

	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length
	  var y = b.length

	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i]
	      y = b[i]
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'latin1':
	    case 'binary':
	    case 'base64':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}

	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) {
	    throw new TypeError('"list" argument must be an Array of Buffers')
	  }

	  if (list.length === 0) {
	    return Buffer.alloc(0)
	  }

	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; ++i) {
	      length += list[i].length
	    }
	  }

	  var buffer = Buffer.allocUnsafe(length)
	  var pos = 0
	  for (i = 0; i < list.length; ++i) {
	    var buf = list[i]
	    if (!Buffer.isBuffer(buf)) {
	      throw new TypeError('"list" argument must be an Array of Buffers')
	    }
	    buf.copy(buffer, pos)
	    pos += buf.length
	  }
	  return buffer
	}

	function byteLength (string, encoding) {
	  if (Buffer.isBuffer(string)) {
	    return string.length
	  }
	  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
	      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
	    return string.byteLength
	  }
	  if (typeof string !== 'string') {
	    string = '' + string
	  }

	  var len = string.length
	  if (len === 0) return 0

	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return len
	      case 'utf8':
	      case 'utf-8':
	      case undefined:
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength

	function slowToString (encoding, start, end) {
	  var loweredCase = false

	  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
	  // property of a typed array.

	  // This behaves neither like String nor Uint8Array in that we set start/end
	  // to their upper/lower bounds if the value passed is out of range.
	  // undefined is handled specially as per ECMA-262 6th Edition,
	  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
	  if (start === undefined || start < 0) {
	    start = 0
	  }
	  // Return early if start > this.length. Done here to prevent potential uint32
	  // coercion fail below.
	  if (start > this.length) {
	    return ''
	  }

	  if (end === undefined || end > this.length) {
	    end = this.length
	  }

	  if (end <= 0) {
	    return ''
	  }

	  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
	  end >>>= 0
	  start >>>= 0

	  if (end <= start) {
	    return ''
	  }

	  if (!encoding) encoding = 'utf8'

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'latin1':
	      case 'binary':
	        return latin1Slice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
	// Buffer instances.
	Buffer.prototype._isBuffer = true

	function swap (b, n, m) {
	  var i = b[n]
	  b[n] = b[m]
	  b[m] = i
	}

	Buffer.prototype.swap16 = function swap16 () {
	  var len = this.length
	  if (len % 2 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 16-bits')
	  }
	  for (var i = 0; i < len; i += 2) {
	    swap(this, i, i + 1)
	  }
	  return this
	}

	Buffer.prototype.swap32 = function swap32 () {
	  var len = this.length
	  if (len % 4 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 32-bits')
	  }
	  for (var i = 0; i < len; i += 4) {
	    swap(this, i, i + 3)
	    swap(this, i + 1, i + 2)
	  }
	  return this
	}

	Buffer.prototype.swap64 = function swap64 () {
	  var len = this.length
	  if (len % 8 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 64-bits')
	  }
	  for (var i = 0; i < len; i += 8) {
	    swap(this, i, i + 7)
	    swap(this, i + 1, i + 6)
	    swap(this, i + 2, i + 5)
	    swap(this, i + 3, i + 4)
	  }
	  return this
	}

	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}

	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}

	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}

	Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
	  if (!Buffer.isBuffer(target)) {
	    throw new TypeError('Argument must be a Buffer')
	  }

	  if (start === undefined) {
	    start = 0
	  }
	  if (end === undefined) {
	    end = target ? target.length : 0
	  }
	  if (thisStart === undefined) {
	    thisStart = 0
	  }
	  if (thisEnd === undefined) {
	    thisEnd = this.length
	  }

	  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
	    throw new RangeError('out of range index')
	  }

	  if (thisStart >= thisEnd && start >= end) {
	    return 0
	  }
	  if (thisStart >= thisEnd) {
	    return -1
	  }
	  if (start >= end) {
	    return 1
	  }

	  start >>>= 0
	  end >>>= 0
	  thisStart >>>= 0
	  thisEnd >>>= 0

	  if (this === target) return 0

	  var x = thisEnd - thisStart
	  var y = end - start
	  var len = Math.min(x, y)

	  var thisCopy = this.slice(thisStart, thisEnd)
	  var targetCopy = target.slice(start, end)

	  for (var i = 0; i < len; ++i) {
	    if (thisCopy[i] !== targetCopy[i]) {
	      x = thisCopy[i]
	      y = targetCopy[i]
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
	// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
	//
	// Arguments:
	// - buffer - a Buffer to search
	// - val - a string, Buffer, or number
	// - byteOffset - an index into `buffer`; will be clamped to an int32
	// - encoding - an optional encoding, relevant is val is a string
	// - dir - true for indexOf, false for lastIndexOf
	function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
	  // Empty buffer means no match
	  if (buffer.length === 0) return -1

	  // Normalize byteOffset
	  if (typeof byteOffset === 'string') {
	    encoding = byteOffset
	    byteOffset = 0
	  } else if (byteOffset > 0x7fffffff) {
	    byteOffset = 0x7fffffff
	  } else if (byteOffset < -0x80000000) {
	    byteOffset = -0x80000000
	  }
	  byteOffset = +byteOffset  // Coerce to Number.
	  if (isNaN(byteOffset)) {
	    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
	    byteOffset = dir ? 0 : (buffer.length - 1)
	  }

	  // Normalize byteOffset: negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
	  if (byteOffset >= buffer.length) {
	    if (dir) return -1
	    else byteOffset = buffer.length - 1
	  } else if (byteOffset < 0) {
	    if (dir) byteOffset = 0
	    else return -1
	  }

	  // Normalize val
	  if (typeof val === 'string') {
	    val = Buffer.from(val, encoding)
	  }

	  // Finally, search either indexOf (if dir is true) or lastIndexOf
	  if (Buffer.isBuffer(val)) {
	    // Special case: looking for empty string/buffer always fails
	    if (val.length === 0) {
	      return -1
	    }
	    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
	  } else if (typeof val === 'number') {
	    val = val & 0xFF // Search for a byte value [0-255]
	    if (Buffer.TYPED_ARRAY_SUPPORT &&
	        typeof Uint8Array.prototype.indexOf === 'function') {
	      if (dir) {
	        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
	      } else {
	        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
	      }
	    }
	    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
	  var indexSize = 1
	  var arrLength = arr.length
	  var valLength = val.length

	  if (encoding !== undefined) {
	    encoding = String(encoding).toLowerCase()
	    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
	        encoding === 'utf16le' || encoding === 'utf-16le') {
	      if (arr.length < 2 || val.length < 2) {
	        return -1
	      }
	      indexSize = 2
	      arrLength /= 2
	      valLength /= 2
	      byteOffset /= 2
	    }
	  }

	  function read (buf, i) {
	    if (indexSize === 1) {
	      return buf[i]
	    } else {
	      return buf.readUInt16BE(i * indexSize)
	    }
	  }

	  var i
	  if (dir) {
	    var foundIndex = -1
	    for (i = byteOffset; i < arrLength; i++) {
	      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
	      } else {
	        if (foundIndex !== -1) i -= i - foundIndex
	        foundIndex = -1
	      }
	    }
	  } else {
	    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
	    for (i = byteOffset; i >= 0; i--) {
	      var found = true
	      for (var j = 0; j < valLength; j++) {
	        if (read(arr, i + j) !== read(val, j)) {
	          found = false
	          break
	        }
	      }
	      if (found) return i
	    }
	  }

	  return -1
	}

	Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
	  return this.indexOf(val, byteOffset, encoding) !== -1
	}

	Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
	}

	Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
	}

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; ++i) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) return i
	    buf[offset + i] = parsed
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function latin1Write (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    throw new Error(
	      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
	    )
	  }

	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('Attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8'

	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	        return asciiWrite(this, string, offset, length)

	      case 'latin1':
	      case 'binary':
	        return latin1Write(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []

	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1

	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }

	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }

	    res.push(codePoint)
	    i += bytesPerSequence
	  }

	  return decodeCodePointsArray(res)
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000

	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}

	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}

	function latin1Slice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length

	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len

	  var out = ''
	  for (var i = start; i < end; ++i) {
	    out += toHex(buf[i])
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end

	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }

	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }

	  if (end < start) end = start

	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = this.subarray(start, end)
	    newBuf.__proto__ = Buffer.prototype
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; ++i) {
	      newBuf[i] = this[i + start]
	    }
	  }

	  return newBuf
	}

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }

	  return val
	}

	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }

	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }

	  return val
	}

	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}

	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}

	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}

	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}

	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }

	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = 0
	  var mul = 1
	  var sub = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  var sub = 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	  if (offset < 0) throw new RangeError('Index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }

	  var len = end - start
	  var i

	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; --i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; ++i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    Uint8Array.prototype.set.call(
	      target,
	      this.subarray(start, start + len),
	      targetStart
	    )
	  }

	  return len
	}

	// Usage:
	//    buffer.fill(number[, offset[, end]])
	//    buffer.fill(buffer[, offset[, end]])
	//    buffer.fill(string[, offset[, end]][, encoding])
	Buffer.prototype.fill = function fill (val, start, end, encoding) {
	  // Handle string cases:
	  if (typeof val === 'string') {
	    if (typeof start === 'string') {
	      encoding = start
	      start = 0
	      end = this.length
	    } else if (typeof end === 'string') {
	      encoding = end
	      end = this.length
	    }
	    if (val.length === 1) {
	      var code = val.charCodeAt(0)
	      if (code < 256) {
	        val = code
	      }
	    }
	    if (encoding !== undefined && typeof encoding !== 'string') {
	      throw new TypeError('encoding must be a string')
	    }
	    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
	      throw new TypeError('Unknown encoding: ' + encoding)
	    }
	  } else if (typeof val === 'number') {
	    val = val & 255
	  }

	  // Invalid ranges are not set to a default, so can range check early.
	  if (start < 0 || this.length < start || this.length < end) {
	    throw new RangeError('Out of range index')
	  }

	  if (end <= start) {
	    return this
	  }

	  start = start >>> 0
	  end = end === undefined ? this.length : end >>> 0

	  if (!val) val = 0

	  var i
	  if (typeof val === 'number') {
	    for (i = start; i < end; ++i) {
	      this[i] = val
	    }
	  } else {
	    var bytes = Buffer.isBuffer(val)
	      ? val
	      : utf8ToBytes(new Buffer(val, encoding).toString())
	    var len = bytes.length
	    for (i = 0; i < end - start; ++i) {
	      this[i + start] = bytes[i % len]
	    }
	  }

	  return this
	}

	// HELPER FUNCTIONS
	// ================

	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []

	  for (var i = 0; i < length; ++i) {
	    codePoint = string.charCodeAt(i)

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }

	        // valid lead
	        leadSurrogate = codePoint

	        continue
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }

	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }

	    leadSurrogate = null

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }

	  return byteArray
	}

	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; ++i) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}

	function isnan (val) {
	  return val !== val // eslint-disable-line no-self-compare
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	'use strict'

	exports.byteLength = byteLength
	exports.toByteArray = toByteArray
	exports.fromByteArray = fromByteArray

	var lookup = []
	var revLookup = []
	var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

	var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
	for (var i = 0, len = code.length; i < len; ++i) {
	  lookup[i] = code[i]
	  revLookup[code.charCodeAt(i)] = i
	}

	// Support decoding URL-safe base64 strings, as Node.js does.
	// See: https://en.wikipedia.org/wiki/Base64#URL_applications
	revLookup['-'.charCodeAt(0)] = 62
	revLookup['_'.charCodeAt(0)] = 63

	function getLens (b64) {
	  var len = b64.length

	  if (len % 4 > 0) {
	    throw new Error('Invalid string. Length must be a multiple of 4')
	  }

	  // Trim off extra bytes after placeholder bytes are found
	  // See: https://github.com/beatgammit/base64-js/issues/42
	  var validLen = b64.indexOf('=')
	  if (validLen === -1) validLen = len

	  var placeHoldersLen = validLen === len
	    ? 0
	    : 4 - (validLen % 4)

	  return [validLen, placeHoldersLen]
	}

	// base64 is 4/3 + up to two characters of the original data
	function byteLength (b64) {
	  var lens = getLens(b64)
	  var validLen = lens[0]
	  var placeHoldersLen = lens[1]
	  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
	}

	function _byteLength (b64, validLen, placeHoldersLen) {
	  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
	}

	function toByteArray (b64) {
	  var tmp
	  var lens = getLens(b64)
	  var validLen = lens[0]
	  var placeHoldersLen = lens[1]

	  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

	  var curByte = 0

	  // if there are placeholders, only get up to the last complete 4 chars
	  var len = placeHoldersLen > 0
	    ? validLen - 4
	    : validLen

	  for (var i = 0; i < len; i += 4) {
	    tmp =
	      (revLookup[b64.charCodeAt(i)] << 18) |
	      (revLookup[b64.charCodeAt(i + 1)] << 12) |
	      (revLookup[b64.charCodeAt(i + 2)] << 6) |
	      revLookup[b64.charCodeAt(i + 3)]
	    arr[curByte++] = (tmp >> 16) & 0xFF
	    arr[curByte++] = (tmp >> 8) & 0xFF
	    arr[curByte++] = tmp & 0xFF
	  }

	  if (placeHoldersLen === 2) {
	    tmp =
	      (revLookup[b64.charCodeAt(i)] << 2) |
	      (revLookup[b64.charCodeAt(i + 1)] >> 4)
	    arr[curByte++] = tmp & 0xFF
	  }

	  if (placeHoldersLen === 1) {
	    tmp =
	      (revLookup[b64.charCodeAt(i)] << 10) |
	      (revLookup[b64.charCodeAt(i + 1)] << 4) |
	      (revLookup[b64.charCodeAt(i + 2)] >> 2)
	    arr[curByte++] = (tmp >> 8) & 0xFF
	    arr[curByte++] = tmp & 0xFF
	  }

	  return arr
	}

	function tripletToBase64 (num) {
	  return lookup[num >> 18 & 0x3F] +
	    lookup[num >> 12 & 0x3F] +
	    lookup[num >> 6 & 0x3F] +
	    lookup[num & 0x3F]
	}

	function encodeChunk (uint8, start, end) {
	  var tmp
	  var output = []
	  for (var i = start; i < end; i += 3) {
	    tmp =
	      ((uint8[i] << 16) & 0xFF0000) +
	      ((uint8[i + 1] << 8) & 0xFF00) +
	      (uint8[i + 2] & 0xFF)
	    output.push(tripletToBase64(tmp))
	  }
	  return output.join('')
	}

	function fromByteArray (uint8) {
	  var tmp
	  var len = uint8.length
	  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
	  var parts = []
	  var maxChunkLength = 16383 // must be multiple of 3

	  // go through the array every three bytes, we'll deal with trailing stuff later
	  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
	    parts.push(encodeChunk(
	      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
	    ))
	  }

	  // pad the end with zeros, but make sure to not forget the extra bytes
	  if (extraBytes === 1) {
	    tmp = uint8[len - 1]
	    parts.push(
	      lookup[tmp >> 2] +
	      lookup[(tmp << 4) & 0x3F] +
	      '=='
	    )
	  } else if (extraBytes === 2) {
	    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
	    parts.push(
	      lookup[tmp >> 10] +
	      lookup[(tmp >> 4) & 0x3F] +
	      lookup[(tmp << 2) & 0x3F] +
	      '='
	    )
	  }

	  return parts.join('')
	}


/***/ }),
/* 7 */
/***/ (function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = (nBytes * 8) - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]

	  i += d

	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}

	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = (nBytes * 8) - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

	  value = Math.abs(value)

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }

	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = ((value * c) - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128
	}


/***/ }),
/* 8 */
/***/ (function(module, exports) {

	var toString = {}.toString;

	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	//     uuid.js
	//
	//     Copyright (c) 2010-2012 Robert Kieffer
	//     MIT License - http://opensource.org/licenses/mit-license.php

	// Unique ID creation requires a high quality random # generator.  We feature
	// detect to determine the best RNG source, normalizing to a function that
	// returns 128-bits of randomness, since that's what's usually required
	var _rng = __webpack_require__(10);

	// Maps for number <-> hex string conversion
	var _byteToHex = [];
	var _hexToByte = {};
	for (var i = 0; i < 256; i++) {
	  _byteToHex[i] = (i + 0x100).toString(16).substr(1);
	  _hexToByte[_byteToHex[i]] = i;
	}

	// **`parse()` - Parse a UUID into it's component bytes**
	function parse(s, buf, offset) {
	  var i = (buf && offset) || 0, ii = 0;

	  buf = buf || [];
	  s.toLowerCase().replace(/[0-9a-f]{2}/g, function(oct) {
	    if (ii < 16) { // Don't overflow!
	      buf[i + ii++] = _hexToByte[oct];
	    }
	  });

	  // Zero out remaining bytes if string was short
	  while (ii < 16) {
	    buf[i + ii++] = 0;
	  }

	  return buf;
	}

	// **`unparse()` - Convert UUID byte array (ala parse()) into a string**
	function unparse(buf, offset) {
	  var i = offset || 0, bth = _byteToHex;
	  return  bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]];
	}

	// **`v1()` - Generate time-based UUID**
	//
	// Inspired by https://github.com/LiosK/UUID.js
	// and http://docs.python.org/library/uuid.html

	// random #'s we need to init node and clockseq
	var _seedBytes = _rng();

	// Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
	var _nodeId = [
	  _seedBytes[0] | 0x01,
	  _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
	];

	// Per 4.2.2, randomize (14 bit) clockseq
	var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

	// Previous uuid creation time
	var _lastMSecs = 0, _lastNSecs = 0;

	// See https://github.com/broofa/node-uuid for API details
	function v1(options, buf, offset) {
	  var i = buf && offset || 0;
	  var b = buf || [];

	  options = options || {};

	  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

	  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
	  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
	  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
	  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
	  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

	  // Per 4.2.1.2, use count of uuid's generated during the current clock
	  // cycle to simulate higher resolution clock
	  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

	  // Time since last uuid creation (in msecs)
	  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

	  // Per 4.2.1.2, Bump clockseq on clock regression
	  if (dt < 0 && options.clockseq === undefined) {
	    clockseq = clockseq + 1 & 0x3fff;
	  }

	  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
	  // time interval
	  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
	    nsecs = 0;
	  }

	  // Per 4.2.1.2 Throw error if too many uuids are requested
	  if (nsecs >= 10000) {
	    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
	  }

	  _lastMSecs = msecs;
	  _lastNSecs = nsecs;
	  _clockseq = clockseq;

	  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
	  msecs += 12219292800000;

	  // `time_low`
	  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
	  b[i++] = tl >>> 24 & 0xff;
	  b[i++] = tl >>> 16 & 0xff;
	  b[i++] = tl >>> 8 & 0xff;
	  b[i++] = tl & 0xff;

	  // `time_mid`
	  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
	  b[i++] = tmh >>> 8 & 0xff;
	  b[i++] = tmh & 0xff;

	  // `time_high_and_version`
	  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
	  b[i++] = tmh >>> 16 & 0xff;

	  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
	  b[i++] = clockseq >>> 8 | 0x80;

	  // `clock_seq_low`
	  b[i++] = clockseq & 0xff;

	  // `node`
	  var node = options.node || _nodeId;
	  for (var n = 0; n < 6; n++) {
	    b[i + n] = node[n];
	  }

	  return buf ? buf : unparse(b);
	}

	// **`v4()` - Generate random UUID**

	// See https://github.com/broofa/node-uuid for API details
	function v4(options, buf, offset) {
	  // Deprecated - 'format' argument, as supported in v1.2
	  var i = buf && offset || 0;

	  if (typeof(options) == 'string') {
	    buf = options == 'binary' ? new Array(16) : null;
	    options = null;
	  }
	  options = options || {};

	  var rnds = options.random || (options.rng || _rng)();

	  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
	  rnds[6] = (rnds[6] & 0x0f) | 0x40;
	  rnds[8] = (rnds[8] & 0x3f) | 0x80;

	  // Copy bytes to buffer, if provided
	  if (buf) {
	    for (var ii = 0; ii < 16; ii++) {
	      buf[i + ii] = rnds[ii];
	    }
	  }

	  return buf || unparse(rnds);
	}

	// Export public API
	var uuid = v4;
	uuid.v1 = v1;
	uuid.v4 = v4;
	uuid.parse = parse;
	uuid.unparse = unparse;

	module.exports = uuid;


/***/ }),
/* 10 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {
	var rng;

	var crypto = global.crypto || global.msCrypto; // for IE 11
	if (crypto && crypto.getRandomValues) {
	  // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
	  // Moderately fast, high quality
	  var _rnds8 = new Uint8Array(16);
	  rng = function whatwgRNG() {
	    crypto.getRandomValues(_rnds8);
	    return _rnds8;
	  };
	}

	if (!rng) {
	  // Math.random()-based (RNG)
	  //
	  // If all else fails, use Math.random().  It's fast, but is of unspecified
	  // quality.
	  var  _rnds = new Array(16);
	  rng = function() {
	    for (var i = 0, r; i < 16; i++) {
	      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
	      _rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
	    }

	    return _rnds;
	  };
	}

	module.exports = rng;


	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 11 */,
/* 12 */,
/* 13 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }),
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.simpleXyCoordinates = simpleXyCoordinates;
	function simpleXyCoordinates(pair_table) {
	    var INIT_ANGLE = 0.; /* initial bending angle */
	    var INIT_X = 100.; /* coordinate of first digit */
	    var INIT_Y = 100.; /* see above */
	    var RADIUS = 15.;

	    var x = [],
	        y = [];

	    var i, len;
	    var alpha;

	    len = pair_table[0];
	    var angle = Array.apply(null, new Array(len + 5)).map(Number.prototype.valueOf, 0);
	    var loop_size = Array.apply(null, new Array(16 + Math.floor(len / 5))).map(Number.prototype.valueOf, 0);
	    var stack_size = Array.apply(null, new Array(16 + Math.floor(len / 5))).map(Number.prototype.valueOf, 0);

	    var lp = 0;
	    var stk = 0;
	    var PIHALF = Math.PI / 2;

	    var loop = function loop(i, j, pair_table)
	    /* i, j are the positions AFTER the last pair of a stack; i.e
	       i-1 and j+1 are paired. */
	    {
	        var count = 2; /* counts the VERTICES of a loop polygon; that's
	                          NOT necessarily the number of unpaired bases!
	                          Upon entry the loop has already 2 vertices, namely
	                          the pair i-1/j+1.  */

	        var r = 0,
	            bubble = 0; /* bubble counts the unpaired digits in loops */

	        var i_old, partner, k, l, start_k, start_l, fill, ladder;
	        var begin, v, diff;
	        var polygon;

	        var remember = Array.apply(null, new Array(3 + Math.floor((j - i) / 5) * 2)).map(Number.prototype.valueOf, 0);

	        i_old = i - 1, j++; /* j has now been set to the partner of the
	                               previous pair for correct while-loop
	                               termination.  */
	        while (i != j) {
	            partner = pair_table[i];
	            if (!partner || i == 0) i++, count++, bubble++;else {
	                count += 2;
	                k = i, l = partner; /* beginning of stack */
	                remember[++r] = k;
	                remember[++r] = l;
	                i = partner + 1; /* next i for the current loop */

	                start_k = k, start_l = l;
	                ladder = 0;
	                do {
	                    k++, l--, ladder++; /* go along the stack region */
	                } while (pair_table[k] == l && pair_table[k] > k);

	                fill = ladder - 2;
	                if (ladder >= 2) {
	                    angle[start_k + 1 + fill] += PIHALF; /*  Loop entries and    */
	                    angle[start_l - 1 - fill] += PIHALF; /*  exits get an        */
	                    angle[start_k] += PIHALF; /*  additional PI/2.    */
	                    angle[start_l] += PIHALF; /*  Why ? (exercise)    */
	                    if (ladder > 2) {
	                        for (; fill >= 1; fill--) {
	                            angle[start_k + fill] = Math.PI; /*  fill in the angles  */
	                            angle[start_l - fill] = Math.PI; /*  for the backbone    */
	                        }
	                    }
	                }
	                stack_size[++stk] = ladder;
	                if (k <= l) loop(k, l, pair_table);
	            }
	        }

	        polygon = Math.PI * (count - 2) / count; /* bending angle in loop polygon */
	        remember[++r] = j;
	        begin = i_old < 0 ? 0 : i_old;
	        for (v = 1; v <= r; v++) {
	            diff = remember[v] - begin;
	            for (fill = 0; fill <= diff; fill++) {
	                angle[begin + fill] += polygon;
	            }if (v > r) break;
	            begin = remember[++v];
	        }
	        loop_size[++lp] = bubble;
	    };

	    loop(0, len + 1, pair_table);
	    loop_size[lp] -= 2; /* correct for cheating with function loop */

	    alpha = INIT_ANGLE;
	    x[0] = INIT_X;
	    y[0] = INIT_Y;

	    var poss = [];

	    poss.push([x[0], y[0]]);
	    for (i = 1; i < len; i++) {
	        x[i] = x[i - 1] + RADIUS * Math.cos(alpha);
	        y[i] = y[i - 1] + RADIUS * Math.sin(alpha);

	        poss.push([x[i], y[i]]);
	        alpha += Math.PI - angle[i + 1];
	    }

	    return poss;
	}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.NAView = NAView;

	var _radloop = __webpack_require__(21);

	var _connection = __webpack_require__(22);

	var _region = __webpack_require__(24);

	var _base = __webpack_require__(25);

	var _loop = __webpack_require__(23);

	function NAView() {
	    this.ANUM = 9999.0;
	    this.MAXITER = 500;

	    this.bases = [];
	    this.nbase = null;
	    this.nregion = null;
	    this.loop_count = null;

	    this.root = new _loop.Loop();
	    this.loops = [];

	    this.regions = [];

	    this.rlphead = new _radloop.Radloop();

	    this.lencut = 0.8;
	    this.RADIUS_REDUCTION_FACTOR = 1.4;

	    // show algorithm step by step
	    this.angleinc = null;

	    this._h = null;

	    // private boolean noIterationFailureYet = true;

	    this.HELIX_FACTOR = 0.6;
	    this.BACKBONE_DISTANCE = 27;
	}

	NAView.prototype.naview_xy_coordinates = function (pair_table) {
	    var x = [];
	    var y = [];
	    if (pair_table.length === 0 || pair_table[0] === 0) {
	        return 0;
	    }
	    var i;
	    this.nbase = pair_table[0];
	    this.bases = [];
	    for (var index = 0; index < this.nbase + 1; index++) {
	        this.bases.push(new _base.Base());
	    }
	    this.regions = [];
	    for (var index = 0; index < this.nbase + 1; index++) {
	        this.regions.push(new _region.Region());
	    }
	    this.read_in_bases(pair_table);
	    this.rlphead = null;
	    this.find_regions();
	    this.loop_count = 0;
	    this.loops = [];
	    for (var index = 0; index < this.nbase + 1; index++) {
	        this.loops.push(new _loop.Loop());
	    }
	    this.construct_loop(0);
	    this.find_central_loop();
	    this.traverse_loop(this.root, null);

	    for (i = 0; i < this.nbase; i++) {
	        x.push(100 + this.BACKBONE_DISTANCE * this.bases[i + 1].getX());
	        y.push(100 + this.BACKBONE_DISTANCE * this.bases[i + 1].getY());
	    }

	    return {
	        nbase: this.nbase,
	        x: x,
	        y: y
	    };
	};

	NAView.prototype.read_in_bases = function read_in_bases(pair_table) {
	    var i = null;
	    var npairs = null;

	    // Set up an origin.
	    this.bases.push(new _base.Base());
	    this.bases[0].setMate(0);
	    this.bases[0].setExtracted(false);
	    this.bases[0].setX(this.ANUM);
	    this.bases[0].setY(this.ANUM);

	    for (npairs = 0, i = 1; i <= this.nbase; i++) {
	        this.bases.push(new _base.Base());
	        this.bases[i].setExtracted(false);
	        this.bases[i].setX(this.ANUM);
	        this.bases[i].setY(this.ANUM);
	        this.bases[i].setMate(pair_table[i]);
	        if (pair_table[i] > i) npairs++;
	    }
	    // must have at least 1 pair to avoid segfault
	    if (npairs == 0) {
	        this.bases[1].setMate(this.nbase);
	        this.bases[this.nbase].setMate(1);
	    }
	};

	NAView.prototype.find_regions = function find_regions() {
	    var i = null;
	    var mate = null;
	    var nb1 = null;

	    nb1 = this.nbase + 1;
	    var mark = [];
	    for (i = 0; i < nb1; i++) {
	        mark.push(false);
	    }
	    this.nregion = 0;
	    for (i = 0; i <= this.nbase; i++) {
	        if ((mate = this.bases[i].getMate()) != 0 && !mark[i]) {
	            this.regions[this.nregion].setStart1(i);
	            this.regions[this.nregion].setEnd2(mate);
	            mark[i] = true;
	            mark[mate] = true;
	            this.bases[i].setRegion(this.regions[this.nregion]);
	            this.bases[mate].setRegion(this.regions[this.nregion]);
	            for (i++, mate--; i < mate && this.bases[i].getMate() == mate; i++, mate--) {
	                mark[mate] = true;
	                mark[i] = true;
	                this.bases[i].setRegion(this.regions[this.nregion]);
	                this.bases[mate].setRegion(this.regions[this.nregion]);
	            }
	            this.regions[this.nregion].setEnd1(--i);
	            this.regions[this.nregion].setStart2(mate + 1);

	            this.nregion++;
	        }
	    }
	};

	NAView.prototype.construct_loop = function construct_loop(ibase) {
	    var i = null;
	    var mate = null;
	    var retloop = new _loop.Loop();
	    var lp = new _loop.Loop();
	    var cp = new _connection.Connection();
	    var rp = new _region.Region();
	    var rlp = new _radloop.Radloop();
	    retloop = this.loops[this.loop_count++];
	    retloop.setNconnection(0);
	    retloop.setDepth(0);
	    retloop.setNumber(this.loop_count);
	    retloop.setRadius(0.0);

	    for (rlp = this.rlphead; rlp != null; rlp = rlp.getNext()) {
	        if (rlp.getLoopnumber() == this.loop_count) retloop.setRadius(rlp.getRadius());
	    }i = ibase;
	    do {
	        if ((mate = this.bases[i].getMate()) != 0) {
	            rp = this.bases[i].getRegion();
	            if (!this.bases[rp.getStart1()].isExtracted()) {
	                if (i == rp.getStart1()) {
	                    this.bases[rp.getStart1()].setExtracted(true);
	                    this.bases[rp.getEnd1()].setExtracted(true);
	                    this.bases[rp.getStart2()].setExtracted(true);
	                    this.bases[rp.getEnd2()].setExtracted(true);
	                    lp = this.construct_loop(rp.getEnd1() < this.nbase ? rp.getEnd1() + 1 : 0);
	                } else if (i == rp.getStart2()) {
	                    this.bases[rp.getStart2()].setExtracted(true);
	                    this.bases[rp.getEnd2()].setExtracted(true);
	                    this.bases[rp.getStart1()].setExtracted(true);
	                    this.bases[rp.getEnd1()].setExtracted(true);
	                    lp = this.construct_loop(rp.getEnd2() < this.nbase ? rp.getEnd2() + 1 : 0);
	                } else {
	                    console.log("Something went terribly wrong ....");
	                }
	                retloop.setNconnection(retloop.getNconnection() + 1);
	                cp = new _connection.Connection();
	                retloop.setConnection(retloop.getNconnection() - 1, cp);
	                retloop.setConnection(retloop.getNconnection(), null);
	                cp.setLoop(lp);
	                cp.setRegion(rp);
	                if (i == rp.getStart1()) {
	                    cp.setStart(rp.getStart1());
	                    cp.setEnd(rp.getEnd2());
	                } else {
	                    cp.setStart(rp.getStart2());
	                    cp.setEnd(rp.getEnd1());
	                }
	                cp.setExtruded(false);
	                cp.setBroken(false);
	                lp.setNconnection(lp.getNconnection() + 1);
	                cp = new _connection.Connection();
	                lp.setConnection(lp.getNconnection() - 1, cp);
	                lp.setConnection(lp.getNconnection(), null);
	                cp.setLoop(retloop);
	                cp.setRegion(rp);
	                if (i == rp.getStart1()) {
	                    cp.setStart(rp.getStart2());
	                    cp.setEnd(rp.getEnd1());
	                } else {
	                    cp.setStart(rp.getStart1());
	                    cp.setEnd(rp.getEnd2());
	                }
	                cp.setExtruded(false);
	                cp.setBroken(false);
	            }
	            i = mate;
	        }
	        if (++i > this.nbase) i = 0;
	    } while (i != ibase);
	    return retloop;
	};

	NAView.prototype.find_central_loop = function find_central_loop() {
	    var lp = new _loop.Loop();
	    var maxconn = null;
	    var maxdepth = null;
	    var i = null;

	    determine_depths.bind(this)();
	    maxconn = 0;
	    maxdepth = -1;
	    for (i = 0; i < this.loop_count; i++) {
	        lp = this.loops[i];
	        if (lp.getNconnection() > maxconn) {
	            maxdepth = lp.getDepth();
	            maxconn = lp.getNconnection();
	            this.root = lp;
	        } else if (lp.getDepth() > maxdepth && lp.getNconnection() == maxconn) {
	            maxdepth = lp.getDepth();
	            this.root = lp;
	        }
	    }
	};

	function determine_depths() {
	    var lp = new _loop.Loop();
	    var i = null;
	    var j = null;

	    for (i = 0; i < this.loop_count; i++) {
	        lp = this.loops[i];
	        for (j = 0; j < this.loop_count; j++) {
	            this.loops[j].setMark(false);
	        }
	        lp.setDepth(depth(lp));
	    }
	}

	function depth(lp) {
	    var count = null;
	    var ret = null;
	    var d = null;

	    if (lp.getNconnection() <= 1) {
	        return 0;
	    }
	    if (lp.isMark()) {
	        return -1;
	    }
	    lp.setMark(true);
	    count = 0;
	    ret = 0;
	    for (var i = 0; lp.getConnection(i) != null; i++) {
	        d = depth(lp.getConnection(i).getLoop());
	        if (d >= 0) {
	            if (++count == 1) {
	                ret = d;
	            } else if (ret > d) {
	                ret = d;
	            }
	        }
	    }
	    lp.setMark(false);
	    return ret + 1;
	}

	NAView.prototype.traverse_loop = function traverse_loop(lp, anchor_connection) {
	    var xs, ys, xe, ye, xn, yn, angleinc, r;
	    var radius, xc, yc, xo, yo, astart, aend, a;
	    var cp, cpnext, acp, cpprev;
	    var i, j, n, ic;
	    var da, maxang;
	    var count, icstart, icend, icmiddle, icroot;
	    var done, done_all_connections, rooted;
	    var sign;
	    var midx, midy, nrx, nry, mx, my, vx, vy, dotmv, nmidx, nmidy;
	    var icstart1, icup, icdown, icnext, direction;
	    var dan, dx, dy, rr;
	    var cpx, cpy, cpnextx, cpnexty, cnx, cny, rcn, rc, lnx, lny, rl, ac, acn, sx, sy, dcp;
	    var imaxloop = 0;

	    angleinc = 2 * Math.PI / (this.nbase + 1);
	    acp = null;
	    icroot = -1;
	    var indice = 0;

	    for (ic = 0; (cp = lp.getConnection(indice)) != null; indice++, ic++) {
	        xs = -Math.sin(angleinc * cp.getStart());
	        ys = Math.cos(angleinc * cp.getStart());
	        xe = -Math.sin(angleinc * cp.getEnd());
	        ye = Math.cos(angleinc * cp.getEnd());
	        xn = ye - ys;
	        yn = xs - xe;
	        r = Math.sqrt(xn * xn + yn * yn);
	        cp.setXrad(xn / r);
	        cp.setYrad(yn / r);
	        cp.setAngle(Math.atan2(yn, xn));
	        if (cp.getAngle() < 0.0) {
	            cp.setAngle(cp.getAngle() + 2 * Math.PI);
	        }
	        if (anchor_connection != null && anchor_connection.getRegion() == cp.getRegion()) {
	            acp = cp;
	            icroot = ic;
	        }
	    }
	    set_radius: while (true) {
	        this.determine_radius(lp, this.lencut);
	        radius = lp.getRadius() / this.RADIUS_REDUCTION_FACTOR;
	        if (anchor_connection == null) {
	            xc = yc = 0.0;
	        } else {
	            xo = (this.bases[acp.getStart()].getX() + this.bases[acp.getEnd()].getX()) / 2.0;
	            yo = (this.bases[acp.getStart()].getY() + this.bases[acp.getEnd()].getY()) / 2.0;
	            xc = xo - radius * acp.getXrad();
	            yc = yo - radius * acp.getYrad();
	        }

	        // The construction of the connectors will proceed in blocks of
	        // connected connectors, where a connected connector pairs means two
	        // connectors that are forced out of the drawn circle because they
	        // are too close together in angle.

	        // First, find the start of a block of connected connectors

	        if (icroot == -1) {
	            icstart = 0;
	        } else {
	            icstart = icroot;
	        }
	        cp = lp.getConnection(icstart);
	        count = 0;
	        done = false;
	        do {
	            j = icstart - 1;
	            if (j < 0) {
	                j = lp.getNconnection() - 1;
	            }
	            cpprev = lp.getConnection(j);
	            if (!this.connected_connection(cpprev, cp)) {
	                done = true;
	            } else {
	                icstart = j;
	                cp = cpprev;
	            }
	            if (++count > lp.getNconnection()) {
	                // Here everything is connected. Break on maximum angular
	                // separation between connections.
	                maxang = -1.0;
	                for (ic = 0; ic < lp.getNconnection(); ic++) {
	                    j = ic + 1;
	                    if (j >= lp.getNconnection()) {
	                        j = 0;
	                    }
	                    cp = lp.getConnection(ic);
	                    cpnext = lp.getConnection(j);
	                    ac = cpnext.getAngle() - cp.getAngle();
	                    if (ac < 0.0) {
	                        ac += 2 * Math.PI;
	                    }
	                    if (ac > maxang) {
	                        maxang = ac;
	                        imaxloop = ic;
	                    }
	                }
	                icend = imaxloop;
	                icstart = imaxloop + 1;
	                if (icstart >= lp.getNconnection()) {
	                    icstart = 0;
	                }
	                cp = lp.getConnection(icend);
	                cp.setBroken(true);
	                done = true;
	            }
	        } while (!done);
	        done_all_connections = false;
	        icstart1 = icstart;
	        while (!done_all_connections) {
	            count = 0;
	            done = false;
	            icend = icstart;
	            rooted = false;
	            while (!done) {
	                cp = lp.getConnection(icend);
	                if (icend == icroot) {
	                    rooted = true;
	                }
	                j = icend + 1;
	                if (j >= lp.getNconnection()) {
	                    j = 0;
	                }
	                cpnext = lp.getConnection(j);
	                if (this.connected_connection(cp, cpnext)) {
	                    if (++count >= lp.getNconnection()) {
	                        break;
	                    }
	                    icend = j;
	                } else {
	                    done = true;
	                }
	            }
	            icmiddle = this.find_ic_middle(icstart, icend, anchor_connection, acp, lp);
	            ic = icup = icdown = icmiddle;
	            done = false;
	            direction = 0;
	            while (!done) {
	                if (direction < 0) {
	                    ic = icup;
	                } else if (direction == 0) {
	                    ic = icmiddle;
	                } else {
	                    ic = icdown;
	                }
	                if (ic >= 0) {
	                    cp = lp.getConnection(ic);
	                    if (anchor_connection == null || acp != cp) {
	                        if (direction == 0) {
	                            astart = cp.getAngle() - Math.asin(1.0 / 2.0 / radius);
	                            aend = cp.getAngle() + Math.asin(1.0 / 2.0 / radius);
	                            this.bases[cp.getStart()].setX(xc + radius * Math.cos(astart));
	                            this.bases[cp.getStart()].setY(yc + radius * Math.sin(astart));
	                            this.bases[cp.getEnd()].setX(xc + radius * Math.cos(aend));
	                            this.bases[cp.getEnd()].setY(yc + radius * Math.sin(aend));
	                        } else if (direction < 0) {
	                            j = ic + 1;
	                            if (j >= lp.getNconnection()) {
	                                j = 0;
	                            }
	                            cp = lp.getConnection(ic);
	                            cpnext = lp.getConnection(j);
	                            cpx = cp.getXrad();
	                            cpy = cp.getYrad();
	                            ac = (cp.getAngle() + cpnext.getAngle()) / 2.0;
	                            if (cp.getAngle() > cpnext.getAngle()) {
	                                ac -= Math.PI;
	                            }
	                            cnx = Math.cos(ac);
	                            cny = Math.sin(ac);
	                            lnx = cny;
	                            lny = -cnx;
	                            da = cpnext.getAngle() - cp.getAngle();
	                            if (da < 0.0) {
	                                da += 2 * Math.PI;
	                            }
	                            if (cp.isExtruded()) {
	                                if (da <= Math.PI / 2) {
	                                    rl = 2.0;
	                                } else {
	                                    rl = 1.5;
	                                }
	                            } else {
	                                rl = 1.0;
	                            }
	                            this.bases[cp.getEnd()].setX(this.bases[cpnext.getStart()].getX() + rl * lnx);
	                            this.bases[cp.getEnd()].setY(this.bases[cpnext.getStart()].getY() + rl * lny);
	                            this.bases[cp.getStart()].setX(this.bases[cp.getEnd()].getX() + cpy);
	                            this.bases[cp.getStart()].setY(this.bases[cp.getEnd()].getY() - cpx);
	                        } else {
	                            j = ic - 1;
	                            if (j < 0) {
	                                j = lp.getNconnection() - 1;
	                            }
	                            cp = lp.getConnection(j);
	                            cpnext = lp.getConnection(ic);
	                            cpnextx = cpnext.getXrad();
	                            cpnexty = cpnext.getYrad();
	                            ac = (cp.getAngle() + cpnext.getAngle()) / 2.0;
	                            if (cp.getAngle() > cpnext.getAngle()) {
	                                ac -= Math.PI;
	                            }
	                            cnx = Math.cos(ac);
	                            cny = Math.sin(ac);
	                            lnx = -cny;
	                            lny = cnx;
	                            da = cpnext.getAngle() - cp.getAngle();
	                            if (da < 0.0) {
	                                da += 2 * Math.PI;
	                            }
	                            if (cp.isExtruded()) {
	                                if (da <= Math.PI / 2) {
	                                    rl = 2.0;
	                                } else {
	                                    rl = 1.5;
	                                }
	                            } else {
	                                rl = 1.0;
	                            }
	                            this.bases[cpnext.getStart()].setX(this.bases[cp.getEnd()].getX() + rl * lnx);
	                            this.bases[cpnext.getStart()].setY(this.bases[cp.getEnd()].getY() + rl * lny);
	                            this.bases[cpnext.getEnd()].setX(this.bases[cpnext.getStart()].getX() - cpnexty);
	                            this.bases[cpnext.getEnd()].setY(this.bases[cpnext.getStart()].getY() + cpnextx);
	                        }
	                    }
	                }
	                if (direction < 0) {
	                    if (icdown == icend) {
	                        icdown = -1;
	                    } else if (icdown >= 0) {
	                        if (++icdown >= lp.getNconnection()) {
	                            icdown = 0;
	                        }
	                    }
	                    direction = 1;
	                } else {
	                    if (icup == icstart) {
	                        icup = -1;
	                    } else if (icup >= 0) {
	                        if (--icup < 0) {
	                            icup = lp.getNconnection() - 1;
	                        }
	                    }
	                    direction = -1;
	                }
	                done = icup == -1 && icdown == -1;
	            }
	            icnext = icend + 1;
	            if (icnext >= lp.getNconnection()) {
	                icnext = 0;
	            }
	            if (icend != icstart && !(icstart == icstart1 && icnext == icstart1)) {

	                // Move the bases just constructed (or the radius) so that
	                // the bisector of the end points is radius distance away
	                // from the loop center.

	                cp = lp.getConnection(icstart);
	                cpnext = lp.getConnection(icend);
	                dx = this.bases[cpnext.getEnd()].getX() - this.bases[cp.getStart()].getX();
	                dy = this.bases[cpnext.getEnd()].getY() - this.bases[cp.getStart()].getY();
	                midx = this.bases[cp.getStart()].getX() + dx / 2.0;
	                midy = this.bases[cp.getStart()].getY() + dy / 2.0;
	                rr = Math.sqrt(dx * dx + dy * dy);
	                mx = dx / rr;
	                my = dy / rr;
	                vx = xc - midx;
	                vy = yc - midy;
	                rr = Math.sqrt(dx * dx + dy * dy);
	                vx /= rr;
	                vy /= rr;
	                dotmv = vx * mx + vy * my;
	                nrx = dotmv * mx - vx;
	                nry = dotmv * my - vy;
	                rr = Math.sqrt(nrx * nrx + nry * nry);
	                nrx /= rr;
	                nry /= rr;

	                // Determine which side of the bisector the center should
	                // be.

	                dx = this.bases[cp.getStart()].getX() - xc;
	                dy = this.bases[cp.getStart()].getY() - yc;
	                ac = Math.atan2(dy, dx);
	                if (ac < 0.0) {
	                    ac += 2 * Math.PI;
	                }
	                dx = this.bases[cpnext.getEnd()].getX() - xc;
	                dy = this.bases[cpnext.getEnd()].getY() - yc;
	                acn = Math.atan2(dy, dx);
	                if (acn < 0.0) {
	                    acn += 2 * Math.PI;
	                }
	                if (acn < ac) {
	                    acn += 2 * Math.PI;
	                }
	                if (acn - ac > Math.PI) {
	                    sign = -1;
	                } else {
	                    sign = 1;
	                }
	                nmidx = xc + sign * radius * nrx;
	                nmidy = yc + sign * radius * nry;
	                if (rooted) {
	                    xc -= nmidx - midx;
	                    yc -= nmidy - midy;
	                } else {
	                    for (ic = icstart;;) {
	                        cp = lp.getConnection(ic);
	                        i = cp.getStart();
	                        this.bases[i].setX(this.bases[i].getX() + nmidx - midx);
	                        this.bases[i].setY(this.bases[i].getY() + nmidy - midy);
	                        i = cp.getEnd();
	                        this.bases[i].setX(this.bases[i].getX() + nmidx - midx);
	                        this.bases[i].setY(this.bases[i].getY() + nmidy - midy);
	                        if (ic == icend) {
	                            break;
	                        }
	                        if (++ic >= lp.getNconnection()) {
	                            ic = 0;
	                        }
	                    }
	                }
	            }
	            icstart = icnext;
	            done_all_connections = icstart == icstart1;
	        }
	        for (ic = 0; ic < lp.getNconnection(); ic++) {
	            cp = lp.getConnection(ic);
	            j = ic + 1;
	            if (j >= lp.getNconnection()) {
	                j = 0;
	            }
	            cpnext = lp.getConnection(j);
	            dx = this.bases[cp.getEnd()].getX() - xc;
	            dy = this.bases[cp.getEnd()].getY() - yc;
	            rc = Math.sqrt(dx * dx + dy * dy);
	            ac = Math.atan2(dy, dx);
	            if (ac < 0.0) {
	                ac += 2 * Math.PI;
	            }
	            dx = this.bases[cpnext.getStart()].getX() - xc;
	            dy = this.bases[cpnext.getStart()].getY() - yc;
	            rcn = Math.sqrt(dx * dx + dy * dy);
	            acn = Math.atan2(dy, dx);
	            if (acn < 0.0) {
	                acn += 2 * Math.PI;
	            }
	            if (acn < ac) {
	                acn += 2 * Math.PI;
	            }
	            dan = acn - ac;
	            dcp = cpnext.getAngle() - cp.getAngle();
	            if (dcp <= 0.0) {
	                dcp += 2 * Math.PI;
	            }
	            if (Math.abs(dan - dcp) > Math.PI) {
	                if (cp.isExtruded()) {
	                    console.log("Warning from traverse_loop. Loop " + lp.getNumber() + " has crossed regions\n");
	                } else if (cpnext.getStart() - cp.getEnd() != 1) {
	                    cp.setExtruded(true);
	                    continue set_radius; // remplacement du goto
	                }
	            }
	            if (cp.isExtruded()) {
	                this.construct_extruded_segment(cp, cpnext);
	            } else {
	                n = cpnext.getStart() - cp.getEnd();
	                if (n < 0) {
	                    n += this.nbase + 1;
	                }
	                angleinc = dan / n;
	                for (j = 1; j < n; j++) {
	                    i = cp.getEnd() + j;
	                    if (i > this.nbase) {
	                        i -= this.nbase + 1;
	                    }
	                    a = ac + j * angleinc;
	                    rr = rc + (rcn - rc) * (a - ac) / dan;
	                    this.bases[i].setX(xc + rr * Math.cos(a));
	                    this.bases[i].setY(yc + rr * Math.sin(a));
	                }
	            }
	        }
	        break;
	    }
	    for (ic = 0; ic < lp.getNconnection(); ic++) {
	        if (icroot != ic) {
	            cp = lp.getConnection(ic);
	            //IM HERE
	            this.generate_region(cp);
	            this.traverse_loop(cp.getLoop(), cp);
	        }
	    }
	    n = 0;
	    sx = 0.0;
	    sy = 0.0;
	    for (ic = 0; ic < lp.getNconnection(); ic++) {
	        j = ic + 1;
	        if (j >= lp.getNconnection()) {
	            j = 0;
	        }
	        cp = lp.getConnection(ic);
	        cpnext = lp.getConnection(j);
	        n += 2;
	        sx += this.bases[cp.getStart()].getX() + this.bases[cp.getEnd()].getX();
	        sy += this.bases[cp.getStart()].getY() + this.bases[cp.getEnd()].getY();
	        if (!cp.isExtruded()) {
	            for (j = cp.getEnd() + 1; j != cpnext.getStart(); j++) {
	                if (j > this.nbase) {
	                    j -= this.nbase + 1;
	                }
	                n++;
	                sx += this.bases[j].getX();
	                sy += this.bases[j].getY();
	            }
	        }
	    }
	    lp.setX(sx / n);
	    lp.setY(sy / n);
	};

	NAView.prototype.determine_radius = function determine_radius(lp, lencut) {
	    var mindit, ci, dt, sumn, sumd, radius, dit;
	    var i,
	        j,
	        end,
	        start,
	        imindit = 0;
	    var cp = new _connection.Connection(),
	        cpnext = new _connection.Connection();
	    var rt2_2 = 0.7071068;

	    do {
	        mindit = 1.0e10;
	        for (sumd = 0.0, sumn = 0.0, i = 0; i < lp.getNconnection(); i++) {
	            cp = lp.getConnection(i);
	            j = i + 1;
	            if (j >= lp.getNconnection()) {
	                j = 0;
	            }
	            cpnext = lp.getConnection(j);
	            end = cp.getEnd();
	            start = cpnext.getStart();
	            if (start < end) {
	                start += this.nbase + 1;
	            }
	            dt = cpnext.getAngle() - cp.getAngle();
	            if (dt <= 0.0) {
	                dt += 2 * Math.PI;
	            }
	            if (!cp.isExtruded()) {
	                ci = start - end;
	            } else {
	                if (dt <= Math.PI / 2) {
	                    ci = 2.0;
	                } else {
	                    ci = 1.5;
	                }
	            }
	            sumn += dt * (1.0 / ci + 1.0);
	            sumd += dt * dt / ci;
	            dit = dt / ci;
	            if (dit < mindit && !cp.isExtruded() && ci > 1.0) {
	                mindit = dit;
	                imindit = i;
	            }
	        }
	        radius = sumn / sumd;
	        if (radius < rt2_2) {
	            radius = rt2_2;
	        }
	        if (mindit * radius < lencut) {
	            lp.getConnection(imindit).setExtruded(true);
	        }
	    } while (mindit * radius < lencut);
	    if (lp.getRadius() > 0.0) {
	        radius = lp.getRadius();
	    } else {
	        lp.setRadius(radius);
	    }
	};

	NAView.prototype.find_ic_middle = function find_ic_middle(icstart, icend, anchor_connection, acp, lp) {
	    var count, ret, ic, i;
	    var done;

	    count = 0;
	    ret = -1;
	    ic = icstart;
	    done = false;
	    while (!done) {
	        if (count++ > lp.getNconnection() * 2) {
	            console.log("Infinite loop in 'find_ic_middle'");
	        }
	        if (anchor_connection != null && lp.getConnection(ic) == acp) {
	            ret = ic;
	        }
	        done = ic == icend;
	        if (++ic >= lp.getNconnection()) {
	            ic = 0;
	        }
	    }
	    if (ret == -1) {
	        for (i = 1, ic = icstart; i < (count + 1) / 2; i++) {
	            if (++ic >= lp.getNconnection()) ic = 0;
	        }
	        ret = ic;
	    }
	    return ret;
	};

	NAView.prototype.construct_extruded_segment = function construct_extruded_segment(cp, cpnext) {
	    var astart, aend1, aend2, aave, dx, dy, a1, a2, ac, rr, da, dac;
	    var start, end, n, nstart, nend;
	    var collision;

	    astart = cp.getAngle();
	    aend2 = aend1 = cpnext.getAngle();
	    if (aend2 < astart) {
	        aend2 += 2 * Math.PI;
	    }
	    aave = (astart + aend2) / 2.0;
	    start = cp.getEnd();
	    end = cpnext.getStart();
	    n = end - start;
	    if (n < 0) {
	        n += this.nbase + 1;
	    }
	    da = cpnext.getAngle() - cp.getAngle();
	    if (da < 0.0) {
	        da += 2 * Math.PI;
	    }
	    if (n == 2) {
	        this.construct_circle_segment(start, end);
	    } else {
	        dx = this.bases[end].getX() - this.bases[start].getX();
	        dy = this.bases[end].getY() - this.bases[start].getY();
	        rr = Math.sqrt(dx * dx + dy * dy);
	        dx /= rr;
	        dy /= rr;
	        if (rr >= 1.5 && da <= Math.PI / 2) {
	            nstart = start + 1;
	            if (nstart > this.nbase) {
	                nstart -= this.nbase + 1;
	            }
	            nend = end - 1;
	            if (nend < 0) {
	                nend += this.nbase + 1;
	            }
	            this.bases[nstart].setX(this.bases[start].getX() + 0.5 * dx);
	            this.bases[nstart].setY(this.bases[start].getY() + 0.5 * dy);
	            this.bases[nend].setX(this.bases[end].getX() - 0.5 * dx);
	            this.bases[nend].setY(this.bases[end].getY() - 0.5 * dy);
	            start = nstart;
	            end = nend;
	        }
	        do {
	            collision = false;
	            this.construct_circle_segment(start, end);
	            nstart = start + 1;
	            if (nstart > this.nbase) {
	                nstart -= this.nbase + 1;
	            }
	            dx = this.bases[nstart].getX() - this.bases[start].getX();
	            dy = this.bases[nstart].getY() - this.bases[start].getY();
	            a1 = Math.atan2(dy, dx);
	            if (a1 < 0.0) {
	                a1 += 2 * Math.PI;
	            }
	            dac = a1 - astart;
	            if (dac < 0.0) {
	                dac += 2 * Math.PI;
	            }
	            if (dac > Math.PI) {
	                collision = true;
	            }
	            nend = end - 1;
	            if (nend < 0) {
	                nend += this.nbase + 1;
	            }
	            dx = this.bases[nend].getX() - this.bases[end].getX();
	            dy = this.bases[nend].getY() - this.bases[end].getY();
	            a2 = Math.atan2(dy, dx);
	            if (a2 < 0.0) {
	                a2 += 2 * Math.PI;
	            }
	            dac = aend1 - a2;
	            if (dac < 0.0) {
	                dac += 2 * Math.PI;
	            }
	            if (dac > Math.PI) {
	                collision = true;
	            }
	            if (collision) {
	                ac = this.minf2(aave, astart + 0.5);
	                this.bases[nstart].setX(this.bases[start].getX() + Math.cos(ac));
	                this.bases[nstart].setY(this.bases[start].getY() + Math.sin(ac));
	                start = nstart;
	                ac = this.maxf2(aave, aend2 - 0.5);
	                this.bases[nend].setX(this.bases[end].getX() + Math.cos(ac));
	                this.bases[nend].setY(this.bases[end].getY() + Math.sin(ac));
	                end = nend;
	                n -= 2;
	            }
	        } while (collision && n > 1);
	    }
	};

	NAView.prototype.construct_circle_segment = function construct_circle_segment(start, end) {
	    var dx, dy, rr, midx, midy, xn, yn, nrx, nry, mx, my, a;
	    var l, j, i;

	    dx = this.bases[end].getX() - this.bases[start].getX();
	    dy = this.bases[end].getY() - this.bases[start].getY();
	    rr = Math.sqrt(dx * dx + dy * dy);
	    l = end - start;
	    if (l < 0) {
	        l += this.nbase + 1;
	    }
	    if (rr >= l) {
	        dx /= rr;
	        dy /= rr;
	        for (j = 1; j < l; j++) {
	            i = start + j;
	            if (i > this.nbase) {
	                i -= this.nbase + 1;
	            }
	            this.bases[i].setX(this.bases[start].getX() + dx * j / l);
	            this.bases[i].setY(this.bases[start].getY() + dy * j / l);
	        }
	    } else {
	        this.find_center_for_arc(l - 1, rr);
	        dx /= rr;
	        dy /= rr;
	        midx = this.bases[start].getX() + dx * rr / 2.0;
	        midy = this.bases[start].getY() + dy * rr / 2.0;
	        xn = dy;
	        yn = -dx;
	        nrx = midx + this._h * xn;
	        nry = midy + this._h * yn;
	        mx = this.bases[start].getX() - nrx;
	        my = this.bases[start].getY() - nry;
	        rr = Math.sqrt(mx * mx + my * my);
	        a = Math.atan2(my, mx);
	        for (j = 1; j < l; j++) {
	            i = start + j;
	            if (i > this.nbase) {
	                i -= this.nbase + 1;
	            }
	            this.bases[i].setX(nrx + rr * Math.cos(a + j * this.angleinc));
	            this.bases[i].setY(nry + rr * Math.sin(a + j * this.angleinc));
	        }
	    }
	};

	NAView.prototype.find_center_for_arc = function find_center_for_arc(n, b) {
	    var h, hhi, hlow, r, disc, theta, e, phi;
	    var iter;

	    hhi = (n + 1.0) / Math.PI;
	    // changed to prevent div by zero if (ih)
	    hlow = -hhi - b / (n + 1.000001 - b);
	    if (b < 1) {
	        // otherwise we might fail below (ih)
	        hlow = 0;
	    }
	    iter = 0;
	    do {
	        h = (hhi + hlow) / 2.0;
	        r = Math.sqrt(h * h + b * b / 4.0);
	        disc = 1.0 - 0.5 / (r * r);
	        if (Math.abs(disc) > 1.0) {
	            console.log("Unexpected large magnitude discriminant = " + disc + " " + r);
	        }
	        theta = Math.acos(disc);
	        phi = Math.acos(h / r);
	        e = theta * (n + 1) + 2 * phi - 2 * Math.PI;
	        if (e > 0.0) {
	            hlow = h;
	        } else {
	            hhi = h;
	        }
	    } while (Math.abs(e) > 0.0001 && ++iter < this.MAXITER);
	    if (iter >= this.MAXITER) {
	        if (noIterationFailureYet) {
	            console.log("Iteration failed in find_center_for_arc");
	            noIterationFailureYet = false;
	        }
	        h = 0.0;
	        theta = 0.0;
	    }
	    this._h = h;
	    this.angleinc = theta;
	};

	NAView.prototype.generate_region = function generate_region(cp) {
	    var l, start, end, i, mate;
	    var rp;

	    rp = cp.getRegion();
	    l = 0;
	    if (cp.getStart() == rp.getStart1()) {
	        start = rp.getStart1();
	        end = rp.getEnd1();
	    } else {
	        start = rp.getStart2();
	        end = rp.getEnd2();
	    }
	    if (this.bases[cp.getStart()].getX() > this.ANUM - 100.0 || this.bases[cp.getEnd()].getX() > this.ANUM - 100.0) {
	        console.log("Bad region passed to generate_region. Coordinates not defined.");
	    }
	    for (i = start + 1; i <= end; i++) {
	        l++;
	        this.bases[i].setX(this.bases[cp.getStart()].getX() + this.HELIX_FACTOR * l * cp.getXrad());
	        this.bases[i].setY(this.bases[cp.getStart()].getY() + this.HELIX_FACTOR * l * cp.getYrad());
	        mate = this.bases[i].getMate();
	        this.bases[mate].setX(this.bases[cp.getEnd()].getX() + this.HELIX_FACTOR * l * cp.getXrad());
	        this.bases[mate].setY(this.bases[cp.getEnd()].getY() + this.HELIX_FACTOR * l * cp.getYrad());
	    }
	};

	NAView.prototype.minf2 = function minf2(x1, x2) {
	    return x1 < x2 ? x1 : x2;
	};

	NAView.prototype.maxf2 = function maxf2(x1, x2) {
	    return x1 > x2 ? x1 : x2;
	};

	NAView.prototype.connected_connection = function connected_connection(cp, cpnext) {
	    if (cp.isExtruded()) {
	        return true;
	    } else if (cp.getEnd() + 1 == cpnext.getStart()) {
	        return true;
	    } else {
	        return false;
	    }
	};

/***/ }),
/* 21 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Radloop = Radloop;
	function Radloop() {
		this.radius = null;
		this.loopnumber = null;
		this.next = null;
		this.prev = null;
	}

	Radloop.prototype.getRadius = function () {
		return this.radius;
	};

	Radloop.prototype.setRadius = function (radius) {
		this.radius = radius;
	};

	Radloop.prototype.getLoopnumber = function () {
		return this.loopnumber;
	};

	Radloop.prototype.setLoopnumber = function (loopnumber) {
		this.loopnumber = loopnumber;
	};

	Radloop.prototype.getNext = function () {
		return this.next;
	};

	Radloop.prototype.setNext = function (next) {
		this.next = next;
	};

	Radloop.prototype.getPrev = function () {
		return this.prev;
	};

	Radloop.prototype.setPrev = function (prev) {
		this.prev = prev;
	};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Connection = Connection;

	var _loop = __webpack_require__(23);

	var _region = __webpack_require__(24);

	function Connection() {
		this.loop = new _loop.Loop();
		this.region = new _region.Region();
		// Start and end form the 1st base pair of the region.
		this.start = null;
		this.end = null;
		this.xrad = null;
		this.yrad = null;
		this.angle = null;
		// True if segment between this connection and the
		// next must be extruded out of the circle
		this.extruded = null;
		// True if the extruded segment must be drawn long.
		this.broken = null;

		this._isNull = false;
	}

	Connection.prototype.isNull = function () {
		return this._isNull;
	};

	Connection.prototype.setNull = function (isNull) {
		this._isNull = isNull;
	};

	Connection.prototype.getLoop = function () {
		return this.loop;
	};

	Connection.prototype.setLoop = function (loop) {
		this.loop = loop;
	};

	Connection.prototype.getRegion = function () {
		return this.region;
	};

	Connection.prototype.setRegion = function (region) {
		this.region = region;
	};

	Connection.prototype.getStart = function () {
		return this.start;
	};

	Connection.prototype.setStart = function (start) {
		this.start = start;
	};

	Connection.prototype.getEnd = function () {
		return this.end;
	};

	Connection.prototype.setEnd = function (end) {
		this.end = end;
	};

	Connection.prototype.getXrad = function () {
		return this.xrad;
	};

	Connection.prototype.setXrad = function (xrad) {
		this.xrad = xrad;
	};

	Connection.prototype.getYrad = function () {
		return this.yrad;
	};

	Connection.prototype.setYrad = function (yrad) {
		this.yrad = yrad;
	};

	Connection.prototype.getAngle = function () {
		return this.angle;
	};

	Connection.prototype.setAngle = function (angle) {
		this.angle = angle;
	};

	Connection.prototype.isExtruded = function () {
		return this.extruded;
	};

	Connection.prototype.setExtruded = function (extruded) {
		this.extruded = extruded;
	};

	Connection.prototype.isBroken = function () {
		return this.broken;
	};

	Connection.prototype.setBroken = function (broken) {
		this.broken = broken;
	};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Loop = Loop;

	var _connection = __webpack_require__(22);

	function Loop() {
		this.nconnection = null;
		this.connections = [];
		this._connections = [];
		this.number = null;
		this.depth = null;
		this.mark = null;
		this.x = null;
		this.y = null;
		this.radius = null;
	}

	Loop.prototype.getNconnection = function () {
		return this.nconnection;
	};

	Loop.prototype.setNconnection = function (nconnection) {
		this.nconnection = nconnection;
	};

	Loop.prototype.setConnection = function (i, c) {
		if (c != null) {
			this._connections[i] = c;
		} else {
			if (!this._connections[i]) {
				this._connections[i] = new _connection.Connection();
			}
			this._connections[i].setNull(true);
		}
	};

	Loop.prototype.getConnection = function (i) {
		var Connection = __webpack_require__(22);
		if (!this._connections[i]) {
			this._connections[i] = new Connection();
		}
		var c = this._connections[i];
		if (c.isNull()) {
			return null;
		} else {
			return c;
		}
	};

	Loop.prototype.addConnection = function (i, c) {
		this._connections.push(c);
	};

	Loop.prototype.getNumber = function () {
		return this.number;
	};

	Loop.prototype.setNumber = function (number) {
		this.number = number;
	};

	Loop.prototype.getDepth = function () {
		return this.depth;
	};

	Loop.prototype.setDepth = function (depth) {
		this.depth = depth;
	};

	Loop.prototype.isMark = function () {
		return this.mark;
	};

	Loop.prototype.setMark = function (mark) {
		this.mark = mark;
	};

	Loop.prototype.getX = function () {
		return this.x;
	};

	Loop.prototype.setX = function (x) {
		this.x = x;
	};

	Loop.prototype.getY = function () {
		return this.y;
	};

	Loop.prototype.setY = function (y) {
		this.y = y;
	};

	Loop.prototype.getRadius = function () {
		return this.radius;
	};

	Loop.prototype.setRadius = function (radius) {
		this.radius = radius;
	};

/***/ }),
/* 24 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Region = Region;
	function Region() {
		this._start1 = null;
		this._end1 = null;
		this._start2 = null;
		this._end2 = null;
	}

	Region.prototype.getStart1 = function () {
		return this._start1;
	};

	Region.prototype.setStart1 = function (start1) {
		this._start1 = start1;
	};

	Region.prototype.getEnd1 = function () {
		return this._end1;
	};

	Region.prototype.setEnd1 = function (end1) {
		this._end1 = end1;
	};

	Region.prototype.getStart2 = function () {
		return this._start2;
	};

	Region.prototype.setStart2 = function (start2) {
		this._start2 = start2;
	};

	Region.prototype.getEnd2 = function () {
		return this._end2;
	};

	Region.prototype.setEnd2 = function (end2) {
		this._end2 = end2;
	};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Base = Base;

	var _region = __webpack_require__(24);

	function Base() {
		this.mate = null;
		this.x = null;
		this.y = null;
		this.extracted = null;
		this.region = new _region.Region();
	}

	Base.prototype.getMate = function () {
		return this.mate;
	};

	Base.prototype.setMate = function (mate) {
		this.mate = mate;
	};

	Base.prototype.getX = function () {
		return this.x;
	};

	Base.prototype.setX = function (x) {
		this.x = x;
	};

	Base.prototype.getY = function () {
		return this.y;
	};

	Base.prototype.setY = function (y) {
		this.y = y;
	};

	Base.prototype.isExtracted = function () {
		return this.extracted;
	};

	Base.prototype.setExtracted = function (extracted) {
		this.extracted = extracted;
	};

	Base.prototype.getRegion = function () {
		return this.region;
	};

	Base.prototype.setRegion = function (region) {
		this.region = region;
	};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.rnaPlot = rnaPlot;

	var _simplernaplot = __webpack_require__(19);

	var _rnagraph = __webpack_require__(1);

	var _naview = __webpack_require__(20);

	var _rnautils = __webpack_require__(2);

	__webpack_require__(27);

	var number_sort = function number_sort(a, b) {
	    return a - b;
	};

	function isNormalInteger(str) {
	    //http://stackoverflow.com/a/10834843/899470
	    return (/^\+?(0|[1-9]\d*)$/.test(str)
	    );
	}

	if (typeof String.prototype.trim === 'undefined') {
	    String.prototype.trim = function () {
	        return String(this).replace(/^\s+|\s+$/g, '');
	    };
	}

	function rnaPlot() {
	    var options = {
	        'width': 400,
	        'height': 400,
	        'nucleotideRadius': 5,
	        'rnaEdgePadding': 0, // how far the leftmost, rightmost, topmost and bottomost
	        // nucleotides are from the edge of the plot
	        'labelInterval': 0,
	        'showNucleotideLabels': true,
	        'startNucleotideNumber': 1,
	        'bundleExternalLinks': false
	    };

	    var xScale, yScale;

	    function createTransformToFillViewport(xValues, yValues) {
	        var molName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

	        // create transform that will scale the x and y values so that
	        // they fill the available viewport

	        // find out leftmost, rightmost, topmost, bottommost positions of each
	        // nucleotide so that we can create a scale
	        var xExtent = d3.extent(xValues);
	        var yExtent = d3.extent(yValues);

	        var NAME_OFFSET = 30;
	        if (molName != '') yExtent[1] += NAME_OFFSET;

	        // add the radius of the nucleotides
	        xExtent[0] -= options.nucleotideRadius + options.rnaEdgePadding;
	        yExtent[0] -= options.nucleotideRadius + options.rnaEdgePadding;

	        xExtent[1] += options.nucleotideRadius + options.rnaEdgePadding;
	        yExtent[1] += options.nucleotideRadius + options.rnaEdgePadding;

	        // find out how wide and height the molecule
	        var xRange = xExtent[1] - xExtent[0];
	        var yRange = yExtent[1] - yExtent[0];

	        // how much wider / taller is it than the available viewport
	        var xExtra = xRange - options.width;
	        var yExtra = yRange - options.height;

	        // once we have a scale for one dimension, we can create the scale for the other
	        // keeping the same expansion / shrinking ratio
	        function createOtherScale(firstScale, newDomain, newRange) {
	            var scaleFactor = (firstScale.range()[1] - firstScale.range()[0]) / (firstScale.domain()[1] - firstScale.domain()[0]);
	            var newWidth = (newDomain[1] - newDomain[0]) * scaleFactor;
	            var newMargin = (newRange[1] - newRange[0] - newWidth) / 2;

	            return { 'scaleFactor': scaleFactor,
	                'scale': d3.scale.linear().domain(newDomain).range([newRange[0] + newMargin, newRange[1] - newMargin]) };
	        }

	        var ret;

	        if (xExtra > yExtra) {
	            // we have to shrink more in the x-dimension than the y
	            xScale = d3.scale.linear().domain(xExtent).range([0, options.width]);

	            ret = createOtherScale(xScale, yExtent, [0, options.height]);
	            yScale = ret.scale;
	        } else {
	            // we have to shrink more in the x-dimension than the y
	            yScale = d3.scale.linear().domain(yExtent).range([0, options.height]);

	            ret = createOtherScale(yScale, xExtent, [0, options.width]);
	            xScale = ret.scale;
	        }

	        var xOffset = xScale.range()[0] - xScale.domain()[0];
	        var yOffset = yScale.range()[0] - yScale.domain()[0];

	        return 'translate(' + -(xScale.domain()[0] * ret.scaleFactor - xScale.range()[0]) + ',' + -(yScale.domain()[0] * ret.scaleFactor - yScale.range()[0]) + ')' + 'scale(' + ret.scaleFactor + ')';
	    }

	    function createNucleotides(selection, nucleotideNodes) {
	        // create groupings for each nucleotide and label
	        var gs = selection.selectAll('.rna-base').data(nucleotideNodes).enter().append('svg:g').attr('transform', function (d) {
	            return 'translate(' + d.x + ',' + d.y + ')';
	        });

	        var circles = gs.append('svg:circle').attr('r', options.nucleotideRadius).classed('rna-base', true);

	        if (options.showNucleotideLabels) {
	            var nucleotideLabels = gs.append('svg:text').text(function (d) {
	                return d.name;
	            }).attr('text-anchor', 'middle').attr('dominant-baseline', 'central').classed('nucleotide-label', true).append('svg:title').text(function (d) {
	                return d.struct_name + ':' + d.num;
	            });
	        }
	    }

	    function createLabels(selection, labelNodes) {
	        // create groupings for each nucleotide and label

	        var gs = selection.selectAll('.rnaLabel').data(labelNodes).enter().append('svg:g').attr('transform', function (d) {
	            return 'translate(' + d.x + ',' + d.y + ')';
	        });

	        var numberLabels = gs.append('svg:text').text(function (d) {
	            return d.name;
	        }).attr('text-anchor', 'middle').attr('font-weight', 'bold').attr('dominant-baseline', 'central').classed('number-label', true);
	    }

	    function createName(selection, name) {
	        selection.append('svg:text').attr('transform', 'translate(' + xScale.invert(options.width / 2) + ',' + yScale.invert(options.height) + ')').attr('dy', -10).classed('rna-name', true).text(name);
	    }

	    function makeExternalLinksBundle(selection, links) {
	        var nodesDict = {};
	        var linksList = [];
	        links = links.filter(function (d) {
	            return d.linkType == 'correct' || d.linkType == 'incorrect' || d.linkType == 'extra';
	        });

	        selection.selectAll('[link-type=extra]').remove();

	        for (var i = 0; i < links.length; i++) {
	            if (links[i].source === null || links[i].target === null) continue;

	            nodesDict[links[i].source.uid] = links[i].source;
	            nodesDict[links[i].target.uid] = links[i].target;

	            linksList.push({ 'source': links[i].source.uid, 'target': links[i].target.uid, 'linkType': links[i].linkType, 'extraLinkType': links[i].extraLinkType });
	        }

	        var fbundling = d3.ForceEdgeBundling().nodes(nodesDict).edges(linksList).compatibility_threshold(0.8).step_size(0.2);
	        var results = fbundling();

	        var d3line = d3.svg.line().x(function (d) {
	            return d.x;
	        }).y(function (d) {
	            return d.y;
	        }).interpolate('linear');

	        for (var i = 0; i < results.length; i++) {
	            var edge_subpoint_data = results[i];
	            // for each of the arrays in the results
	            // draw a line between the subdivions points for that edge

	            selection.append('path').attr('d', d3line(edge_subpoint_data)).style('fill', 'none').attr('link-type', function (d) {
	                return linksList[i].linkType;
	            }).attr('extra-link-type', function (d) {
	                return linksList[i].extraLinkType;
	            }).style('stroke-opacity', 0.4); //use opacity as blending
	        }
	    }

	    function createLinks(selection, links) {
	        links = links.filter(function (d) {
	            return d.source !== null && d.target !== null;
	        });
	        var gs = selection.selectAll('.rna-link').data(links).enter().append('svg:line').attr('x1', function (d) {
	            return d.source.x;
	        }).attr('x2', function (d) {
	            return d.target.x;
	        }).attr('y1', function (d) {
	            return d.source.y;
	        }).attr('y2', function (d) {
	            return d.target.y;
	        }).attr('link-type', function (d) {
	            return d.linkType;
	        }).attr('extra-link-type', function (d) {
	            return d.extraLinkType;
	        }).classed('rna-link', true);
	    }

	    function chart(selection) {
	        selection.each(function (data) {
	            // data should be a dictionary containing at least a structure
	            // and possibly a sequence
	            var rg = new _rnagraph.RNAGraph(data.sequence, data.structure, data.name).recalculateElements().elementsToJson().addName(data.name);

	            data.rnaGraph = rg;
	            // calculate the position of each nucleotide
	            // the positions of the labels will be calculated in
	            // the addLabels function
	            //var positions = simpleXyCoordinates(rg.pairtable);
	            var naview = new _naview.NAView();

	            var naViewPositions = naview.naview_xy_coordinates(rg.pairtable);
	            var positions = [];
	            for (var i = 0; i < naViewPositions.nbase; i++) {
	                positions.push([naViewPositions.x[i], naViewPositions.y[i]]);
	            }
	            rg.addPositions('nucleotide', positions).reinforceStems().reinforceLoops().addExtraLinks(data.extraLinks).addLabels(options.startNucleotideNumber, options.labelInterval);

	            // create a transform that will fit the molecule to the
	            // size of the viewport (canvas, svg, whatever)
	            var fillViewportTransform = createTransformToFillViewport(rg.nodes.map(function (d) {
	                return d.x;
	            }), rg.nodes.map(function (d) {
	                return d.y;
	            }));

	            var gTransform = d3.select(this).append('g').attr('transform', fillViewportTransform);

	            var nucleotideNodes = rg.nodes.filter(function (d) {
	                return d.nodeType == 'nucleotide';
	            });

	            var labelNodes = rg.nodes.filter(function (d) {
	                return d.nodeType == 'label';
	            });

	            var links = rg.links;

	            createLinks(gTransform, links);
	            createNucleotides(gTransform, nucleotideNodes);
	            createLabels(gTransform, labelNodes);
	            createName(gTransform, data.name);

	            if (options.bundleExternalLinks) {
	                makeExternalLinksBundle(gTransform, links);
	            }
	        });
	    }

	    chart.width = function (_) {
	        if (!arguments.length) return options.width;
	        options.width = _;
	        return chart;
	    };

	    chart.height = function (_) {
	        if (!arguments.length) return options.height;
	        options.height = _;
	        return chart;
	    };

	    chart.showNucleotideLabels = function (_) {
	        if (!arguments.length) return options.showNucleotideLabels;
	        options.showNucleotideLabels = _;
	        return chart;
	    };

	    chart.rnaEdgePadding = function (_) {
	        if (!arguments.length) return options.rnaEdgePadding;
	        options.rnaEdgePadding = _;
	        return chart;
	    };

	    chart.nucleotideRadius = function (_) {
	        if (!arguments.length) return options.nucleotideRadius;
	        options.nucleotideRadius = _;
	        return chart;
	    };

	    chart.labelInterval = function (_) {
	        if (!arguments.length) return options.labelInterval;
	        options.labelInterval = _;
	        return chart;
	    };

	    chart.showNucleotideLabels = function (_) {
	        if (!arguments.length) return options.showNucleotideLabels;
	        options.showNucleotideLabels = _;
	        return chart;
	    };

	    chart.startNucleotideNumber = function (_) {
	        if (!arguments.length) return options.startNucleotideNumber;
	        options.startNucleotideNumber = _;
	        return chart;
	    };

	    chart.bundleExternalLinks = function (_) {
	        if (!arguments.length) return options.bundleExternalLinks;
	        options.bundleExternalLinks = _;
	        return chart;
	    };

	    return chart;
	}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(28);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(14)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!./rnaplot.css", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!./rnaplot.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(13)();
	// imports


	// module
	exports.push([module.id, ".structure-background-rect {\n    stroke: black;\n    stroke-width: 5;\n    fill: transparent;\n}\n\ncircle.rna-base {\n  stroke: #ccc;\n  stroke-width: 1px;\n  opacity: 1;\n  fill: white;\n}\n\ncircle.rna-base.label {\n    stroke: transparent;\n    stroke-width: 0;\n    fill: white;\n}\n\nline.link {\n  stroke: #999;\n  stroke-opacity: 0.8;\n  stroke-width: 2;\n}\n\nline.rna-link {\n  stroke: #999;\n  stroke-opacity: 0.8;\n  stroke-width: 2;\n}\n\n.overlay {\n    fill: transparent;\n}\n\n.rna-name {\n    text-anchor: middle;\n    dy: -10;\n    font-family: Tahoma, Geneva, sans-serif;\n    font-size: 8pt;\n}\n\nline.rna-link[link-type=\"fake\"] {\n    stroke: transparent;\n}\n\nline.rna-link[link-type=\"extra\"] {\n    stroke: grey;\n}\n\nline.rna-link[extra-link-type=\"correct\"] {\n    stroke: green;\n}\n\nline.rna-link[extra-link-type=\"incorrect\"] {\n    stroke: green;\n}\n\n\npath {\n    stroke: grey;\n  stroke-width: 2;\n}\n\npath[extra-link-type=\"correct\"] {\n    stroke: green;\n}\n\npath[extra-link-type=\"incorrect\"] {\n    stroke: red;\n}\n\n\nline.basepair {\n  stroke: red;\n}\n\nline.intermolecule {\n  stroke: blue;\n}\n\nline.chain_chain {\n  stroke-dasharray: 3,3;\n}\n\nline.fake {\n  stroke: green;\n}\n\n.transparent {\n    fill: transparent;\n    stroke-width: 0;\n    stroke-opacity: 0;\n    opacity: 0;\n}\n\n.d3-tip {\n    line-height: 1;\n    font-weight: bold;\n    padding: 6px;\n    background: rgba(0, 0, 0, 0.6);\n    color: #fff;\n    border-radius: 4px;\n    pointer-events: none;\n          }\n\ntext.nucleotide-label {\n    font-size: 5.5pt;\n    font-weight: bold;\n    font-family: Tahoma, Geneva, sans-serif;\n    color: rgb(100,100,100);\n    pointer-events: none;\n}\n\ntext.number-label {\n    font-size: 5.5pt;\n    font-weight: bold;\n    font-family: Tahoma, Geneva, sans-serif;\n    color: rgb(100,100,100);\n    pointer-events: none;\n}\n\ntext {\n    pointer-events: none;\n}\n\ng.gnode {\n\n}\n\n.brush .extent {\n  fill-opacity: .1;\n  stroke: #fff;\n  shape-rendering: crispEdges;\n}\n\n.noselect {\n    -webkit-touch-callout: none;\n    -webkit-user-select: none;\n    -khtml-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n}\n", ""]);

	// exports


/***/ })
/******/ ])
});
;