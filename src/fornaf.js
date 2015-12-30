/* fornai.js
* A container for display RNA secondary structure.
*
* Author: Peter Kerpedjiev <pkerp@tbi.univie.ac.at>
* Version: 0.2
* Date: 2015-03-15
*/

function FornaContainer(element, passedOptions) {
    var self = this;

    self.options = {
        "displayAllLinks": false,
        "labelInterval": 10,
        "applyForce": true,
        "initialSize": [200,200],
        "allowPanningAndZooming": true,
        "cssFileLocation": "css/fornac.css"
    };

    if (arguments.length > 1) {
        for (var option in passedOptions) {
            if (self.options.hasOwnProperty(option))
                self.options[option] = passedOptions[option];
        }
    }

    self.options.svgW = self.options.initialSize[0];
    self.options.svgH = self.options.initialSize[1];

    var fill = d3.scale.category20();

    // mouse event vars
    var mousedownLink = null,
        mousedownNode = null,
        mouseupNode = null;

    var xScale = d3.scale.linear()
    .domain([0,self.options.svgW]).range([0,self.options.svgW]);
    var yScale = d3.scale.linear()
    .domain([0,self.options.svgH]).range([0, self.options.svgH]);

    var graph = self.graph = {
        "nodes":[],
        "links":[]
    };
    
    self.linkStrengths = {
        "pseudoknot": 0.00,
        "proteinChain": 0.00,
        "chainChain": 0.00,
        "intermolecule": 10.00,
        "other": 10.00
    };
    
    self.displayParameters = {
        "displayBackground": "true",
        "displayNumbering": "true",
        "displayNodeOutline": "true",
        "displayNodeLabel": "true",
        "displayLinks": "true",
        "displayPseudoknotLinks": "true",
        "displayProteinLinks": "true"
    };

    self.colorScheme = 'structure';
    self.customColors = {};
    self.animation = self.options.applyForce;
    // don't listen to events because a model window is open somewhere
    self.deaf = false;
    self.rnas = {};
    self.extraLinks = []; //store links between different RNAs


    self.createInitialLayout = function(structure, passedOptions) {
        // the default options
        var options = { 
                        'sequence': '',
                        'name': 'empty',
                        'positions': [],
                        'labelInterval': self.options.labelInterval,
                        'avoidOthers': true,
                        'circularizeExternal': true
                      };

        if (arguments.length == 2) {
            for (var option in passedOptions) {
                if (options.hasOwnProperty(option))
                    options[option] = passedOptions[option];
            }
        }

        rg = new RNAGraph(options.sequence, structure, options.name);
        rg.circularizeExternal = options.circularizeExternal;

        rnaJson = rg.recalculateElements()

        if (options.positions.length === 0) {
            // no provided positions means we need to calculate an initial layout
            options.positions = simpleXyCoordinates(rnaJson.pairtable);
        }

        rnaJson = rnaJson.elementsToJson()
        .addPositions("nucleotide", options.positions)
        .addLabels(1, options.labelInterval)
        .reinforceStems()
        .reinforceLoops()
        .connectFakeNodes()

        return rnaJson;
    }

    self.addRNA = function(structure, passedOptions) {
        var rnaJson = self.createInitialLayout(structure, passedOptions);

        if (arguments.length === 1)
            passedOptions = {}

        if ('avoidOthers' in passedOptions)
            self.addRNAJSON(rnaJson, passedOptions.avoidOthers);
        else
            self.addRNAJSON(rnaJson, true);

        return rnaJson;
    }

    self.addRNAJSON = function(rnaGraph, avoidOthers) {
        // Add an RNAGraph, which contains nodes and links as part of the
        // structure
        // Each RNA will have uid to identify it
        // when it is modified, it is replaced in the global list of RNAs
        //
        var maxX, minX;

        if (avoidOthers) {
            if (self.graph.nodes.length > 0)
                maxX = d3.max(self.graph.nodes.map(function(d) { return d.x; }));
            else
                maxX = 0;

            minX = d3.min(rnaGraph.nodes.map(function(d) { return d.x; })); 

            rnaGraph.nodes.forEach(function(node) {
                node.x += (maxX - minX);
                node.px += (maxX - minX);
            });
        }

        rnaGraph.nodes.forEach(function(node) {
            node.rna = rnaGraph;
        });

        self.rnas[rnaGraph.uid] = rnaGraph;
        self.recalculateGraph();

        self.update();
        self.centerView();
    };

    self.transitionRNA = function(previousRNAJson, newStructure, options) {
        //transition from an RNA which is already displayed to a new structure
        var newRNAJson = self.createInitialLayout(newStructure, options);

        //visNodes.selectAll('g.gnode').each(function(d) { console.log('d before', d); });
        var gnodes = visNodes.selectAll('g.gnode').data(newRNAJson);

        //gnodes.each(function(d) { console.log('d after', d); });

        gnodes.transition().attr('transform', function(d) { 
            return 'translate(' + [d.x, d.y] + ')'}).duration(1000);

    };

    self.recalculateGraph = function(rnaGraph) {
        // Condense all of the individual RNAs into one
        // collection of nodes and links
        self.graph.nodes = [];
        self.graph.links = [];
        for (var uid in self.rnas) {
            self.graph.nodes = self.graph.nodes.concat(self.rnas[uid].nodes);
            self.graph.links = self.graph.links.concat(self.rnas[uid].links);
        }

        // Create a lookup table so that we can access each node
        // based on its uid. This will be used to create the links
        // between different RNAs
        var uidsToNodes = {};

        for (var i = 0; i < self.graph.nodes.length; i++)
            uidsToNodes[self.graph.nodes[i].uid] = self.graph.nodes[i];

        self.graph.links.forEach(function(link) {
            link.source = uidsToNodes[link.source.uid];
            link.target = uidsToNodes[link.target.uid];
        });

        for (i = 0; i < self.extraLinks.length; i++) {
            // the actual node objects may have changed, so we hae to recreate
            // the extra links based on the uids

            if (!(self.extraLinks[i].target.uid in uidsToNodes)) {
                console.log("not there:", self.extraLinks[i]);
            }

            self.extraLinks[i].source = uidsToNodes[self.extraLinks[i].source.uid];
            self.extraLinks[i].target = uidsToNodes[self.extraLinks[i].target.uid];
            
            if (self.extraLinks[i].linkType == 'intermolecule') {
                //remove links to middle nodes
                fakeLinks = self.graph.links.filter(function(d) { 
                    return ((d.source == self.extraLinks[i].source || d.source == self.extraLinks[i].target ||
                            d.target == self.extraLinks[i].source || d.target == self.extraLinks[i].source) &&
                            d.linkType == 'fake');
                });

                for (var j = 0; j < fakeLinks.length; j++) {
                    var linkIndex = self.graph.links.indexOf(fakeLinks[j]); 
                    self.graph.links.splice(linkIndex, 1);
                }
            }

            graph.links.push(self.extraLinks[i]);
        }
    };

    self.addNodes = function addNodes(json) {
        // add a new set of nodes from a json file

        // Resolve the sources and targets of the links so that they
        // are not just indeces into an array
        json.links.forEach(function(entry) {
            if (typeof entry.source == "number") entry.source = json.nodes[entry.source];
            if (typeof entry.target == "number") entry.target = json.nodes[entry.target];
        });

        // Get the maximum x and y values of the current graph
        // so that we don't place a new structure on top of the
        // old one
        if (self.graph.nodes.length > 0) {
            maxX = d3.max(self.graph.nodes.map(function(d) {return d.x;}));
            maxY = d3.max(self.graph.nodes.map(function(d) {return d.y;}));
        } else {
            maxX = 0;
            maxY = 0;
        }

        json.nodes.forEach(function(entry) {
            if (!(entry.rna.uid in self.rnas)) {
                self.rnas[entry.rna.uid] = entry.rna;
            }

            entry.x += maxX;
            //entry.y += maxY;

            entry.px += maxX;
            //entry.py += maxY;
        });

        r = new RNAGraph('','');
        r.nodes = json.nodes;
        r.links = json.links;

        //self.addRNA(r);
        self.recalculateGraph();

        self.update();
        self.centerView();
    };

    self.addCustomColors = function addCustomColors(json) {
        // Add a json file containing the custom colors
        self.customColors = json;
    };

    self.clearNodes = function clearNodes() {
        self.graph.nodes = [];
        self.graph.links = [];

        self.rnas = {};
        self.extraLinks = [];

        self.update();
    };
    
    self.toJSON = function toJSON() {
       var data = {"rnas": self.rnas, "extraLinks": self.extraLinks};
            var dataString = JSON.stringify(data, function(key, value) {
            //remove circular references
            if (key == 'rna') {
                return;
            } else {
                return value;
            }
       }, "\t");
       return dataString;
    };

    self.fromJSON = function(jsonString) {
        var rnas, extraLinks;
        try{
            var data = JSON.parse(jsonString);
            rnas = data.rnas;
            extraLinks = data.extraLinks;
        } catch(err) {
            throw err;
        }

        for (var uid in rnas) {
            if (rnas[uid].type == 'rna') {
                r = new RNAGraph();

                r.seq = rnas[uid].seq;
                r.dotbracket = rnas[uid].dotbracket;
                r.circular = rnas[uid].circular;
                r.pairtable = rnas[uid].pairtable;
                r.uid = rnas[uid].uid;
                r.structName = rnas[uid].structName;
                r.nodes = rnas[uid].nodes;
                r.links = rnas[uid].links;
                r.rnaLength = rnas[uid].rnaLength;
                r.elements = rnas[uid].elements;
                r.nucsToNodes = rnas[uid].nucsToNodes;
                r.pseudoknotPairs = rnas[uid].pseudoknotPairs;
            } else {
                r = new ProteinGraph();
                r.size = rnas[uid].size;
                r.nodes = rnas[uid].nodes;
                r.uid = rnas[uid].uid;
            }

            self.addRNAJSON(r, false);
        }

        extraLinks.forEach(function(link) {
            self.extraLinks.push(link);
        });

        self.recalculateGraph();
        self.update();
    };

    function setSize() {
        var svgW = $(element).width();
        var svgH = $(element).height();

        self.options.svgW = svgW;
        self.options.svgH = svgH;

        //Set the output range of the scales
        xScale.range([0, svgW]).domain([0, svgW]);
        yScale.range([0, svgH]).domain([0, svgH]);

        //re-attach the scales to the zoom behaviour
        zoomer.x(xScale)
        .y(yScale);

        self.brusher.x(xScale)
        .y(yScale);

        //resize the background
        rect.attr("width", svgW)
        .attr("height", svgH);

        svg.attr("width", svgW)
        .attr("height", svgH);

        self.centerView();
    }

    function changeColors(moleculeColors, d, scale) {
        if (moleculeColors.hasOwnProperty(d.num)) {
            val = parseFloat(moleculeColors[d.num]);

            if (isNaN(val)) {
                // passed in color is not a scalar, so 
                // treat it as a color
                return moleculeColors[d.num];
            } else {
                // the user passed in a float, let's use a colormap
                // to convert it to a color
                return scale(val);
            }
        } else {
            return 'white';
        }
    }

    self.changeColorScheme = function(newColorScheme) {
        var proteinNodes = visNodes.selectAll('[node_type=protein]');

        proteinNodes.classed("protein", true)
                    .attr('r', function(d) { return d.radius; });

        var gnodes = visNodes.selectAll('g.gnode');
        var circles = visNodes.selectAll('g.gnode').selectAll('circle');
        var nodes = visNodes.selectAll('g.gnode').select('[node_type=nucleotide]');
        self.colorScheme = newColorScheme;


        if (newColorScheme == 'sequence') {
            scale = d3.scale.ordinal()
            .range(['#dbdb8d', '#98df8a', '#ff9896', '#aec7e8', '#aec7e8'])
            .domain(['A','C','G','U','T']);
            nodes.style('fill', function(d) { 
                return scale(d.name);
            });

        } else if (newColorScheme == "structure") {
            scale = d3.scale.category10()
            .domain(['s','m','i','e','t','h','x'])
            .range(['lightgreen', '#ff9896', '#dbdb8d', 'lightsalmon',
                   'lightcyan', 'lightblue', 'transparent']);

                   nodes.style('fill', function(d) { 
                       return scale(d.elemType);
                   });

        } else if (newColorScheme == 'positions') {
            nodes.style('fill', function(d) { 
                scale = d3.scale.linear()
                .range(["#98df8a", "#dbdb8d", "#ff9896"])
                .interpolate(d3.interpolateLab)
                .domain([1, 1 + (d.rna.rnaLength - 1) / 2, d.rna.rnaLength]);

                return scale(d.num);
            });
        } else if (newColorScheme == 'custom') {
            // scale to be used in case the user passes scalar
            // values rather than color names
            scale = d3.scale.linear()
            .interpolate(d3.interpolateLab)
            .domain(self.customColors.domain)
            .range(self.customColors.range);

            nodes.style('fill', function(d) {
                if (typeof self.customColors == 'undefined') {
                    return 'white';
                }
                
                if (self.customColors.colorValues.hasOwnProperty(d.structName) &&
                    self.customColors.colorValues[d.structName].hasOwnProperty(d.num)) {
                    // if a molecule name is specified, it supercedes the default colors
                    // (for which no molecule name has been specified)
                    moleculeColors = self.customColors.colorValues[d.structName];
                    return changeColors(moleculeColors, d, scale);
                } else if (self.customColors.colorValues.hasOwnProperty('')) {
                    moleculeColors = self.customColors.colorValues[''];
                    to_change =  changeColors(moleculeColors, d, scale);
                    return to_change;

                }

                return 'white';
            });
        }
    };

    function mousedown() {

    }

    function mousemove() {
        if (!mousedownNode) return;

        mpos = d3.mouse(vis.node());
        // update drag line
        dragLine
        .attr("x1", mousedownNode.x)
        .attr("y1", mousedownNode.y)
        .attr("x2", mpos[0])
        .attr("y2", mpos[1]);

    }

    function mouseup() {
        if (mousedownNode) {
            dragLine
            .attr("class", "dragLineHidden");
        }

        // clear mouse event vars
        resetMouseVars();
        //update()
    }
    //adapt size to window changes:
    window.addEventListener("resize", setSize, false);

    zoomer = d3.behavior.zoom()
        .scaleExtent([0.1,10])
        .x(xScale)
        .y(yScale)
        .on("zoomstart", zoomstart)
        .on("zoom", redraw);

    d3.select(element).select("svg").remove();

    var svg = d3.select(element)
    .attr("tabindex", 1)
    .on("keydown.brush", keydown)
    .on("keyup.brush", keyup)
    .each(function() { this.focus(); })
    .append("svg:svg")
    .attr("width", self.options.svgW)
    .attr("height", self.options.svgH)
    .attr("id", 'plotting-area');

    // set css for svg
    var style = svg.append('svg:style');
    $.get(self.options.cssFileLocation, function(content){
        style.text(content.replace(/[\s\n]/g, ""));
    });
    
    self.options.svg = svg;

    var svgGraph = svg.append('svg:g')
    .on('mousemove', mousemove)
    .on('mousedown', mousedown)
    .on('mouseup', mouseup);

    if (self.options.allowPanningAndZooming)
        svgGraph.call(zoomer);

    var rect = svgGraph.append('svg:rect')
    .attr('width', self.options.svgW)
    .attr('height', self.options.svgH)
    .attr('fill', 'white')
    .attr('stroke', 'transparent')
    .attr('stroke-width', 1)
    //.attr("pointer-events", "all")
    .attr("id", "zrect");

    var brush = svgGraph.append('g')
    .datum(function() { return {selected: false, previouslySelected: false}; })
    .attr("class", "brush");
    var vis = svgGraph.append("svg:g");
    var visLinks = vis.append("svg:g");
    var visNodes = vis.append("svg:g");


    self.brusher = d3.svg.brush()
                .x(xScale)
                .y(yScale)
               .on("brushstart", function(d) {
                   var gnodes = visNodes.selectAll('g.gnode').selectAll('.outlineNode');
                   gnodes.each(function(d) { d.previouslySelected = ctrlKeydown && d.selected; });
               })
               .on("brush", function() {
                   var gnodes = visNodes.selectAll('g.gnode').selectAll('.outlineNode');
                   var extent = d3.event.target.extent();

                   gnodes.classed("selected", function(d) {
                       return d.selected = self.options.applyForce && d.previouslySelected ^
                       (extent[0][0] <= d.x && d.x < extent[1][0]
                        && extent[0][1] <= d.y && d.y < extent[1][1]);
                   });
               })
               .on("brushend", function() {
                   d3.event.target.clear();
                   d3.select(this).call(d3.event.target);
               });

      brush.call(self.brusher)
          .on("mousedown.brush", null)
          .on("touchstart.brush", null)                                                                      
          .on("touchmove.brush", null)                                                                       
          .on("touchend.brush", null);                                                                       
      brush.select('.background').style('cursor', 'auto');

    function zoomstart() {
        var node = visNodes.selectAll('g.gnode').selectAll('.outlineNode');
        node.each(function(d) {
                d.selected = false;
                d.previouslySelected = false;
                });
        node.classed("selected", false);
    }

    function redraw() {
        vis.attr("transform",
                 "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")");
    }

    self.centerView = function() {
        // Center the view on the molecule(s) and scale it so that everything
        // fits in the window

        //no molecules, nothing to do
        if (self.graph.nodes.length === 0)
            return;

        // Get the bounding box
        minX = d3.min(self.graph.nodes.map(function(d) {return d.x;}));
        minY = d3.min(self.graph.nodes.map(function(d) {return d.y;}));

        maxX = d3.max(self.graph.nodes.map(function(d) {return d.x;}));
        maxY = d3.max(self.graph.nodes.map(function(d) {return d.y;}));


        // The width and the height of the molecule
        molWidth = maxX - minX;
        molHeight = maxY - minY;

        // how much larger the drawing area is than the width and the height
        widthRatio = self.options.svgW / (molWidth + 1);
        heightRatio = self.options.svgH / (molHeight + 1);

        // we need to fit it in both directions, so we scale according to
        // the direction in which we need to shrink the most
        minRatio = Math.min(widthRatio, heightRatio) * 0.8;

        // the new dimensions of the molecule
        newMolWidth = molWidth * minRatio;
        newMolHeight = molHeight * minRatio;

        // translate so that it's in the center of the window
        xTrans = -(minX) * minRatio + (self.options.svgW - newMolWidth) / 2;
        yTrans = -(minY) * minRatio + (self.options.svgH - newMolHeight) / 2;


        // do the actual moving
        vis.attr("transform",
                 "translate(" + [xTrans, yTrans] + ")" + " scale(" + minRatio + ")");

        // tell the zoomer what we did so that next we zoom, it uses the
        // transformation we entered here
        zoomer.translate([xTrans, yTrans ]);
        zoomer.scale(minRatio);

    };

    self.force = d3.layout.force()
    .charge(function(d) { if (d.nodeType == 'middle')  {
            return -30; 
    }
        else 
            return -30;})
    .chargeDistance(300)
    .friction(0.35)
    .linkDistance(function(d) { return 15 * d.value; })
    .linkStrength(function(d) { if (d.linkType in self.linkStrengths) {
                                  return self.linkStrengths[d.linkType];
                                } else {
                                  return self.linkStrengths.other; }
    })
    .gravity(0.000)
    .nodes(self.graph.nodes)
    .links(self.graph.links)
    .chargeDistance(110)
    .size([self.options.svgW, self.options.svgH]);

    // line displayed when dragging new nodes
    var dragLine = vis.append("line")
    .attr("class", "dragLine")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", 0)
    .attr("y2", 0);

    function resetMouseVars() {
        mousedownNode = null;
        mouseupNode = null;
        mousedownLink = null;
    }

    var shiftKeydown = false;
    var ctrlKeydown = false;

    function selectedNodes(mouseDownNode) {
        var gnodes = visNodes.selectAll('g.gnode');

        if (ctrlKeydown) {
            return gnodes.filter(function(d) { return d.selected; });

            //return d3.selectAll('[structName=' + mouseDownNode.structName + ']');
        } else {
            return gnodes.filter(function(d) { return d.selected ; });
            //return d3.select(this);
        }
    }

    function dragstarted(d) {
        d3.event.sourceEvent.stopPropagation();

      if (!d.selected && !ctrlKeydown) {
          // if this node isn't selected, then we have to unselect every other node
            var node = visNodes.selectAll('g.gnode').selectAll('.outline_node');
            node.classed("selected", function(p) { return p.selected =  self.options.applyForce && (p.previouslySelected = false); });
          }

        d3.select(this).select('.outline_node').classed("selected", function(p) { d.previouslySelected = d.selected; return d.selected = self.options.applyForce && true; });

        var toDrag = selectedNodes(d);
        toDrag.each(function(d1) {
            d1.fixed |= 2;
        });

        //d3.event.sourceEvent.stopPropagation();
        //d3.select(self).classed("dragging", true);
        //
    }

    function dragged(d) {

        var toDrag = selectedNodes(d);

        toDrag.each(function(d1) {
            d1.x += d3.event.dx;
            d1.y += d3.event.dy;

            d1.px += d3.event.dx;
            d1.py += d3.event.dy;
        });

        self.resumeForce();
        d3.event.sourceEvent.preventDefault();
    }

    self.resumeForce = function() {
        if (self.animation)
            self.force.resume();
    };

    function dragended(d) {
        var toDrag = selectedNodes(d);

        toDrag.each(function(d1) {
            d1.fixed &= ~6;
        });
    }

    function collide(node) {
        var r = node.radius + 16,
        nx1 = node.x - r,
        nx2 = node.x + r,
        ny1 = node.y - r,
        ny2 = node.y + r;
        return function(quad, x1, y1, x2, y2) {
            if (quad.point && (quad.point !== node)) {
                var x = node.x - quad.point.x,
                y = node.y - quad.point.y,
                l = Math.sqrt(x * x + y * y),
                r = node.radius + quad.point.radius;
                if (l < r) {
                    l = (l - r) / l * 0.1;
                    node.x -= x *= l;
                    node.y -= y *= l;
                    quad.point.x += x;
                    quad.point.y += y;
                }
            }
            return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
        };
    }


    var drag = d3.behavior.drag()
    //.origin(function(d) { return d; })
    .on("dragstart", dragstarted)
    .on("drag", dragged)
    .on("dragend", dragended);

    function keydown() {
        if (self.deaf)
            // lalalalal, not listening
            return;

        if (shiftKeydown) return;

        keyIsDown = true;
        switch (d3.event.keyCode) {
            case 16:
                shiftKeydown = true;
                break;
            case 17:
                ctrlKeydown = true;
                break;
            case 67: //c
                self.centerView();
                break;
        }

        if (shiftKeydown || ctrlKeydown) {
            svgGraph.call(zoomer)
            .on("mousedown.zoom", null)
            .on("touchstart.zoom", null)
            .on("touchmove.zoom", null)
            .on("touchend.zoom", null);

            //svgGraph.on('zoom', null);
            vis.selectAll('g.gnode')
            .on('mousedown.drag', null);
        }

        if (ctrlKeydown) {
          brush.select('.background').style('cursor', 'crosshair');
          brush.call(self.brusher);
        }
    }

    function keyup() {
        shiftKeydown = false;
        ctrlKeydown = false;

        brush.call(self.brusher)
        .on("mousedown.brush", null)
        .on("touchstart.brush", null)                                                                      
        .on("touchmove.brush", null)                                                                       
        .on("touchend.brush", null);                                                                       

        brush.select('.background').style('cursor', 'auto')
        svgGraph.call(zoomer);

        vis.selectAll('g.gnode')
        .call(drag);
    }

    d3.select(element)
    .on('keydown', keydown)
    .on('keyup', keyup)
    .on('contextmenu', function() {
            d3.event.preventDefault(); 
    });

    linkKey = function(d) {
        return d.uid;
    };

    nodeKey = function(d) {
        key = d.uid;
        return key;
    };

    updateRnaGraph = function(r) {
        var nucleotidePositions = r.getPositions('nucleotide');
        var labelPositions = r.getPositions('label');

        var uids = r.getUids();

        r.recalculateElements()
        .elementsToJson()
        .addPseudoknots()
        .addPositions('nucleotide', nucleotidePositions)
        .addUids(uids)
        .addLabels(1, self.options.labelInterval)
        .addPositions('label', labelPositions)
        .reinforceStems()
        .reinforceLoops()
        .updateLinkUids();
    };

    removeLink = function(d) {
        // remove a link between two nodes
        index = self.graph.links.indexOf(d);

        if (index > -1) {
            //remove a link
            //graph.links.splice(index, 1);

            // there should be two cases
            // 1. The link is within a single molecule

            if (d.source.rna == d.target.rna) {
                var r = d.source.rna;

                r.addPseudoknots();
                r.pairtable[d.source.num] = 0;
                r.pairtable[d.target.num] = 0;

                updateRnaGraph(r);

            } else {
                // 2. The link is between two different molecules
                extraLinkIndex = self.extraLinks.indexOf(d);

                self.extraLinks.splice(extraLinkIndex, 1);
            }

            self.recalculateGraph();
        }

        self.update();
    };

    linkClick = function(d) {
        if (!shiftKeydown) {
            return;
        }

        var invalidLinks = {'backbone': true,
                             'fake': true,
                             'fakeFake': true,
                             'labelLink': true};

        if (d.linkType in invalidLinks ) 
            return;

        removeLink(d);
    };


    self.addLink =  function(newLink) {
        // this means we have a new json, which means we have
        // to recalculate the structure and change the colors
        // appropriately
        //
        if (newLink.source.rna == newLink.target.rna) {
            r = newLink.source.rna;

            r.pairtable[newLink.source.num] = newLink.target.num;
            r.pairtable[newLink.target.num] = newLink.source.num;

            updateRnaGraph(r);

        } else {
            //Add an extra link
            newLink.linkType = 'intermolecule';
            self.extraLinks.push(newLink);
        }
        self.recalculateGraph();
        self.update();
    };

    nodeMouseclick = function(d) {
        if (d3.event.defaultPrevented) return;

        if (!ctrlKeydown) {
            //if the shift key isn't down, unselect everything
            var node = visNodes.selectAll('g.gnode').selectAll('.outline_node');
            node.classed("selected", function(p) { return p.selected =  self.options.applyForce && (p.previouslySelected = false); });
        }

        // always select this node
        d3.select(this).select('circle').classed("selected", d.selected = self.options.applyForce && !d.previouslySelected);
    };

    nodeMouseup = function(d) {
        if (mousedownNode) {
            mouseupNode = d;

            if (mouseupNode == mousedownNode) { resetMouseVars(); return; }
            var newLink = {source: mousedownNode, target: mouseupNode, linkType: 'basepair', value: 1, uid:generateUUID()};

            for (i = 0; i < self.graph.links.length; i++) {
                if ((self.graph.links[i].source == mousedownNode)  || 
                    (self.graph.links[i].target == mousedownNode) ||
                        (self.graph.links[i].source == mouseupNode) ||
                            (self.graph.links[i].target == mouseupNode)) {

                    if (self.graph.links[i].linkType == 'basepair' || self.graph.links[i].linkType == 'pseudoknot') {
                        return;
                    }
                }

                if (((self.graph.links[i].source == mouseupNode)  && 
                     (self.graph.links[i].target == mousedownNode)) ||
                         ((self.graph.links[i].source == mousedownNode)  && 
                          (self.graph.links[i].target == mouseupNode))) {
                    if (self.graph.links[i].linkType == 'backbone') {
                        return;
                    }
                }
            }

            if (mouseupNode.nodeType == 'middle' || mousedownNode.nodeType == 'middle' || mouseupNode.nodeType == 'label' || mousedownNode.nodeType == 'label')
                return;

            self.addLink(newLink);

        }
    };

    nodeMousedown = function(d) {
      if (!d.selected && !ctrlKeydown) {
          // if this node isn't selected, then we have to unselect every other node
            var node = visNodes.selectAll('g.gnode').selectAll('.outlineNode');
            node.classed("selected", function(p) { return p.selected =  p.previouslySelected = false; })
          }


          d3.select(this).classed("selected", function(p) { d.previouslySelected = d.selected; return d.selected = self.options.applyForce && true; });

        if (!shiftKeydown) {
            return;
        }

        mousedownNode = d;

        dragLine
        .attr("class", "drag_line")
        .attr("x1", mousedownNode.x)
        .attr("y1", mousedownNode.y)
        .attr("x2", mousedownNode.x)
        .attr("y2", mousedownNode.y);

        //gnodes.attr('pointer-events',  'none');

    };

    self.startAnimation = function() {
      self.animation = true;
      vis.selectAll('g.gnode')
        .call(drag);
      self.force.start();
    };
    
    self.stopAnimation = function() {
      self.animation = false;
      vis.selectAll('g.gnode')
           .on('mousedown.drag', null);
      self.force.stop();
    };
    
    self.setFriction = function(value) {
      self.force.friction(value);
      self.resumeForce();
    };

    self.setCharge = function(value) {
      self.force.charge(value);
      self.resumeForce();
    };
    
    self.setGravity = function(value) {
      self.force.gravity(value);
      self.resumeForce();
    };
    
    self.setPseudoknotStrength = function(value) {
      self.linkStrengths.pseudoknot = value;
      self.update();
    };
    
    self.displayBackground = function(value) {
      self.displayParameters.displayBackground = value;
      self.updateStyle();
    };
    
    self.displayNumbering = function(value) {
      self.displayParameters.displayNumbering = value;
      self.updateStyle();
    };

    self.displayNodeOutline = function(value) {
      self.displayParameters.displayNodeOutline = value;
      self.updateStyle();
    };
    
    self.displayNodeLabel = function(value) {
      self.displayParameters.displayNodeLabel = value;
      self.updateStyle();
    };
    
    self.displayLinks = function(value) {
      self.displayParameters.displayLinks = value;
      self.updateStyle();
    };

    self.displayPseudoknotLinks = function(value) {
      self.displayParameters.displayPseudoknotLinks = value;
      self.updateStyle();
    };

    self.displayProteinLinks = function(value) {
      self.displayParameters.displayProteinLinks = value;
      self.updateStyle();
    };
    
    self.updateStyle = function() {
        // Background
        rect.classed("transparent", !self.displayParameters.displayBackground);
        // Numbering
        visNodes.selectAll('[node_type=label]').classed("transparent", !self.displayParameters.displayNumbering);
        visNodes.selectAll('[label_type=label]').classed("transparent", !self.displayParameters.displayNumbering);
        visLinks.selectAll('[link_type=label_link]').classed("transparent", !self.displayParameters.displayNumbering);
        // Node Outline
        svg.selectAll('circle').classed("hidden_outline", !self.displayParameters.displayNodeOutline);
        // Node Labels
        visNodes.selectAll('[label_type=nucleotide]').classed("transparent", !self.displayParameters.displayNodeLabel);
        // Links
        svg.selectAll("[link_type=real],[link_type=basepair],[link_type=backbone],[link_type=pseudoknot],[link_type=protein_chain],[link_type=chain_chain]").classed("transparent", !self.displayParameters.displayLinks);
        // Pseudoknot Links
        svg.selectAll("[link_type=pseudoknot]").classed("transparent", !self.displayParameters.displayPseudoknotLinks);
        // Protein Links
        svg.selectAll("[link_type=protein_chain]").classed("transparent", !self.displayParameters.displayProteinLinks);
        // Fake Links
        visLinks.selectAll("[link_type=fake]").classed("transparent", !self.options.displayAllLinks);
    };

    function nudge(dx, dy) {
        node.filter(function(d) { return d.selected; })
        .attr("cx", function(d) { return d.x += dx; })
        .attr("cy", function(d) { return d.y += dy; });

        link.filter(function(d) { return d.source.selected; })
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; });

        link.filter(function(d) { return d.target.selected; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

        d3.event.preventDefault();
    }

    self.update = function () {
        self.force.nodes(self.graph.nodes)
        .links(self.graph.links);
        
        if (self.animation) {
          self.force.start();
        }

        var visibleLinks = self.graph.links.filter(function(d) {
            return d.linkType == 'backbone' ||
                   d.linkType == 'basepair' ||
                   d.linkType == 'pseudoknot';
            
        });
        var allLinks = visLinks.selectAll("line.link")
        .data(visibleLinks, linkKey);

        var linksEnter = allLinks.enter();

        linkLines = linksEnter.append("svg:line");

        linkLines.append("svg:title")
        .text(linkKey);

        linkLines
        .classed("link", true)
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; })
        .attr("link_type", function(d) { return d.linkType; } )
        .attr("class", function(d) { return d3.select(this).attr('class') + " " + d.linkType; })
        .attr('pointer-events', function(d) { if (d.linkType == 'fake') return 'none'; else return 'all';});

        allLinks.attr('class', '')
        .classed('link', true)
        .attr("link_type", function(d) { return d.linkType; } )
        .attr("class", function(d) { return d3.select(this).attr('class') + " " + d.linkType; });

            allLinks.exit().remove();
            var xlink;

            if (self.displayFakeLinks)
                xlink = allLinks;
            else
                xlink = visLinks.selectAll("[link_type=real],[link_type=pseudoknot],[link_type=protein_chain],[link_type=chain_chain],[link_type=label_link],[link_type=backbone],[link_type=basepair],[link_type=fake],[link_type=intermolecule]");

            console.log('xlink:', xlink);

            domain = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            var colors = d3.scale.category10().domain(domain);

            var gnodes = visNodes.selectAll('g.gnode')
            .data(self.graph.nodes, nodeKey);
            //.attr('pointer-events', 'all');

            gnodesEnter = gnodes.enter()
            .append('g')
            .classed('noselect', true)
            .classed('gnode', true)
             .attr('struct_name', function(d) { return d.structName; })
              .attr("transform", function(d) { 
                  if (typeof d.x != 'undefined' && typeof d.y != 'undefined')
                    return 'translate(' + [d.x, d.y] + ')'; 
                else
                    return '';
                })
             .each( function(d) { d.selected = d.previouslySelected = false; });

            gnodesEnter
            .call(drag)
            .on('mousedown', nodeMousedown)
            .on('mousedrag', function(d) {})
            .on('mouseup', nodeMouseup)
            .on('click', nodeMouseclick)
            .transition()
            .duration(750)
            .ease("elastic")
            .attr("r", 6.5);

            nodeTooltip = function(d) {
                nodeTooltips = {};

                nodeTooltips.nucleotide = d.num;
                nodeTooltips.label = '';
                nodeTooltips.pseudo = '';
                nodeTooltips.middle = '';
                nodeTooltips.protein = d.structName;

                return nodeTooltips[d.nodeType];
            };

            xlink.on('click', linkClick);

            var circleUpdate = gnodes.select('circle');

            // create nodes behind the circles which will serve to highlight them
            var nucleotideNodes = gnodesEnter.filter(function(d) { 
                return d.nodeType == 'nucleotide' || d.nodeType == 'label' || d.nodeType == 'protein';
            });
            nucleotideNodes.append("svg:circle")
            .attr('class', "outline_node")
            .attr("r", function(d) { return d.radius+1; });

            var node = gnodesEnter.append("svg:circle")
            .attr("class", "node")
            .classed("label", function(d) { return d.nodeType == 'label'; })
            .attr("r", function(d) { 
                if (d.nodeType == 'middle') return 0; 
                else {
                    return d.radius; 
                }
                })
            .attr("node_type", function(d) { return d.nodeType; });
            
            var labels = gnodesEnter.append("text")
            .text(function(d) { return d.name; })
            .attr('text-anchor', 'middle')
            .attr('font-size', 8.0)
            .attr('font-weight', 'bold')
            .attr('y', 2.5)
            .attr('class', 'node-label')
            .attr("label_type", function(d) { return d.nodeType; })
            .append("svg:title")
            .text(function(d) { 
                if (d.nodeType == 'nucleotide') {
                    return d.structName + ":" + d.num;
                } else {
                    return '';
                }
            });

            node.append("svg:title")
            .text(function(d) { 
                if (d.nodeType == 'nucleotide') {
                    return d.structName + ":" + d.num;
                } else {
                    return '';
                }
            });

            gnodes.exit().remove();

            //fake_nodes = self.graph.nodes.filter(function(d) { return d.nodeType == 'middle'; });
            //fake_nodes = self.graph.nodes.filter(function(d) { return true; });
            realNodes = self.graph.nodes.filter(function(d) { return d.nodeType == 'nucleotide' || d.nodeType == 'label';});

            self.force.on("tick", function() {

                var q = d3.geom.quadtree(realNodes),
                i = 0,
                n = realNodes.length;

                while (++i < n) q.visit(collide(realNodes[i]));

                xlink.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) {  return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

                // Translate the groups
                gnodes.attr("transform", function(d) { 
                    return 'translate(' + [d.x, d.y] + ')'; 
                });
            });
            
        self.changeColorScheme(self.colorScheme);

        if (self.animation) {
          self.force.start();
        }
        
        self.updateStyle();
    };
    
    setSize();
}
