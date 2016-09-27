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
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(3);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ProteinGraph = ProteinGraph;
	exports.RNAGraph = RNAGraph;
	exports.moleculesToJson = moleculesToJson;

	var _rnautils = __webpack_require__(2);

	var numberSort = function numberSort(a, b) {
	    return a - b;
	};

	function generateUUID() {
	    /* Stack Overflow:                                                                                          
	     * http://stackoverflow.com/a/8809472/899470                                                                
	     */
	    var d = new Date().getTime();
	    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
	        var r = (d + Math.random() * 16) % 16 | 0;
	        d = Math.floor(d / 16);
	        return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
	    });

	    return uuid;
	}

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
	        'uid': generateUUID() }];

	    self.links = [];
	    self.uid = generateUUID();

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

	    self.uid = generateUUID();

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
	        }return self;
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
	            targetString = targetString.substring(0, breakIndex) + 'oo' + targetString.substring(breakIndex + 1, targetString.length);
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

	        for (var i = 0; i < self.elements.length; i++) {
	            var broken = false;

	            // change the elemType of the other nodes in the element containing
	            // the break
	            for (var j = 0; j < self.elements[i][2].length; j++) {
	                if (self.dotBracketBreaks.indexOf(self.elements[i][2][j]) >= 0) broken = true;
	            }

	            if (broken) {
	                self.elements[i][2].map(function (x) {
	                    if (x == 0) return;
	                    self.nodes[x - 1].elemType = 'e';
	                });
	            } else {
	                self.elements[i][2].map(function (x) {
	                    if (x == 0) return;
	                    self.nodes[x - 1].elemType = self.elements[i][0];
	                });
	            }
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
	            var nucs = allNucs.slice(0, allNucs.length / 2);

	            for (var j = 0; j < nucs.length - 1; j++) {
	                self.addFakeNode([nucs[j], nucs[j + 1], pt[nucs[j + 1]], pt[nucs[j]]]);
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
	                    'uid': generateUUID() };
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
	                    'uid': generateUUID() };

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
	                'uid': generateUUID() });

	            if (nucs.length > 4) {
	                //link across the loop
	                self.links.push({ 'source': self.nodes[nucs[j] - 1],
	                    'target': self.nodes[nucs[(j + Math.floor(nucs.length / 2)) % nucs.length] - 1],
	                    'linkType': 'fake',
	                    'value': radius * 2,
	                    'uid': generateUUID() });
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
	                'extraLinkType': extraLinks[i].linkType, 'uid': generateUUID() };

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

	        for (var i = 1; i <= pt[0]; i++) {
	            var nodeName = self.seq[i - 1];

	            if (self.dotBracketBreaks.indexOf(i - 1) >= 0 || self.dotBracketBreaks.indexOf(i - 2) >= 0) {
	                nodeName = '';
	            }

	            //create a node for each nucleotide
	            self.nodes.push({ 'name': nodeName,
	                'num': i + self.startNumberArray[i - 1] - 1,
	                'radius': 5,
	                'rna': self,
	                'nodeType': 'nucleotide',
	                'structName': self.structName,
	                'elemType': elemTypes[i],
	                'uid': generateUUID(),
	                'linked': false });
	        }

	        for (var i = 0; i < self.nodes.length; i++) {
	            if (i === 0) self.nodes[i].prevNode = null;else {
	                self.nodes[i].prevNode = self.nodes[i - 1];
	            }

	            if (i == self.nodes.length - 1) self.nodes[i].nextNode = null;else {
	                self.nodes[i].nextNode = self.nodes[i + 1];
	            }
	        }

	        for (var i = 1; i <= pt[0]; i++) {

	            if (pt[i] !== 0) {
	                // base-pair links
	                self.links.push({ 'source': self.nodes[i - 1],
	                    'target': self.nodes[pt[i] - 1],
	                    'linkType': 'basepair',
	                    'value': 1,
	                    'uid': generateUUID() });
	            }

	            if (i > 1) {
	                // backbone links
	                if (self.dotBracketBreaks.indexOf(i - 1) === -1 && self.dotBracketBreaks.indexOf(i - 2) == -1 && self.dotBracketBreaks.indexOf(i - 3) == -1) {
	                    // there is no break in the strands here
	                    // we can add a backbone link
	                    self.links.push({ 'source': self.nodes[i - 2],
	                        'target': self.nodes[i - 1],
	                        'linkType': 'backbone',
	                        'value': 1,
	                        'uid': generateUUID() });
	                    self.nodes[i - 1].linked = true;
	                }
	            }
	        }

	        //add the pseudoknot links
	        for (var i = 0; i < self.pseudoknotPairs.length; i++) {
	            self.links.push({ 'source': self.nodes[self.pseudoknotPairs[i][0] - 1],
	                'target': self.nodes[self.pseudoknotPairs[i][1] - 1],
	                'linkType': 'pseudoknot',
	                'value': 1,
	                'uid': generateUUID() });
	        }

	        if (self.circular) {
	            self.links.push({ 'source': self.nodes[0],
	                'target': self.nodes[self.rnaLength - 1],
	                'linkType': 'backbone',
	                'value': 1,
	                'uid': generateUUID() });
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
	                    'uid': generateUUID() };
	                var newLink = { 'source': self.nodes[i - 1],
	                    'target': newNode,
	                    'value': 1,
	                    'linkType': 'label_link',
	                    'uid': generateUUID() };

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
	        link.uid = generateUUID();

	        extraLinks.push(link);
	    }

	    return { 'graphs': graphs, 'extraLinks': extraLinks };
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	!function(r,t){ true?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.rnautils=t():r.rnautils=t()}(this,function(){return function(r){function t(n){if(e[n])return e[n].exports;var o=e[n]={exports:{},id:n,loaded:!1};return r[n].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var e={};return t.m=r,t.c=e,t.p="",t(0)}([function(r,t,e){r.exports=e(1)},function(r,t){"use strict";function e(r,t){if(r===t)return!0;if(null===r||null===t)return!1;if(r.length!=t.length)return!1;for(var e=0;e<r.length;++e)if(r[e]!==t[e])return!1;return!0}function n(){var r=this;r.bracketLeft="([{<ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),r.bracketRight=")]}>abcdefghijklmnopqrstuvwxyz".split(""),r.inverseBrackets=function(r){for(var t={},e=0;e<r.length;e++)t[r[e]]=e;return t},r.maximumMatching=function(r){for(var t=r[0],e=0,n=new Array(t+1),o=0;t>=o;o++){n[o]=new Array(t+1);for(var a=o;t>=a;a++)n[o][a]=0}for(var s=0,o=t-e-1;o>0;o--)for(var a=o+e+1;t>=a;a++){s=n[o][a-1];for(var i=a-e-1;i>=o;i--)r[i]===a&&(s=Math.max(s,(i>o?n[o][i-1]:0)+1+(a-i-1>0?n[i+1][a-1]:0)));n[o][a]=s}return s=n[1][t],n},r.backtrackMaximumMatching=function(t,e){var n=Array.apply(null,Array(t.length)).map(function(){return 0});return r.mmBt(t,n,e,1,t.length-1),n},r.mmBt=function(t,e,n,o,a){var s=t[o][a],i=0;if(!(i>a-o-1)){if(t[o][a-1]==s)return void r.mmBt(t,e,n,o,a-1);for(var l=a-i-1;l>=o;l--)if(n[a]===l){var u=l>o?t[o][l-1]:0,c=a-l-1>0?t[l+1][a-1]:0;if(u+c+1==s)return e[l]=a,e[a]=l,l>o&&r.mmBt(t,e,n,o,l-1),void r.mmBt(t,e,n,l+1,a-1)}console.log("FAILED!!!"+o+","+a+": backtracking failed!")}},r.dotbracketToPairtable=function(t){var e=Array.apply(null,new Array(t.length+1)).map(Number.prototype.valueOf,0);e[0]=t.length;for(var n={},o=0;o<r.bracketLeft.length;o++)n[o]=[];for(var a=r.inverseBrackets(r.bracketLeft),s=r.inverseBrackets(r.bracketRight),o=0;o<t.length;o++){var i=t[o],l=o+1;if("."==i||"o"==i)e[l]=0;else if(i in a)n[a[i]].push(l);else{if(!(i in s))throw"Unknown symbol in dotbracket string";var u=n[s[i]].pop();e[l]=u,e[u]=l}}for(var c in n)if(n[c].length>0)throw"Unmatched base at position "+n[c][0];return e},r.insertIntoStack=function(r,t,e){for(var n=0;r[n].length>0&&r[n][r[n].length-1]<e;)n+=1;return r[n].push(e),n},r.deleteFromStack=function(r,t){for(var e=0;0===r[e].length||r[e][r[e].length-1]!=t;)e+=1;return r[e].pop(),e},r.pairtableToDotbracket=function(t){for(var e={},n=0;n<t[0];n++)e[n]=[];for(var n,o={},a="",n=1;n<t[0]+1;n++){if(0!==t[n]&&t[n]in o)throw"Invalid pairtable contains duplicate entries";o[t[n]]=!0,a+=0===t[n]?".":t[n]>n?r.bracketLeft[r.insertIntoStack(e,n,t[n])]:r.bracketRight[r.deleteFromStack(e,n)]}return a},r.findUnmatched=function(t,e,n){for(var o,a=[],s=[],i=e,l=n,o=e;n>=o;o++)0!==t[o]&&(t[o]<e||t[o]>n)&&s.push([o,t[o]]);for(var o=i;l>=o;o++){for(;0===t[o]&&l>=o;)o++;for(n=t[o];t[o]===n;)o++,n--;a=a.concat(r.findUnmatched(t,o,n))}return s.length>0&&a.push(s),a},r.removePseudoknotsFromPairtable=function(t){for(var e=r.maximumMatching(t),n=r.backtrackMaximumMatching(e,t),o=[],a=1;a<t.length;a++)t[a]<a||n[a]!=t[a]&&(o.push([a,t[a]]),t[t[a]]=0,t[a]=0);return o},r.ptToElements=function(t,e,n,o,s){var i=[],l=[n-1],u=[o+1];if(arguments.length<5&&(s=[]),n>o)return[];for(;0===t[n];n++)l.push(n);for(;0===t[o];o--)u.push(o);if(n>o){if(l.push(n),0===e)return[["e",e,l.sort(a)]];for(var c=!1,f=[],p=[],h=0;h<l.length;h++)c?p.push(l[h]):f.push(l[h]),s.indexOf(l[h])>=0&&(c=!0);return c?[["h",e,l.sort(a)]]:[["h",e,l.sort(a)]]}if(t[n]!=o){var m=l,h=n;for(m.push(h);o>=h;){for(i=i.concat(r.ptToElements(t,e,h,t[h],s)),m.push(t[h]),h=t[h]+1;0===t[h]&&o>=h;h++)m.push(h);m.push(h)}return m.pop(),m=m.concat(u),m.length>0&&(0===e?i.push(["e",e,m.sort(a)]):i.push(["m",e,m.sort(a)])),i}if(t[n]===o){l.push(n),u.push(o);var v=l.concat(u);v.length>4&&(0===e?i.push(["e",e,l.concat(u).sort(a)]):i.push(["i",e,l.concat(u).sort(a)]))}for(var g=[];t[n]===o&&o>n;)g.push(n),g.push(o),n+=1,o-=1,e+=1;return l=[n-1],u=[o+1],i.push(["s",e,g.sort(a)]),i.concat(r.ptToElements(t,e,n,o,s))}}function o(r){var t=this;return t.colorsText=r,t.parseRange=function(r){for(var t=r.split(","),e=[],n=0;n<t.length;n++){var o=t[n].split("-");if(1==o.length)e.push(parseInt(o[0]));else if(2==o.length)for(var a=parseInt(o[0]),s=parseInt(o[1]),i=a;s>=i;i++)e.push(i);else console.log("Malformed range (too many dashes):",r)}return e},t.parseColorText=function(r){for(var e=r.split("\n"),n="",o=1,a={colorValues:{"":{}},range:["white","steelblue"]},s=[],i=0;i<e.length;i++)if(">"!=e[i][0])for(var l=e[i].trim().split(/[\s]+/),u=0;u<l.length;u++)if(isNaN(l[u])){if(0===l[u].search("range")){var c=l[u].split("="),f=c[1].split(":");a.range=[f[0],f[1]];continue}if(0==l[u].search("domain")){var p=l[u].split("="),f=p[1].split(":");a.domain=[f[0],f[1]];continue}for(var h=l[u].split(":"),m=t.parseRange(h[0]),v=h[1],g=0;g<m.length;g++)isNaN(v)?a.colorValues[n][m[g]]=v:(a.colorValues[n][m[g]]=+v,s.push(Number(v)))}else a.colorValues[n][o]=Number(l[u]),o+=1,s.push(Number(l[u]));else n=e[i].trim().slice(1),o=1,a.colorValues[n]={};return"domain"in a||(a.domain=[Math.min.apply(null,s),Math.max.apply(null,s)]),t.colorsJson=a,t},t.normalizeColors=function(){var r;for(var e in t.colorsJson){var n=Number.MAX_VALUE,o=Number.MIN_VALUE;for(var a in t.colorsJson.colorValues[e])r=t.colorsJson.colorValues[e][a],"number"==typeof r&&(n>r&&(n=r),r>o&&(o=r));for(a in t.colorsJson.colorValues[e])r=t.colorsJson.colorValues[e][a],"number"==typeof r&&(t.colorsJson.colorValues[e][a]=(r-n)/(o-n))}return t},t.parseColorText(t.colorsText),t}Object.defineProperty(t,"__esModule",{value:!0}),t.arraysEqual=e,t.RNAUtilities=n,t.ColorScheme=o;var a=function(r,t){return r-t};t.rnaUtilities=new n}])});

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.rnaPlot = rnaPlot;

	var _simplernaplot = __webpack_require__(4);

	var _rnagraph = __webpack_require__(1);

	var _naview = __webpack_require__(5);

	var _rnautils = __webpack_require__(2);

	__webpack_require__(11);

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
	        var molName = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];

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
	var number_sort = function number_sort(a, b) {
	    return a - b;
	};

	function RNAUtilities() {
	    var self = this;

	    // the brackets to use when constructing dotbracket strings
	    // with pseudoknots
	    self.bracket_left = '([{<ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
	    self.bracket_right = ')]}>abcdefghijklmnopqrstuvwxyz'.split('');

	    self.inverse_brackets = function (bracket) {
	        res = {};
	        for (i = 0; i < bracket.length; i++) {
	            res[bracket[i]] = i;
	        }
	        return res;
	    };

	    self.maximumMatching = function maximumMatching(pt) {
	        // Courtesy of the great Ronny Lorenz

	        var n = pt[0];
	        var TURN = 0; //minimal number of nucleotides in the hairpin

	        /* array init */
	        mm = new Array(n + 1);
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

	    self.backtrackMaximumMatching = function (mm, old_pt) {
	        var pt = Array.apply(null, Array(mm.length)).map(function () {
	            return 0;
	        });
	        //create an array containing zeros

	        self.mm_bt(mm, pt, old_pt, 1, mm.length - 1);
	        return pt;
	    };

	    self.mm_bt = function (mm, pt, old_pt, i, j) {
	        // Create a pairtable from the backtracking
	        var maximum = mm[i][j];
	        var TURN = 0;

	        if (j - i - 1 < TURN) return; /* no more pairs */

	        if (mm[i][j - 1] == maximum) {
	            /* j is unpaired */
	            self.mm_bt(mm, pt, old_pt, i, j - 1);
	            return;
	        }

	        for (var q = j - TURN - 1; q >= i; q--) {
	            /* j is paired with some q */
	            if (old_pt[j] !== q) continue;

	            var left_part = q > i ? mm[i][q - 1] : 0;
	            var enclosed_part = j - q - 1 > 0 ? mm[q + 1][j - 1] : 0;

	            if (left_part + enclosed_part + 1 == maximum) {
	                // there's a base pair between j and q
	                pt[q] = j;
	                pt[j] = q;

	                if (i < q) self.mm_bt(mm, pt, old_pt, i, q - 1);

	                self.mm_bt(mm, pt, old_pt, q + 1, j - 1);
	                return;
	            }
	        }

	        //alert(i + ',' + j + ': backtracking failed!');
	        console.log('FAILED!!!' + i + ',' + j + ': backtracking failed!');
	    };

	    self.dotbracketToPairtable = function (dotbracket) {
	        // create an array and initialize it to 0
	        pt = Array.apply(null, new Array(dotbracket.length + 1)).map(Number.prototype.valueOf, 0);

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
	                } else if (a in inverse_bracket_right) {
	                    // close pair?
	                    j = stack[inverse_bracket_right[a]].pop();

	                    pt[ni] = j;
	                    pt[j] = ni;
	                } else {
	                    throw 'Unknown symbol in dotbracket string';
	                }
	            }
	        }

	        for (key in stack) {
	            if (stack[key].length > 0) {
	                throw 'Unmatched base at position ' + stack[key][0];
	            }
	        }

	        return pt;
	    };

	    self.insert_into_stack = function (stack, i, j) {
	        var k = 0;
	        while (stack[k].length > 0 && stack[k][stack[k].length - 1] < j) {
	            k += 1;
	        }

	        stack[k].push(j);
	        return k;
	    };

	    self.delete_from_stack = function (stack, j) {
	        var k = 0;
	        while (stack[k].length === 0 || stack[k][stack[k].length - 1] != j) {
	            k += 1;
	        }
	        stack[k].pop();
	        return k;
	    };

	    self.pairtableToDotbracket = function (pt) {
	        // store the pairing partners for each symbol
	        stack = {};
	        for (i = 0; i < pt[0]; i++) {
	            stack[i] = [];
	        }

	        seen = {};
	        res = '';
	        for (i = 1; i < pt[0] + 1; i++) {
	            if (pt[i] !== 0 && pt[i] in seen) {
	                throw 'Invalid pairtable contains duplicate entries';
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

	    self.find_unmatched = function (pt, from, to) {
	        /*
	         * Find unmatched nucleotides in this molecule.
	         */
	        var to_remove = [];
	        var unmatched = [];

	        var orig_from = from;
	        var orig_to = to;

	        for (var i = from; i <= to; i++) {
	            if (pt[i] !== 0 && (pt[i] < from || pt[i] > to)) unmatched.push([i, pt[i]]);
	        }for (i = orig_from; i <= orig_to; i++) {
	            while (pt[i] === 0 && i <= orig_to) {
	                i++;
	            }to = pt[i];

	            while (pt[i] === to) {
	                i++;
	                to--;
	            }

	            to_remove = to_remove.concat(self.find_unmatched(pt, i, to));
	        }

	        if (unmatched.length > 0) to_remove.push(unmatched);

	        return to_remove;
	    };

	    self.removePseudoknotsFromPairtable = function (pt) {
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
	            if (pt[i] < i) continue;

	            if (new_pt[i] != pt[i]) {
	                removed.push([i, pt[i]]);
	                pt[pt[i]] = 0;
	                pt[i] = 0;
	            }
	        }

	        return removed;
	    };
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

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

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.NAView = NAView;

	var _radloop = __webpack_require__(6);

	var _connection = __webpack_require__(7);

	var _region = __webpack_require__(9);

	var _base = __webpack_require__(10);

	var _loop = __webpack_require__(8);

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

/***/ },
/* 6 */
/***/ function(module, exports) {

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

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Connection = Connection;

	var _loop = __webpack_require__(8);

	var _region = __webpack_require__(9);

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

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Loop = Loop;

	var _connection = __webpack_require__(7);

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
		var Connection = __webpack_require__(7);
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

/***/ },
/* 9 */
/***/ function(module, exports) {

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

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Base = Base;

	var _region = __webpack_require__(9);

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

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(12);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(14)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./rnaplot.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./rnaplot.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(13)();
	// imports


	// module
	exports.push([module.id, ".structure-background-rect {\n    stroke: black;\n    stroke-width: 5;\n    fill: transparent;\n}\n\ncircle.rna-base {\n  stroke: #ccc;\n  stroke-width: 1px;\n  opacity: 1;\n  fill: white;\n}\n\ncircle.rna-base.label {\n    stroke: transparent;\n    stroke-width: 0;\n    fill: white;\n}\n\nline.link {\n  stroke: #999;\n  stroke-opacity: 0.8;\n  stroke-width: 2;\n}\n\nline.rna-link {\n  stroke: #999;\n  stroke-opacity: 0.8;\n  stroke-width: 2;\n}\n\n.overlay {\n    fill: transparent;\n}\n\n.rna-name {\n    text-anchor: middle;\n    dy: -10;\n    font-family: Tahoma, Geneva, sans-serif;\n    font-size: 8pt;\n}\n\nline.rna-link[link-type=\"backbone\"] {\n    stroke: transparent;\n}\n\nline.rna-link[link-type=\"basepair\"] {\n    stroke: transparent;\n}\n\nline.rna-link[link-type=\"fake\"] {\n    stroke: transparent;\n}\n\nline.rna-link[link-type=\"extra\"] {\n    stroke: grey;\n}\n\nline.rna-link[extra-link-type=\"correct\"] {\n    stroke: green;\n}\n\nline.rna-link[extra-link-type=\"incorrect\"] {\n    stroke: green;\n}\n\n\npath {\n    stroke: grey;\n  stroke-width: 2;\n}\n\npath[extra-link-type=\"correct\"] {\n    stroke: green;\n}\n\npath[extra-link-type=\"incorrect\"] {\n    stroke: red;\n}\n\n\nline.basepair {\n  stroke: red;\n}\n\nline.intermolecule {\n  stroke: blue;\n}\n\nline.chain_chain {\n  stroke-dasharray: 3,3;\n}\n\nline.fake {\n  stroke: green;\n}\n\n.transparent {\n    fill: transparent;\n    stroke-width: 0;\n    stroke-opacity: 0;\n    opacity: 0;\n}\n\n.d3-tip {\n    line-height: 1;\n    font-weight: bold;\n    padding: 6px;\n    background: rgba(0, 0, 0, 0.6);\n    color: #fff;\n    border-radius: 4px;\n    pointer-events: none;\n          }\n\ntext.nucleotide-label {\n    font-size: 5.5pt;\n    font-weight: bold;\n    font-family: Tahoma, Geneva, sans-serif;\n    color: rgb(100,100,100);\n    pointer-events: none;\n}\n\ntext.number-label {\n    font-size: 5.5pt;\n    font-weight: bold;\n    font-family: Tahoma, Geneva, sans-serif;\n    color: rgb(100,100,100);\n    pointer-events: none;\n}\n\ntext {\n    pointer-events: none;\n}\n\ng.gnode {\n\n}\n\n.brush .extent {\n  fill-opacity: .1;\n  stroke: #fff;\n  shape-rendering: crispEdges;\n}\n\n.noselect {\n    -webkit-touch-callout: none;\n    -webkit-user-select: none;\n    -khtml-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n}\n", ""]);

	// exports


/***/ },
/* 13 */
/***/ function(module, exports) {

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


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

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
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
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


/***/ }
/******/ ])
});
;