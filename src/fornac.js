/* Version: 0.2
* Date: 2015-03-15
*/

import fstyle from './fornac.css';

import d3 from 'd3';
import slugid from 'slugid';
import {contextMenu} from './d3-context-menu.js';

import {RNAGraph} from './rnagraph.js';
import {ColorScheme, rnaUtilities} from './rnautils.js';

import {simpleXyCoordinates} from './simplernaplot.js';
import {NAView} from './naview/naview.js';

export function FornaContainer(element, passedOptions = {}) {
    var self = this;

    let options = {
        'editable': false,
        'zoomable': true,
        'animation': true,
        'displayAllLinks': false,
        'labelInterval': 10,
        'chargeDistance': 110,
        'friction': 0.35,
        'middleCharge': -30,
        'otherCharge': -30,
        'linkDistanceMultiplier': 15,
        'initialSize': null,
        'layout': 'standard-polygonal',
        'transitionDuration': 500,
        'maxNodeRadius': 80    // the maximum radius of a node when the view is centered
    };

    self.options = Object.assign(options, passedOptions);

    if (self.options.initialSize !== null) {
        self.options.svgW = self.options.initialSize[0];
        self.options.svgH = self.options.initialSize[1];
    } else {
        self.options.svgW = 300;
        self.options.svgH = 300;
    }

    self.linkStrengths = {
        'pseudoknot': 0.00,
        'proteinChain': 0.00,
        'chainChain': 0.00,
        'intermolecule': 10.00,
        'external': 0.00,
        'other': 10.00
    };

    self.displayParameters = {
        'displayNumbering': true,
        'displayNodeOutline': true,
        'displayNodeLabel': true,
        'displayLinks': true,
        'displayPseudoknotLinks': true,
        'displayProteinLinks': true,
        'displayDirectionArrows': true
    };

    self.colorScheme = 'structure';
    self.customColors = {};
    self.rnas = {};
    self.extraLinks = []; //store links between different RNAs

    // global mouse event vars
    var mousedownLink = null,
        mousedownNode = null,
        mouseupNode = null;
    let linkContextMenuShown = false;

    let resetMouseVars = () => {
        mousedownNode = null;
        mouseupNode = null;
        mousedownLink = null;
    }

    var graph = self.graph = {
        'nodes':[],
        'links':[]
    };

    Array.prototype.equals = function (array) {
        // if the other array is a falsy value, return
        if (!array)
            return false;

        // compare lengths - can save a lot of time
        if (this.length != array.length)
            return false;

        for (var i = 0, l=this.length; i < l; i++) {
            // Check if we have nested arrays
            if (this[i] instanceof Array && array[i] instanceof Array) {
                // recurse into the nested arrays
                if (!this[i].equals(array[i]))
                    return false;
            }
            else if (this[i] != array[i]) {
                // Warning - two different object instances will never be equal: {x:20} != {x:20}
                return false;
            }
        }
        return true;
    };

    /* Register global mouse and key events */
    if (self.options.editable || self.options.animation) {
      var shiftKeydown = false;
      var ctrlKeydown = false;

      let keydown = () => {
          switch (d3.event.keyCode) {
              case 68:    //'d' key
                  console.log('dotbracket:', self.getStructuresDotBracket());
                  break;
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

          if (ctrlKeydown) {
            // Ctrl key must disable panning and zooming
            if (self.options.zoomable)
              disableZooming()
            // Ctrl Button must enable crosshair and start brusher
            if (self.options.editable || self.options.animation) {
              enableBrushing()
            }
          }
      }

      let keyup = () => {
          shiftKeydown = false;
          ctrlKeydown = false;

          // enable zoomer
          if (self.options.zoomable)
            enableZooming()
          // disable brushing events
          disableBrushing()
      }

      d3.select('body')
      .on('keydown', keydown)
      .on('keyup', keyup)
      .on('contextmenu', function() {
          d3.event.preventDefault();
      });
    }

    /* Register global context menu */
    if (self.options.editable) {
        let backgroundMenu = [
            {
                title: 'Add Node',
                action: function(elm, d, i, mousePos) {

                },
                children: [{
                    'title': 'A',
                    action: function(elm, d, i, mousePos) {
                        console.log('mousePos:', mousePos, self.options.svgW, self.options.svgH);
                        let canvasMousePos = [xScale.invert(mousePos[0]),
                                              yScale.invert(mousePos[1])];
                        console.log('canvasMousePos', canvasMousePos);

                        self.addRNA('.', {'sequence': 'A', 'centerPos': canvasMousePos});
                    }
                },
                {
                    'title': 'C',
                    action: function(elm, d, i, mousePos) {
                        console.log('mousePos:', mousePos, self.options.svgW, self.options.svgH);
                        let canvasMousePos = [xScale.invert(mousePos[0]),
                                              yScale.invert(mousePos[1])];
                        console.log('canvasMousePos', canvasMousePos);

                        self.addRNA('.', {'sequence': 'C', 'centerPos': canvasMousePos});
                    }

                    },
                {
                    'title': 'G',
                    action: function(elm, d, i, mousePos) {
                        console.log('mousePos:', mousePos, self.options.svgW, self.options.svgH);
                        let canvasMousePos = [xScale.invert(mousePos[0]),
                                              yScale.invert(mousePos[1])];
                        console.log('canvasMousePos', canvasMousePos);

                        self.addRNA('.', {'sequence': 'G', 'centerPos': canvasMousePos});
                    }

                    },
                {
                    'title': 'U',
                    action: function(elm, d, i, mousePos) {
                        console.log('mousePos:', mousePos, self.options.svgW, self.options.svgH);
                        let canvasMousePos = [xScale.invert(mousePos[0]),
                                              yScale.invert(mousePos[1])];
                        console.log('canvasMousePos', canvasMousePos);

                        self.addRNA('.', {'sequence': 'U', 'centerPos': canvasMousePos});

                    }
                }
                ],
                disabled: false // optional, defaults to false
            }
        ]

        let nodeMenu = [
            {
                title: 'Delete Node',
                action: function(elm, d, i) {
                    deleteNode(d);
                },
                disabled: false // optional, defaults to false
            },
            {
                title: 'Change Node',
                action: function(elm, d, i) {
                    console.log('You have clicked the second item!');
                    console.log('The data for this circle is: ' + d);
                },
                children: [
                    {
                        title: 'A',
                        action: function(elm, d, i) {
                            changeNode('A', d);
                        }
                    },
                    {
                        title: 'C',
                        action: function(elm, d, i) {
                            changeNode('C', d);

                        }
                    },
                    {
                        title: 'G',
                        action: function(elm, d, i) {
                            changeNode('G', d);

                        }
                    },
                    {
                        title: 'U',
                        action: function(elm, d, i) {
                            changeNode('U', d);
                        }
                    },
                ]
            },
            {
                title: 'Insert Before',
                action: function(elm, d, i) {

                },
                children: [
                    {
                        title: 'A',
                        action: function(elm, d, i) {
                            insertNodeBeforeOrAfter('A', d, -1);
                        }
                    },
                    {
                        title: 'C',
                        action: function(elm, d, i) {
                            insertNodeBeforeOrAfter('C', d, -1);

                        }
                    },
                    {
                        title: 'G',
                        action: function(elm, d, i) {
                            insertNodeBeforeOrAfter('G', d, -1);

                        }
                    },
                    {
                        title: 'U',
                        action: function(elm, d, i) {
                            insertNodeBeforeOrAfter('U', d, -1);
                        }
                    },
                ]
            },
            {
                title: 'Insert After',
                action: function(elm, d, i) {
                    console.log('d:', d);

                },
                children: [
                    {
                        title: 'A',
                        action: function(elm, d, i) {
                            insertNodeBeforeOrAfter('A', d, 0);

                        }
                    },
                    {
                        title: 'C',
                        action: function(elm, d, i) {
                            insertNodeBeforeOrAfter('C', d, 0);
                        }
                    },
                    {
                        title: 'G',
                        action: function(elm, d, i) {
                            insertNodeBeforeOrAfter('G', d, 0);
                        }
                    },
                    {
                        title: 'U',
                        action: function(elm, d, i) {
                            insertNodeBeforeOrAfter('U', d, 0);
                        }
                    },
                ]
            }
        ]

        self.nodeContextMenu = contextMenu(nodeMenu);
        self.backgroundContextMenu = contextMenu(backgroundMenu);

    }  else {
        //console.log('empty context menu');
        self.nodeContextMenu = function() {};
    }

    /* Draw the plot here */
    d3.select(element).select('svg').remove();

    var svg = d3.select(element)
    .attr('tabindex', 1)
    .each(function() { this.focus(); })
    .append('svg:svg')
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .attr('viewBox', '0 0 ' + self.options.svgW + ' ' + self.options.svgH)

    self.options.svg = svg;

    if (self.options.editable || self.options.animation) {
      var mouseEventHelper = svg.append('svg:g')
      .on('mousemove', () => {
            // only if we are dragging
            if (!mousedownNode) return;

            // update drag line
            let mpos = d3.mouse(vis.node());
            dragLine
            .attr('x1', mousedownNode.x)
            .attr('y1', mousedownNode.y)
            .attr('x2', mpos[0])
            .attr('y2', mpos[1]);
          })
      .on('mousedown', () => {
      })
      .on('mouseup', () => {
            if (mousedownNode && !linkContextMenuShown) {
                dragLine.classed(fstyle.transparent, true);
            }
            // clear mouse event vars
            resetMouseVars();
            //update()
          })
      .classed(fstyle.mouseEventHelper, true)
      .style('pointer-events', 'all')

      // draw a background layer for mouse events
      mouseEventHelper.append('svg:rect')
      .classed('background', true)
      .style('visibility', 'hidden')
      .attr('width', self.options.svgW)
      .attr('height', self.options.svgH)
      .on('mousedown', function() {
        //console.log('background click');
        deselectAllNodes()
      })
    } else {
      var mouseEventHelper = svg;
    }

    var vis = mouseEventHelper.append('svg:g')
    .classed(fstyle.plot, true)
    var visLinks = vis.append('svg:g')
    .classed('fornac-links', true);
    var visNodes = vis.append('svg:g')
    .classed('fornac-nodes', true);

    // line displayed when dragging new nodes
    if (self.options.editable) {
      var dragLine = vis.append('line')
      .attr('class', fstyle.dragLine)
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', 0)
      .attr('y2', 0);

      svg.on('contextmenu', self.backgroundContextMenu);
    }

    /* Zooming related objects and functions */
    var xScale = d3.scale.linear()
    .domain([0,self.options.svgW]).range([0,self.options.svgW]);
    var yScale = d3.scale.linear()
    .domain([0,self.options.svgH]).range([0, self.options.svgH]);

    self.zoomer = d3.behavior.zoom()
      .scaleExtent([0.1,10])
      .x(xScale)
      .y(yScale)
      .on('zoom', () => {
          vis.attr('transform',
                   'translate(' + d3.event.translate + ')' + ' scale(' + d3.event.scale + ')');
      });

    let enableZooming = () => {
      svg.call(self.zoomer)
      .on("dblclick.zoom", null);
    }

    let disableZooming = () => {
      svg.call(self.zoomer)
      .on("dblclick.zoom", null)
      .on('mousedown.zoom', null)
      .on('touchstart.zoom', null)
      .on('touchmove.zoom', null)
      .on('touchend.zoom', null);
    }

    if (self.options.zoomable)
      enableZooming()

    /* Node selection related objects and functions */
    let toggleSelectNode = (node) => {
      node.selected = !node.selected;
      visNodes.selectAll('g.gnode').filter((d) => { return node.uid == d.uid; })
      .classed(fstyle.selectedNode, function(p) { return p.selected; });
    }

    let selectNode = (node) => {
      node.selected = true;
      visNodes.selectAll('g.gnode').filter((d) => { return node.uid == d.uid; })
      .classed(fstyle.selectedNode, function(p) { return p.selected; });
    }

    let deselectAllNodes = () => {
      visNodes.selectAll('g.gnode')
      .classed(fstyle.selectedNode, function(p) { return p.selected = false; });
    }

    let selectedNodes = () => {
      // return all selected nodes
      return visNodes.selectAll('g.gnode').filter(function(d) { return d.selected; });
    }

    self.brusher = d3.svg.brush()
      .x(xScale)
      .y(yScale)
      .on('brushstart', function(d) {})
      .on('brush', function() {
        // during brushing invert styling of selection as preview
        let extent = d3.event.target.extent();

        visNodes.selectAll('g.gnode')
        .classed(fstyle.selectedNode, function (d) {
         return d.selected ^ (extent[0][0] <= d.x && d.x < extent[1][0]
                && extent[0][1] <= d.y && d.y < extent[1][1])
        })
      })
      .on('brushend', function() {
        // after brushing finally toggle the selection
        let extent = d3.event.target.extent();

        visNodes.selectAll('g.gnode')
        .filter(function (d) {
         return extent[0][0] <= d.x && d.x < extent[1][0]
                && extent[0][1] <= d.y && d.y < extent[1][1]
      })
      .each(toggleSelectNode)

      d3.event.target.clear();
      d3.select(this).call(d3.event.target);
    });

    let enableBrushing = () => {
     // crosshair curson
     mouseEventHelper.select('.background').style('cursor', 'crosshair');
     // bind brusher
     mouseEventHelper.call(self.brusher);
    }

    let disableBrushing = () => {
     // normal cursor
     mouseEventHelper.select('.background').style('cursor', 'auto');
     // disable brushing events
     mouseEventHelper.call(self.brusher)
     .on('mousedown.brush', null)
     .on('touchstart.brush', null)
     .on('touchmove.brush', null)
     .on('touchend.brush', null);
    }

     /* Force related objects and functions */
    self.force = d3.layout.force()
    .charge(function(d) {
      if (d.nodeType == 'middle')
        return self.options.middleCharge;
      else
        return self.options.otherCharge;
      })
    .friction(self.options.friction)
    .linkDistance(function(d) { return self.options.linkDistanceMultiplier * d.value; })
    .linkStrength(function(d) { if (d.linkType in self.linkStrengths) {
                                  return self.linkStrengths[d.linkType];
                                } else {
                                  return self.linkStrengths.other; }
    })
    .gravity(0.000)
    .nodes(self.graph.nodes)
    .links(self.graph.links)
    .chargeDistance(self.options.chargeDistance)
    .size([self.options.svgW, self.options.svgH]);

    var drag = d3.behavior.drag()
    .on('dragstart', function(d) {
      console.log('dragstart')
      d3.event.sourceEvent.stopPropagation();

      selectedNodes().each(function(d1) {
        d1.fixed |= 2;
      });
    })
    .on('drag', (d) => {
      if (shiftKeydown) return
      selectedNodes().each(function(d1) {
        d1.x += d3.event.dx;
        d1.y += d3.event.dy;

        d1.px += d3.event.dx;
        d1.py += d3.event.dy;
      });

      self.resumeForce();
      d3.event.sourceEvent.preventDefault();
    })
    .on('dragend', (d) => {
      console.log('dragend')
      selectedNodes().each(function(d1) {
        d1.fixed &= ~6;
      });
    });

    /* Main plot drawing functions */
    let createInitialLayout = function(structure, passedOptions = {}) {
        // the default options
        let options = {
                        'sequence': '',
                        'name': 'empty',
                        'positions': [],
                        'labelInterval': self.options.labelInterval,
                        'avoidOthers': true,
                        'uids': [],
                        'circularizeExternal': true
                      };

        options = Object.assign(options, passedOptions);

        //console.log('options.uids:', options.uids);
        let rg = new RNAGraph(options.sequence, structure, options.name);
        rg.circularizeExternal = options.circularizeExternal;

        let rnaJson = rg.recalculateElements();

        if (options.positions.length === 0) {
            // no provided positions means we need to calculate an initial layout

            if (self.options.layout == 'naview') {
                let naview = new NAView();

                let naViewPositions = naview.naview_xy_coordinates(rg.pairtable);
                options.positions = []
                for (let i = 0; i < naViewPositions.nbase; i++)
                    options.positions.push([naViewPositions.x[i], naViewPositions.y[i]]);
            } else {
                options.positions = simpleXyCoordinates(rnaJson.pairtable);
            }
        }

        rnaJson = rnaJson.elementsToJson()
        .addUids(options.uids)
        .addPositions('nucleotide', options.positions)
        .addLabels(1, options.labelInterval)
        .reinforceStems()
        .reinforceLoops()
        .connectFakeNodes()
        .reassignLinkUids()
        .breakNodesToFakeNodes();

        return rnaJson;
    };

    let createNewNodes = function(gnodesEnter) {
        gnodesEnter = gnodesEnter.append('g')
        .classed('gnode', true)
        .attr('struct_name', function(d) { return d.structName; })
        .attr('transform', function(d) {
            if (typeof d.x != 'undefined' && typeof d.y != 'undefined')
                return 'translate(' + [d.x, d.y] + ')';
            else
                return '';
        })
        .each( function(d) { d.selected = d.previouslySelected = false; });

        gnodesEnter
        .attr('num', function(d) { return 'n' + d.num; })
        .attr('rnum', function(d) {
            return 'n' + (d.rna.rnaLength - d.num + 1); })
        .transition()
        .duration(750)
        .ease('elastic');

        if (self.options.editable || self.options.animation) {
          gnodesEnter.on('mousedown', nodeMousedown)
          //.on('mousedrag', function(d) {})
          .on('mouseup', nodeMouseup)
          .on('contextmenu', self.nodeContextMenu)
          .call(drag)
        }

        let labelAndProteinNodes = gnodesEnter.filter(function(d) {
            return d.nodeType == 'label' || d.nodeType == 'protein';
        });

        let nucleotideNodes = gnodesEnter.filter(function(d) {
            return d.nodeType == 'nucleotide';
        });

        labelAndProteinNodes.append('svg:circle')
        .classed(fstyle.node, true)
        .attr('r', function(d) {
            if (d.nodeType == 'middle') return 0;
            else {
                return d.radius;
            }
        })
        .attr('node_type', function(d) { return d.nodeType; })
        .attr('node_num', function(d) { return d.num; });

        // direction arrows
        nucleotideNodes.append('svg:path')
        .attr('class', fstyle.directionArrow)
        .attr('node_num', function(d) { return d.num; })

        // nucleotide outlines
        nucleotideNodes.append('svg:circle')
        .attr('class', fstyle.node)
        .attr('node_type', function(d) { return d.nodeType; })
        .attr('node_num', function(d) { return d.num; })
        .attr('r', function(d) { return d.radius; })
        .append('svg:title')
        .text(function(d) {
            if (d.nodeType == 'nucleotide') {
                return d.structName + ':' + d.num;
            } else {
                return '';
            }
        });

        // nucleotide labels
        var labelsEnter = gnodesEnter.append('text')
        .text(function(d) { return d.name; })
        .attr('class', fstyle.nodeLabel)
        .attr('label_type', function(d) { return d.nodeType; })

        // nucleotide label title
        labelsEnter.append('svg:title')
        .text(function(d) {
            if (d.nodeType == 'nucleotide') {
                return d.structName + ':' + d.num;
            } else {
                return '';
            }
        });

        return gnodesEnter;
    };

    let createNewLinks = function(linksEnter) {
        var linkLines = linksEnter.append('svg:line');

        linkLines.append('svg:title')
        .text((d) => { return d.linkType + ':' + d.source.num + '-' + d.target.num });

        linkLines
        .classed('link', true)
        .classed(fstyle.link, true)
        .attr('x1', function(d) { return d.source.x; })
        .attr('y1', function(d) { return d.source.y; })
        .attr('x2', function(d) { return d.target.x; })
        .attr('y2', function(d) { return d.target.y; })
        .attr('link_type', function(d) { return d.linkType; } )
        .attr('pointer-events', function(d) { if (d.linkType == 'fake') return 'none'; else return 'all';});

        if (self.options.editable)
          linkLines.on('click', linkClick);

        /* We don't need to update the positions of the stabilizing links */
        /*
        basepairLinks = visLinks.selectAll('[link_type=basepair]');
        basepairLinks.classed('basepair', true);

        fakeLinks = visLinks.selectAll('[link_type=fake]')
        fakeLinks.classed('fake', true);

        intermolecule_links = vis_links.selectAll('[link_type=intermolecule]');
        intermolecule_links.classed('intermolecule', true);

        plink = vis_links.selectAll('[link_type=protein_chain],[link_type=chain_chain]');
        plink.classed('chain_chain', true);
        */

       return linkLines;
    };

    function drawDirectionArrow(d) {
        let magnitude = (x) => {
            return Math.sqrt(x[0] * x[0] + x[1] * x[1]);
        }

        let endPoint = d;
        let startPoint = d.prevNode;
        // get stroke width and arrow size values from css
        let nodeStroke = parseFloat(fstyle.nodeStrokeWidth) / 2;
        let lengthMult = parseFloat(fstyle.directionArrowSize);
        let arrowWidth = parseFloat(fstyle.directionArrowWidth);

        if (startPoint === null)
            return;

        // does this node have a link pointing to it?
        if (!d.linked)
            return;

        // point back toward the previous node
        let u = [-(endPoint.x - startPoint.x), -(endPoint.y - startPoint.y)];

        if (u[0] == 0 && u[1] == 0)
            return;     // will lead to a NaN error

        // scale u to unit length
        u = [u[0] / magnitude(u), u[1] / magnitude(u)];
        // normal vector of u
        let v = [-u[1], u[0]];

        // calculate the tip position
        let arrowTip = [(d.radius + nodeStroke) * u[0], (d.radius + nodeStroke) * u[1]];

        let path = 'M' + (arrowTip[0] + lengthMult * (u[0]/2 + v[0]*arrowWidth/2)) + ',' + (arrowTip[1] + lengthMult * (u[1]/2 + v[1]*arrowWidth/2)) +
                   'L' + (arrowTip[0]) + ',' + (arrowTip[1]) +
                   'L' + (arrowTip[0] + lengthMult * (u[0]/2 - v[0]*arrowWidth/2)) + ',' + (arrowTip[1] + lengthMult * (u[1]/2 - v[1]*arrowWidth/2));

        d3.select(this).attr('d', path);
    }

    let realLinkFilter = (d) => {
        return d.linkType == 'basepair' ||
               d.linkType == 'backbone' ||
               d.linkType == 'intermolecule' ||
               d.linkType == 'pseudoknot' ||
               d.linkType == 'label_link' ||
               d.linkType == 'external' ||
               d.linkType == 'chain_chain';
    }

    let recalculateGraph = () => {
        // Condense all of the individual RNAs into one
        // collection of nodes and links
        self.graph.nodes = [];
        self.graph.links = [];
        for (let uid in self.rnas) {
            self.graph.nodes = self.graph.nodes.concat(self.rnas[uid].nodes);
            self.graph.links = self.graph.links.concat(self.rnas[uid].links);
        }

        // Create a lookup table so that we can access each node
        // based on its uid. This will be used to create the links
        // between different RNAs
        var uidsToNodes = {};

        for (let i = 0; i < self.graph.nodes.length; i++)
            uidsToNodes[self.graph.nodes[i].uid] = self.graph.nodes[i];

        self.graph.links.forEach(function(link) {
            link.source = uidsToNodes[link.source.uid];
            link.target = uidsToNodes[link.target.uid];
        });

        for (let i = 0; i < self.extraLinks.length; i++) {
            // the actual node objects may have changed, so we hae to recreate
            // the extra links based on the uids
            if (!(self.extraLinks[i].target.uid in uidsToNodes)) {
                console.log('not there:', self.extraLinks[i]);
                continue;
            }

            self.extraLinks[i].source = uidsToNodes[self.extraLinks[i].source.uid];
            self.extraLinks[i].target = uidsToNodes[self.extraLinks[i].target.uid];

            if (self.extraLinks[i].linkType == 'intermolecule') {
                //remove links to middle nodes
                let fakeLinks = self.graph.links.filter(function(d) {
                    return ((d.source == self.extraLinks[i].source || d.source == self.extraLinks[i].target ||
                            d.target == self.extraLinks[i].source || d.target == self.extraLinks[i].source) &&
                            d.linkType == 'fake');
                });

                for (let j = 0; j < fakeLinks.length; j++) {
                    let linkIndex = self.graph.links.indexOf(fakeLinks[j]);
                    self.graph.links.splice(linkIndex, 1);
                }
            }

            graph.links.push(self.extraLinks[i]);
        }
    };

    self.update = function () {
        self.force.nodes(self.graph.nodes)
        .links(self.graph.links);

        if (self.options.animation) {
          self.force.start();
        }

        let allLinks = visLinks.selectAll('line.link')
        .data(self.graph.links.filter(realLinkFilter), elementKey);

        allLinks.attr('class', '')
        .classed('link', true)
        .classed(fstyle.link, true)
        .attr('link_type', function(d) { return d.linkType; } )

        let linksEnter = allLinks.enter();
        createNewLinks(linksEnter);

        allLinks.exit().remove();

        let gnodes = visNodes.selectAll('g.gnode')
        .data(self.graph.nodes, elementKey);
        //.attr('pointer-events', 'all');

        let gnodesEnter = gnodes.enter();
        createNewNodes(gnodesEnter);
        gnodes.exit().remove();


        //fake_nodes = self.graph.nodes.filter(function(d) { return d.nodeType == 'middle'; });
        //fakeNodes = self.graph.nodes.filter(function(d) { return true; });
        let realNodes = self.graph.nodes.filter(function(d) { return d.nodeType == 'nucleotide' || d.nodeType == 'label';});

        gnodes.select('.' + fstyle.directionArrow).each(drawDirectionArrow);

        self.force.on('tick', function() {
            let q = d3.geom.quadtree(realNodes);
            let i = 0;
            let n = realNodes.length;

            let collide = (node) => {
                let r = node.radius + 16,
                nx1 = node.x - r,
                nx2 = node.x + r,
                ny1 = node.y - r,
                ny2 = node.y + r;
                return function(quad, x1, y1, x2, y2) {
                    if (quad.point && (quad.point !== node)) {
                        let x = node.x - quad.point.x,
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

            while (++i < n) q.visit(collide(realNodes[i]));

            allLinks.attr('x1', function(d) { return d.source.x; })
            .attr('y1', function(d) {  return d.source.y; })
            .attr('x2', function(d) { return d.target.x; })
            .attr('y2', function(d) { return d.target.y; });

            // Translate the groups
            gnodes.attr('transform', function(d) {
                return 'translate(' + [d.x, d.y] + ')';
            });

            gnodes.select('.' + fstyle.directionArrow).each(drawDirectionArrow);

        });

        self.force.on('end', () => {
            gnodes.selectAll('[node_type=nucleotide]')
            .filter((d,i) => { if (i == 0) return true; else return false; })
            .each((d,i) => {
                //console.log("pos", d.num, d.x, d.y);
            });

            //for (let uid in self.rnas) {
            //    for (let i = 1; i < self.rnas[uid].pairtable[0]; i++) {
            //        console.log('pt', i, self.rnas[uid].pairtable[i]);
            //    }
            //}

        });

        self.changeColorScheme(self.colorScheme);

        if (self.options.animation) {
          self.force.start();
        }

        updateStyle();
    };

    self.transitionRNA = function(newStructure, nextFunction) {
        if (self.dotbracket == newStructure) {
            return;
        } else {
            self.dotbracket = newStructure;
        }
        //transition from an RNA which is already displayed to a new structure
        var duration = self.options.transitionDuration;

        var uids = self.graph.nodes
        .filter(function(d) { return d.nodeType == 'nucleotide'; })
        .map(function(d) { return d.uid; });

        let options = {'uids': uids};
        var newRNAJson = createInitialLayout(newStructure, options);

        let gnodes = visNodes.selectAll('g.gnode').data(newRNAJson.nodes, elementKey);
        var links = visLinks.selectAll('line.link').data(newRNAJson.links.filter(realLinkFilter), elementKey);

        if (duration === 0)
            gnodes.attr('transform', function(d) {
                return 'translate(' + [d.x, d.y] + ')';
            });
        else {
            gnodes.transition()
            .attr('transform', function(d) {
                return 'translate(' + [d.x, d.y] + ')'; }).duration(duration);
        }


        var newNodes = createNewNodes(gnodes.enter())
        .attr('transform', function(d) {
            if (typeof d.x != 'undefined' && typeof d.y != 'undefined')
                return 'translate(' + [0, 0] + ')';
            else
                return '';
        });

        if (duration === 0)
            gnodes.exit().remove();
        else
            gnodes.exit().transition()
            .attr('transform', function(d) {
                if (typeof d.x != 'undefined' && typeof d.y != 'undefined')
                    return 'translate(' + [0, 0] + ')';
                else
                    return '';
            });

        self.graph.nodes = gnodes.data();
        gnodes.select('.' + fstyle.directionArrow).each(drawDirectionArrow);
        self.changeColorScheme(self.colorScheme);
        updateStyle();
        self.centerView(duration);

        function endall(transition, callback) {
            if (transition.size() === 0) { setTimeout(callback, duration); }
            var n = 0;
            transition
            .each(function() { ++n; })
            .each('end', function() { if (!--n) callback.apply(this, arguments); });
        }

        function afterAnimation() {
            var newLinks = createNewLinks(links.enter());
            self.graph.links = links.data();
            self.changeColorScheme(self.colorScheme);
            updateStyle();

            if (typeof nextFunction != 'undefined')
                nextFunction();

        }

        links.exit().remove();

        if (duration === 0) {
            links
            .attr('x1', function(d) { return d.source.x; })
            .attr('y1', function(d) { return d.source.y; })
            .attr('x2', function(d) { return d.target.x; })
            .attr('y2', function(d) { return d.target.y; });

            var newLinks = createNewLinks(links.enter());
            self.graph.links = links.data();

            updateStyle();
        } else {
            links.transition()
            .attr('x1', function(d) { return d.source.x; })
            .attr('y1', function(d) { return d.source.y; })
            .attr('x2', function(d) { return d.target.x; })
            .attr('y2', function(d) { return d.target.y; })
            .duration(duration)
            .call(endall, afterAnimation);
        }

        if (duration === 0) {
            newNodes
            .attr('transform', function(d) {
                if (typeof d.x != 'undefined' && typeof d.y != 'undefined')
                    return 'translate(' + [d.x, d.y] + ')';
                else
                    return '';
            });
        } else {
            newNodes.transition()
            .attr('transform', function(d) {
                if (typeof d.x != 'undefined' && typeof d.y != 'undefined')
                    return 'translate(' + [d.x, d.y] + ')';
                else
                    return '';
            });
        }

    };

    /* Plot presentation related functions */
    let getBoundingBoxTransform = () => {
        // Center the view on the molecule(s) and scale it so that everything
        // fits in the window

        //no molecules, nothing to do
        if (self.graph.nodes.length === 0)
            return {'translate': [0,0], 'scale': 1};

        // Get the bounding box
        var minX = d3.min(self.graph.nodes.map(function(d) {return d.x;}));
        var minY = d3.min(self.graph.nodes.map(function(d) {return d.y;}));

        var maxX = d3.max(self.graph.nodes.map(function(d) {return d.x;}));
        var maxY = d3.max(self.graph.nodes.map(function(d) {return d.y;}));

        var maxRadius = d3.max(self.graph.nodes.map(function(d) { return d.radius; }));

        // The width and the height of the molecule
        var molWidth = maxX - minX;
        var molHeight = maxY - minY;

        // how much larger the drawing area is than the width and the height
        var widthRatio = self.options.svgW / (molWidth + 1);
        var heightRatio = self.options.svgH / (molHeight + 1);

        // we need to fit it in both directions, so we scale according to
        // the direction in which we need to shrink the most
        var minRatio = Math.min(widthRatio, heightRatio,
                                self.options.maxNodeRadius / maxRadius) * 0.8;

        // the new dimensions of the molecule
        var newMolWidth = molWidth * minRatio;
        var newMolHeight = molHeight * minRatio;

        // translate so that it's in the center of the window
        var xTrans = -(minX) * minRatio + (self.options.svgW - newMolWidth) / 2;
        var yTrans = -(minY) * minRatio + (self.options.svgH - newMolHeight) / 2;

        return {'translate': [xTrans, yTrans], 'scale': minRatio};
    };

    self.centerView = function(duration = 0) {
        var bbTransform = getBoundingBoxTransform();

        if (bbTransform === null)
            return;

        // do the actual moving
        vis.transition().attr('transform',
                 'translate(' + bbTransform.translate + ')' + ' scale(' + bbTransform.scale + ')').duration(duration);

        // tell the zoomer what we did so that next we zoom, it uses the
        // transformation we entered here
        self.zoomer.translate(bbTransform.translate);
        self.zoomer.scale(bbTransform.scale);
    };

    self.setSize = (
      svgW = d3.select(element).node().offsetWidth,
      svgH = d3.select(element).node().offsetHeight
    ) => {
      // save width and height
      self.options.svgW = svgW;
      self.options.svgH = svgH;

      // set the viewBox
      svg.attr('viewBox', "0 0 " + svgW + " " + svgH)

      //Set the output range of the scales
      xScale.range([0, svgW]).domain([0, svgW]);
      yScale.range([0, svgH]).domain([0, svgH]);

      //re-attach the scales to the zoom behaviour
      self.zoomer.x(xScale)
      .y(yScale);
      self.brusher.x(xScale)
      .y(yScale);

      //resize the background
      svg.select('.background')
      .attr('width', svgW)
      .attr('height', svgH);

      // center the view
      self.centerView();
    }

    /* Style and color related functions */
    self.setOutlineColor = function(color) {
        var nodes = visNodes.selectAll('g.gnode').select('[node_type=nucleotide]');
        nodes.style('fill', color);
    }

    self.addCustomColors = function addCustomColors(json) {
        // Add a json file containing the custom colors
        self.customColors = json;
        self.changeColorScheme('custom');
    };

    self.addCustomColorsText = function(customColorsText) {
        let cs = new ColorScheme(customColorsText);
        self.customColors = cs.colorsJson;
        self.changeColorScheme('custom');
    };

    self.changeColorScheme = function(newColorScheme) {
        var proteinNodes = visNodes.selectAll('[node_type=protein]');

        proteinNodes.classed(fstyle.node, true)
                    .attr('r', function(d) { return d.radius; });

        var gnodes = visNodes.selectAll('g.gnode');
        var circles = visNodes.selectAll('g.gnode').selectAll('circle');
        var nodes = visNodes.selectAll('g.gnode').select('[node_type=nucleotide]');
        self.colorScheme = newColorScheme;


        if (newColorScheme == 'sequence') {
            var scale = d3.scale.ordinal()
            .range(['#dbdb8d', '#98df8a', '#ff9896', '#aec7e8', '#aec7e8'])
            .domain(['A','C','G','U','T']);
            nodes.style('fill', function(d) {
                return scale(d.name);
            });

        } else if (newColorScheme == 'structure') {
            var scale = d3.scale.category10()
            .domain(['s','m','i','e','t','h','x'])
            .range(['lightgreen', '#ff9896', '#dbdb8d', 'lightsalmon',
                   'lightcyan', 'lightblue', 'transparent']);

                   nodes.style('fill', function(d) {
                       return scale(d.elemType);
                   });

        } else if (newColorScheme == 'positions') {
            nodes.style('fill', function(d) {
                var scale = d3.scale.linear()
                .range(['#98df8a', '#dbdb8d', '#ff9896'])
                .interpolate(d3.interpolateLab)
                .domain([1, 1 + (d.rna.rnaLength - 1) / 2, d.rna.rnaLength]);

                return scale(d.num);
            });
        } else if (newColorScheme == 'custom') {
            // scale to be used in case the user passes scalar
            // values rather than color names
            if (typeof self.customColors != 'undefined' &&
                'domain' in self.customColors &&
               'range' in self.customColors) {
                var scale = d3.scale.linear()
                .interpolate(d3.interpolateLab)
                .domain(self.customColors.domain)
                .range(self.customColors.range);
            }

            let changeColors = (moleculeColors, d, scale) => {
                if (moleculeColors.hasOwnProperty(d.num)) {
                    let val = parseFloat(moleculeColors[d.num]);

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

            nodes.style('fill', function(d) {
                if (typeof self.customColors == 'undefined' ||
                   !self.customColors.hasOwnProperty('colorValues')) {
                    return 'white';
                }

                if (self.customColors.colorValues.hasOwnProperty(d.structName) &&
                    self.customColors.colorValues[d.structName].hasOwnProperty(d.num)) {
                    // if a molecule name is specified, it supercedes the default colors
                    // (for which no molecule name has been specified)
                    let moleculeColors = self.customColors.colorValues[d.structName];
                    return changeColors(moleculeColors, d, scale);
                } else if (self.customColors.colorValues.hasOwnProperty('')) {
                    let moleculeColors = self.customColors.colorValues[''];
                    return changeColors(moleculeColors, d, scale);
                }

                return 'white';
            });
        }
    };

    let updateStyle = () => {
        // Numbering
        visNodes.selectAll('[node_type=label]').classed(fstyle.transparent, !self.displayParameters.displayNumbering);
        visNodes.selectAll('[label_type=label]').classed(fstyle.transparent, !self.displayParameters.displayNumbering);
        visLinks.selectAll('[link_type=label_link]').classed(fstyle.transparent, !self.displayParameters.displayNumbering);
        // Node Outline
        svg.selectAll('[node_type=nucleotide]').classed(fstyle.transparent, !self.displayParameters.displayNodeOutline);
        // Node Labels
        visNodes.selectAll('[label_type=nucleotide]').classed(fstyle.transparent, !self.displayParameters.displayNodeLabel);
        // Links
        svg.selectAll('[link_type=real],[link_type=basepair],[link_type=backbone],[link_type=pseudoknot],[link_type=protein_chain],[link_type=chain_chain],[link_type=external]').classed(fstyle.transparent, !self.displayParameters.displayLinks);
        // Pseudoknot Links
        svg.selectAll('[link_type=pseudoknot]').classed(fstyle.transparent, !self.displayParameters.displayPseudoknotLinks);
        // Protein Links
        svg.selectAll('[link_type=protein_chain]').classed(fstyle.transparent, !self.displayParameters.displayProteinLinks);
        // Fake Links
        visLinks.selectAll('[link_type=fake]').classed(fstyle.transparent, !self.options.displayAllLinks);
        visLinks.selectAll('[link_type=fake_fake]').classed(fstyle.transparent, !self.options.displayAllLinks);
        // direction Arrows
        svg.selectAll('.' + fstyle.directionArrow).classed(fstyle.transparent, !self.displayParameters.displayDirectionArrows);
    };

    /* RNA edditing related functions */
    let changeNode = function(nodeName, referenceNode) {
        // change the label of a node
        let rna = referenceNode.rna;

        let dotbracket = rnaUtilities.pairtableToDotbracket(rna.pairtable);
        let positions = rna.getPositions('nucleotide');
        let sequence = rna.seq
        let uids = rna.getUids();

        let newNodeNum = referenceNode.num;

        let newDotbracket = dotbracket;
        let newSequence = sequence.slice(0,newNodeNum-1) +  nodeName + sequence.slice(newNodeNum);

        console.log('newSequence:', newSequence);

        console.log('uids:', uids);
        uids.splice(newNodeNum-1, 1, slugid.nice());
        let newPositions = positions;

        delete self.rnas[rna.uid];
        let newRNA = self.addRNA(newDotbracket, {'sequence': newSequence,
                                 'positions': newPositions,
                                 'uids': uids,
                                 'centerView': false});
    }

    let insertNodeBeforeOrAfter = function(nodeName, referenceNode, positionOffset) {
        //insert a new node before or after another one
        //positionOffset specifies who far from the original to insert the new node
        let rna = referenceNode.rna;

        let dotbracket = rnaUtilities.pairtableToDotbracket(rna.pairtable);
        let positions = rna.getPositions('nucleotide');
        let sequence = rna.seq
        let uids = rna.getUids();

        let newNodeNum = referenceNode.num + positionOffset;

        let newDotbracket = dotbracket.slice(0,newNodeNum) + '.' + dotbracket.slice(newNodeNum);
        let newSequence = sequence.slice(0,newNodeNum) +  nodeName + sequence.slice(newNodeNum);

        console.log('newSequence:', newSequence);

        uids.splice(newNodeNum, 0, slugid.nice());
        positions.splice(newNodeNum, 0, positions[newNodeNum - positionOffset-1]);

        let newUids = uids;
        let newPositions = positions;

        console.log('positions:', positions);
        console.log('new node positions:', newPositions);

        delete self.rnas[rna.uid];
        let newRNA = self.addRNA(newDotbracket, {'sequence': newSequence,
                                 'positions': newPositions,
                                 'uids': newUids,
                                 'centerView': false});
    }

    let deleteNode = function(node) {
        console.log('deleting...', node);
        // get the dotbracket string for this rna
        let rna = node.rna;
        let pair = rna.pairtable[node.num];

        // remove basepairs for this node
        if (pair != 0) {
            rna.pairtable[node.num] = 0;
            rna.pairtable[pair] = 0;
        }

        let dotbracket = rnaUtilities.pairtableToDotbracket(rna.pairtable);
        let positions = rna.getPositions('nucleotide');
        let sequence = rna.seq
        let uids = rna.getUids();

        let newDotbracket = dotbracket.slice(0, node.num-1) + dotbracket.slice(node.num)
        let newPositions = positions.slice(0, node.num-1)
                .concat(positions.slice(node.num));
        let newSequence = sequence.slice(0, node.num-1) + sequence.slice(node.num)
        let newUids = uids.slice(0, node.num-1)
                .concat(uids.slice(node.num));

        delete self.rnas[rna.uid];
        let newRNA = self.addRNA(newDotbracket, {'sequence': newSequence,
                                 'positions': newPositions,
                                 'uids': newUids,
                                  'centerView': false});

        console.log('new dotbracket:', newDotbracket);
        //recalculateGraph();

        //remove backbone links associated with this node

        //remove this node

    }

    let elementKey = (d) => {
        return d.uid;
    };

    let updateRnaGraph = function(r) {
        let nucleotidePositions = r.getPositions('nucleotide');
        let labelPositions = r.getPositions('label');

        let uids = r.getUids();

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

    let removeBackBoneLink = function(d) {
        if (d.target.num - d.source.num != 1) {
            console.log('ERROR: non adjacent nodes. Target:', d.target,
                        'Source:', d.source, 'Link:', d);
            return;
        }

        let rna = d.target.rna;
        let toRemove = [];

        for (let i = 0; i < rna.links.length; i++) {
            let link = rna.links[i];

            if (link.linkType != 'basepair')
                continue;

            if (link.source.num <= d.source.num && link.target.num >= d.target.num) {
                console.log('crossing basepair', link);
                toRemove.push(link);
            }
        }


        // Remove all base pairs that are between these two nodes and add them as extra
        // links
        console.log('toRemove:', toRemove);

        for (let i = 0; i < toRemove.length; i++) {
            rna.pairtable[toRemove[i].source.num] = 0;
            rna.pairtable[toRemove[i].target.num] = 0;

            toRemove[i].from = toRemove[i].source.num;
            toRemove[i].to = toRemove[i].target.num - d.source.num;
        }

        // extract the dotbracket string of the rna
        // cut it at the position of this backbone bond
        let sequence = rna.seq;
        let sequence1 = rna.seq.slice(0, d.source.num);
        let sequence2 = rna.seq.slice(d.source.num);

        let rnaDotBracket = rnaUtilities.pairtableToDotbracket(rna.pairtable);
        let dotBracket1 = rnaDotBracket.slice(0, d.source.num);
        let dotBracket2 = rnaDotBracket.slice(d.source.num)

        // get the nucleotide positions
        // cut them at the positions of the backbone bond
        let positions = rna.getPositions('nucleotide')
        let uids = rna.getUids();

        let positions1 = positions.slice(0, d.source.num);
        let positions2 = positions.slice(d.source.num);

        let uids1 = uids.slice(0, d.source.num);
        let uids2 = uids.slice(d.source.num);

        console.log('positions1:', positions1);
        console.log('positions2:', positions2);

        delete self.rnas[rna.uid];
        let rna1 = self.addRNA(dotBracket1, { 'sequence': sequence1,
                                   'positions': positions1,
                                   'uids': uids1 });
        let rna2 = self.addRNA(dotBracket2, { 'sequence': sequence2,
                                   'positions': positions2,
                                   'uids': uids2 });
        for (let i = 0; i < toRemove.length; i++) {
            console.log('rna1:', rna1);
            console.log('rna2:', rna2);
            console.log('toRemove[i]', toRemove[i]);
            self.extraLinks.push(
                {'source': rna1.nodes[toRemove[i].from-1],
                 'target': rna2.nodes[toRemove[i].to-1],
                 'value': 1,
                 'uid': slugid.nice(),
                 'linkType': 'intermolecule'});
                recalculateGraph();
                self.update();

        }
        console.log('self.extraLinks:', self.extraLinks);
        //self.extraLinks.push({'source': rna1.nodes[

        // create two new rnas
        // add their positions
        // add them back to the plot
    }

    var removeLink = function(d) {
        // remove a link between two nodes
        let index = self.graph.links.indexOf(d);
        console.log('removing link:', index);

        if (index > -1) {
            //remove a link
            //graph.links.splice(index, 1);

            // there should be two cases
            // 1. The link is within a single molecule

            if (d.source.rna == d.target.rna) {
                if (d.linkType == 'backbone') {
                    console.log('trying to remove a backbone link', d.source.num, d.target.num);
                    removeBackBoneLink(d);
                    return;
                } else {
                    let r = d.source.rna;
                    r.addPseudoknots();
                    r.pairtable[d.source.num] = 0;
                    r.pairtable[d.target.num] = 0;

                    updateRnaGraph(r);
                }
            } else {
                // 2. The link is between two different molecules
                let extraLinkIndex = self.extraLinks.indexOf(d);

                self.extraLinks.splice(extraLinkIndex, 1);
            }
            recalculateGraph();
        }
        self.update();
    };

    let addBackBoneLink = function(newLink) {
        // opposite of deleting a link
        // get the two dotbracket strings
        let rna1 = newLink.target.rna;
        let rna2 = newLink.source.rna;
        if (newLink.target.num == 1) {
          rna1 = newLink.source.rna;
          rna2 = newLink.target.rna;
        }

        let dotbracket1 = rnaUtilities.pairtableToDotbracket(rna1.pairtable);
        let dotbracket2 = rnaUtilities.pairtableToDotbracket(rna2.pairtable);

        let seq1 = rna1.seq;
        let seq2 = rna2.seq;

        let positions1 = rna1.getPositions('nucleotide');
        let positions2 = rna2.getPositions('nucleotide');

        // concatenate them
        let newDotbracket = dotbracket1 + dotbracket2;
        let newSeq = seq1 + seq2;
        let newPositions = positions1.concat(positions2);

        let toAddInternal = [];
        let toAddExternal = [];
        let toDelete = {};

        for (let i = 0; i < self.extraLinks.length; i++) {
            console.log('self.extraLinks[i]', self.extraLinks[i]);
            console.log('rna1:', rna1);
            console.log('rna2:', rna2);
            if (self.extraLinks[i].source.rna == rna1) {
                if ( self.extraLinks[i].target.rna == rna2) {
                    // both ends of the extra link are within what will become the new molecule
                    // need to be added as base pairs afterwards
                    //self.extraLinks[i].from = self.extraLinks[i].source.num;
                    //self.extraLinks[i].to = dotbracket1.length + self.extraLinks[i].target.num;
                    //toAddInternal.push(self.extraLinks[i]);
                } else {
                    // only one end of the extra link is within what will become the newly
                    // created molecule, needs to remain an extra link
                    // source will always be the unchanged molecule, whereas target will be
                    // the newly created one
                    toAddExternal.push({
                        'source': self.extraLinks[i].target,
                        'target': self.extraLinks[i].source.num
                    });

                    toDelete[self.extraLinks[i].uid] = true;
                }
            } else if (self.extraLinks[i].source.rna == rna2) {
                if ( self.extraLinks[i].target.rna == rna1) {
                    // add internal link
                    // both ends of the extra link are within what will become the new molecule
                    // need to be added as base pairs afterwards
                    //self.extraLinks[i].from = self.extraLinks[i].target.num;
                    //self.extraLinks[i].to = dotbracket1.length + self.extraLinks[i].source.num;

                    //toAddInternal.push(self.extraLinks[i]);
                } else {
                    toAddExternal.push({
                        'source': self.extraLinks[i].target,
                        'target': self.extraLinks[i].source.num + dotbracket1.length
                    });
                    toDelete[self.extraLinks[i].uid] = true;
                }
            }

            if (self.extraLinks[i].target.rna == rna1) {
                if (self.extraLinks[i].source.rna == rna2) {
                    // covered in previous if statement
                } else {
                    // only one end of the extra link is within what will become the newly
                    // created molecule, needs to remain an extra link
                    toAddExternal.push({
                        'source': self.extraLinks[i].source,
                        'target': self.extraLinks[i].target.num
                    });

                    toDelete[self.extraLinks[i].uid] = true;
                }
            } else if (self.extraLinks[i].target.rna == rna2) {
                if (self.extraLinks[i].source.rna == rna1) {
                    toAddExternal.push({
                        'source': self.extraLinks[i].source,
                        'target': self.extraLinks[i].target.num + dotbracket1.length
                    });

                    toDelete[self.extraLinks[i].uid] = true;
                }
            }
        }


        self.extraLinks = self.extraLinks.filter((e) => { return !(e.uid in toDelete) });

        delete self.rnas[rna1.uid];
        delete self.rnas[rna2.uid];

        let newRna = null;
        // create a new RNA
        if (self.options.animation)
            newRna = self.addRNA(newDotbracket, { 'sequence': newSeq,
                                'positions': newPositions,
                                'centerView': false});
        else
            newRna = self.addRNA(newDotbracket, { 'sequence': newSeq,
                        'centerView': false });



        // add new external links
        for (let i = 0; i < toAddExternal.length; i++) {
            self.extraLinks.push({
                'source': toAddExternal[i].source,
                'target': newRna.nodes[toAddExternal[i].target-1],
                'value': 1,
                'uid': slugid.nice(),
                'linkType': 'intermolecule'
            });
        }

        recalculateGraph();
        self.update();
        console.log('self.extraLinks:', self.extraLinks);
    };

    function nudge(dx, dy) {
      // TODO currently unused
        node.filter(function(d) { return d.selected; })
        .attr('cx', function(d) { return d.x += dx; })
        .attr('cy', function(d) { return d.y += dy; });

        link.filter(function(d) { return d.source.selected; })
        .attr('x1', function(d) { return d.source.x; })
        .attr('y1', function(d) { return d.source.y; });

        link.filter(function(d) { return d.target.selected; })
        .attr('x2', function(d) { return d.target.x; })
        .attr('y2', function(d) { return d.target.y; });

        d3.event.preventDefault();
    }

    let nodeMouseup = function(d,i) {
        console.log("nodeMouseup")
        let backbonePossible = true, basepairPossible = true;

        if (mousedownNode) {
            mouseupNode = d;

            // if the node isn't a nucleotide, we can't create a link
            if (mouseupNode.nodeType == 'middle' || mousedownNode.nodeType == 'middle' || mouseupNode.nodeType == 'label' || mousedownNode.nodeType == 'label')
                return;

            if (mouseupNode == mousedownNode) { resetMouseVars(); return; }
            let newLink = {source: mousedownNode, target: mouseupNode, linkType: 'basepair', value: 1, uid: slugid.nice()};

            for (let i = 0; i < self.graph.links.length; i++) {
                if ((self.graph.links[i].source == mousedownNode)  ||
                    (self.graph.links[i].target == mousedownNode) ||
                    (self.graph.links[i].source == mouseupNode) ||
                    (self.graph.links[i].target == mouseupNode)) {
                    // either one of the nodes is already in a link

                    // if any of the nodes are already involved in a basepair or a pseudoknot
                    // then we can't make a basepair link
                    if (self.graph.links[i].linkType == 'basepair' ||
                        self.graph.links[i].linkType == 'pseudoknot' ||
                        self.graph.links[i].linkType == 'intermolecule') {
                        // although should be able to make a backbone link
                        console.log('no basepair possible');
                        basepairPossible = false;
                    }
                }

                if (((self.graph.links[i].source == mouseupNode)  &&
                     (self.graph.links[i].target == mousedownNode)) ||
                         ((self.graph.links[i].source == mousedownNode)  &&
                          (self.graph.links[i].target == mouseupNode))) {

                    // if we're trying to make a link between two nodes which already have
                    // a backbone between them, then we can't make a link
                    if (self.graph.links[i].linkType == 'backbone') {
                        return;
                    }
                }
            }


            if (newLink.source.rna != newLink.target.rna) {
                    // could be either a backbone link or an intermolecule link

                if ((newLink.source.num == 1 &&
                     newLink.target.num == newLink.target.rna.rnaLength) ||
                     (newLink.target.num == 1 &&
                      newLink.source.num == newLink.source.rna.rnaLength)) {
                          //
                          let linkMenu = [
                              {
                                  title: 'Backbone Link',
                                  action: function(elm, d, i) {
                                      linkContextMenuShown = false;
                                      console.log('Item #1 clicked!');
                                      console.log('The data for this circle is: ' + d);
                                      dragLine.attr('class', fstyle.transparent);
                                      addBackBoneLink(newLink);
                                  },
                                  disabled: false // optional, defaults to false
                              },
                              {
                                  title: 'Basepair Link',
                                  action: function(elm, d, i) {
                                      linkContextMenuShown = false;
                                      console.log('You have clicked the second item!');
                                      console.log('The data for this circle is: ' + d);
                                      dragLine.attr('class', fstyle.transparent);
                                      self.addLink(newLink);
                                  }
                              }
                          ]
                          linkContextMenuShown = true;
                          let linkContextMenu = contextMenu(linkMenu);
                          console.log('newLinkMenu');
                          linkContextMenu.apply(this, [d,i,true,
                                                function() { dragLine.attr('class', fstyle.transparent) }]);
                      } else {
                          // between end points but can't make a backbone
                          if (basepairPossible)
                            self.addLink(newLink);
                      }
            } else {
                if (basepairPossible)
                    self.addLink(newLink);
            }

        }
    };

    let nodeMousedown = function(d) {
      console.log("nodeMousedown")
      if (!d.selected && !ctrlKeydown) {
        // if this node isn't selected, then we have to unselect every other node
        deselectAllNodes()
      }

      if (!shiftKeydown) {
        // only without shift, toggle select or select
        if (ctrlKeydown) {
          toggleSelectNode(d)
        } else {
          selectNode(d)
        }
      }

      if (shiftKeydown && self.options.editable) {
        // with shift key and editable continue to draw dragline
        mousedownNode = d;

        dragLine
        .attr('class', fstyle.dragLine)
        .attr('x1', mousedownNode.x)
        .attr('y1', mousedownNode.y)
        .attr('x2', mousedownNode.x)
        .attr('y2', mousedownNode.y);

        d3.event.stopPropagation();
      }
    };

    let linkClick = (d) => {
        if (!shiftKeydown) {
            return;
        }

        var invalidLinks = { //'backbone': true,
                             'fake': true,
                             'fake_fake': true,
                             'label_link': true};

        console.log('d.linkType:', d.linkType);
        if (d.linkType in invalidLinks )
            return;

        removeLink(d);
    };

    /* I/O functions */
    self.toJSON = function toJSON() {
       var data = {'rnas': self.rnas, 'extraLinks': self.extraLinks};
            var dataString = JSON.stringify(data, function(key, value) {
            //remove circular references
            if (key == 'rna') {
                return;
            } else {
                return value;
            }
       }, '\t');
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

        recalculateGraph();
        self.update();
    };

    self.addRNA = function(structure, passedOptions = {}) {
        let rnaJson = createInitialLayout(structure, passedOptions);
        let centerView = false;

        /*
         * Code to display the JSONs representing the structure
         *
        rnaJson.nodes[0].rna = null;
        rnaJson.nodes[0].nextNode = null;

        rnaJson.links[0].source = null;
        rnaJson.links[0].target = null;

        console.log(rnaJson.nodes[0]);
        console.log(rnaJson.links[0]);
        console.log(JSON.stringify(rnaJson.nodes[0],null,2));
        console.log(JSON.stringify(rnaJson.links[0],null,2));
        */

        if ('extraLinks' in passedOptions) {
            // presumably the passed in links are within the passed molecule
            let newLinks = self.addExternalLinks(rnaJson, passedOptions.extraLinks);

            self.extraLinks = self.extraLinks.concat(newLinks);
        }

        if ('centerPos' in passedOptions)
            self.addRNAJSON(rnaJson, {centerPos: passedOptions.centerPos,
                                      centerView: false})
        else if ('avoidOthers' in passedOptions)
            self.addRNAJSON(rnaJson, {avoidOthers: passedOptions.avoidOthers});
        else
            self.addRNAJSON(rnaJson, {centerView: passedOptions.centerView});

        return rnaJson;
    };

    self.addRNAJSON = function(rnaGraph,
     { avoidOthers = false,
      centerPos = null,
      centerView = true}
    ) {
        // Add an RNAGraph, which contains nodes and links as part of the
        // structure
        // Each RNA will have uid to identify it
        // when it is modified, it is replaced in the global list of RNAs
        //
        var maxX, minX;
        //console.log('centerView:', centerView);

        if (centerPos != null) {
            // center the newly created RNA at a given position
            let totalX = 0;
            let totalY = 0;
            let nodeCount = 0;

            rnaGraph.nodes.forEach(function(node) {
                totalX += node.x;
                totalY += node.y;
                nodeCount += 1;
            });

            if (nodeCount > 0) {
                // center the nodes at centerPos

                rnaGraph.nodes.forEach(function(node) {
                    node.x = node.x + centerPos[0] - totalX / nodeCount;
                    node.y = node.y + centerPos[1] - totalY / nodeCount;

                    node.px = node.x;
                    node.py = node.y;
                });
            }
        }

        if (avoidOthers) {
            if (self.graph.nodes.length > 0)
                maxX = d3.max(self.graph.nodes.map(function(d) { return d.x; }));
            else
                maxX = 0;

            minX = d3.min(rnaGraph.nodes.map(function(d) { return d.x; }));

            rnaGraph.nodes.forEach(function(node) {
                node.x += (maxX - minX) + 20;
                node.px += (maxX - minX);
            });
        }

        rnaGraph.nodes.forEach(function(node) {
            node.rna = rnaGraph;
        });

        self.rnas[rnaGraph.uid] = rnaGraph;
        recalculateGraph();

        self.update();

        if (centerView)
            self.centerView();

        return rnaGraph;
    };

    self.addNodes = function addNodes(json) {
        // add a new set of nodes from a json file

        // Resolve the sources and targets of the links so that they
        // are not just indeces into an array
        json.links.forEach(function(entry) {
            if (typeof entry.source == 'number') entry.source = json.nodes[entry.source];
            if (typeof entry.target == 'number') entry.target = json.nodes[entry.target];
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
        recalculateGraph();

        self.update();
        self.centerView();
    };

    self.clearNodes = () => {
        self.graph.nodes = [];
        self.graph.links = [];

        self.rnas = {};
        self.extraLinks = [];

        self.update();
    };

    self.addLink =  function(newLink) {
        // this means we have a new json, which means we have
        // to recalculate the structure and change the colors
        // appropriately
        //
        console.log('adding new link');
        if (newLink.source.rna == newLink.target.rna) {
            // must be a basepair
            let r = newLink.source.rna;

            r.pairtable[newLink.source.num] = newLink.target.num;
            r.pairtable[newLink.target.num] = newLink.source.num;

            updateRnaGraph(r);

        } else {
            //Add an extra link
            console.log('intermolecule');
            newLink.linkType = 'intermolecule';
            self.extraLinks.push(newLink);
        }
        recalculateGraph();
        self.update();
    };

    self.addExternalLinks = function(rnaJson, externalLinks) {
        let newLinks = [];

        for (let i = 0; i < externalLinks.length; i++) {
            let newLink = {linkType: 'external', value: 1, uid: slugid.nice(),
                source: null, target: null};
            // check if the source node is an array
            if (Object.prototype.toString.call(externalLinks[i][0]) === '[object Array]') {
                for (let j = 0; j < rnaJson.nodes.length; j++) {
                    if ('nucs' in rnaJson.nodes[j]) {
                        if (rnaJson.nodes[j].nucs.equals(externalLinks[i][0])) {
                            newLink.source = rnaJson.nodes[j];
                            break;
                        }
                    }
                }
            } else {
                for (let j = 0; j < rnaJson.nodes.length; j++) {
                    if (rnaJson.nodes[j].num == externalLinks[i][0]) {
                        newLink.source = rnaJson.nodes[j];
                    }
                }
            }

            // check if the target node is an array
            if (Object.prototype.toString.call(externalLinks[i][1]) === '[object Array]') {
                for (let j = 0; j < rnaJson.nodes.length; j++) {
                    if ('nucs' in rnaJson.nodes[j]) {
                        if (rnaJson.nodes[j].nucs.equals(externalLinks[i][1])) {
                            newLink.target = rnaJson.nodes[j];
                        }
                    }
                }
            } else {
                for (let j = 0; j < rnaJson.nodes.length; j++) {
                    if (rnaJson.nodes[j].num == externalLinks[i][1]) {
                        newLink.target = rnaJson.nodes[j];
                    }
                }
            }

            if (newLink.source == null || newLink.target == null) {
                console.log('ERROR: source or target of new link not found:', newLink, externalLinks[i]);
                continue;
            }

            newLinks.push(newLink);
        }

        return newLinks;
    };

    self.getStructuresDotBracket = function() {
        console.log('self.rnas:', self.rnas);
        let sequence = [];
        let currIdx = 1;
        let nodeIdxs = {};
        let breaks = [];
        let pairtable = [];

        // add the nodes
        for (let uid in self.rnas) {
            let rna = self.rnas[uid];

            for (let j = 0; j < rna.nodes.length; j++) {
                let node = rna.nodes[j];

                if (node.nodeType != 'nucleotide')
                    continue;

                console.log('node:', node);
                nodeIdxs[node.uid] = currIdx;
                currIdx += 1;

                sequence.push(node.name);
            }

            breaks.push(currIdx);
        }

        pairtable = [currIdx-1]
        for (let i = 0; i < currIdx; i++)
            pairtable.push(0)

        // add the links
        for (let uid in self.rnas) {
            let rna = self.rnas[uid];

            for (let j = 0; j < rna.links.length; j++) {
                let link = rna.links[j];

                if (link.linkType != 'basepair')
                    continue;

                let idx1 = nodeIdxs[link.source.uid];
                let idx2 = nodeIdxs[link.target.uid];
                pairtable[idx1] = idx2;
                pairtable[idx2] = idx1;
            }
        }

        for (let i = 0; i < self.extraLinks.length; i++) {
            let link = self.extraLinks[i];

            let idx1 = nodeIdxs[link.source.uid];
            let idx2 = nodeIdxs[link.target.uid];

            pairtable[idx1] = idx2;
            pairtable[idx2] = idx1;
        }

        let structure = rnaUtilities.pairtableToDotbracket(pairtable).split('');

        for (let i = 0; i < breaks.length - 1; i++) {
            console.log('breaks[i]:', breaks[i]);
            sequence.splice(breaks[i] + i - 1, 0, '&');
            structure.splice(breaks[i] + i - 1, 0, '&');
        }

        console.log('sequence:', sequence, sequence.join(''));
        console.log('structure:', structure, structure.join(''));
        return [sequence.join(''), structure.join('')];
    };

    /* APIs */
    self.startAnimation = function() {
      self.options.animation = true;
      vis.selectAll('g.gnode')
        .call(drag);
      self.force.start();
    };

    self.stopAnimation = function() {
      self.options.animation = false;
      vis.selectAll('g.gnode')
           .on('mousedown.drag', null);
      self.force.stop();
    };

    self.resumeForce = function() {
        if (self.options.animation)
            self.force.resume();
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

    self.displayNumbering = function(value) {
      self.displayParameters.displayNumbering = value;
      updateStyle();
    };

    self.displayNodeOutline = function(value) {
      self.displayParameters.displayNodeOutline = value;
      updateStyle();
    };

    self.displayNodeLabel = function(value) {
      self.displayParameters.displayNodeLabel = value;
      updateStyle();
    };

    self.displayLinks = function(value) {
      self.displayParameters.displayLinks = value;
      updateStyle();
    };

    self.displayPseudoknotLinks = function(value) {
      self.displayParameters.displayPseudoknotLinks = value;
      updateStyle();
    };

    self.displayProteinLinks = function(value) {
      self.displayParameters.displayProteinLinks = value;
      updateStyle();
    };

    self.displayDirectionArrows = function(value) {
      self.displayParameters.displayDirectionArrows = value;
      updateStyle();
    };
}
