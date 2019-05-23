import {RNAGraph} from './rnagraph.js';

import {simpleXyCoordinates} from './simplernaplot.js';
import {NAView} from './naview/naview.js'

import fstyle from './fornac.css';

export function rnaPlot(passedOptions = {}) {
    var options = {
        'width': 300,
        'height': 300,
        'nucleotideRadius': 5,
        'rnaEdgePadding': 1,     // how far the leftmost, rightmost, topmost and bottomost
                                // nucleotides are from the edge of the plot
        'labelInterval': 10,
        'showNucleotideLabels': true,
        'startNucleotideNumber': 1,
        'bundleExternalLinks': false,

        'rnaLayout': 'simple', // simple or naview
        'namePosition': '0 0' // for x and y either 0, 0.5 or 1
    };
    var options = Object.assign(options, passedOptions);

    var xScale, yScale;

    function createTransformToFillViewport(xValues, yValues) {
        // create transform that will scale the x and y values so that
        // they fill the available viewport
        let xExtent = d3.extent(xValues);
        let yExtent = d3.extent(yValues);

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
            var scaleFactor = (firstScale.range()[1] - firstScale.range()[0]) /
                              (firstScale.domain()[1] - firstScale.domain()[0]);
            var newWidth = (newDomain[1] - newDomain[0]) * scaleFactor
            var newMargin = ((newRange[1] - newRange[0]) - newWidth) / 2;

            return {'scaleFactor': scaleFactor,
                    'scale': d3.scale.linear()
                                     .domain(newDomain)
                                     .range([newRange[0] + newMargin, newRange[1] - newMargin])};
        }

        var ret;

        if (xExtra > yExtra) {
            // we have to shrink more in the x-dimension than the y
            xScale = d3.scale.linear()
            .domain(xExtent)
            .range([0, options.width])

            ret = createOtherScale(xScale, yExtent, [0, options.height]);
            yScale = ret.scale;
        } else {
            // we have to shrink more in the x-dimension than the y
            yScale = d3.scale.linear()
            .domain(yExtent)
            .range([0, options.height])

            ret = createOtherScale(yScale, xExtent, [0, options.width]);
            xScale = ret.scale;
        }

        var xOffset = xScale.range()[0] - xScale.domain()[0];
        var yOffset = yScale.range()[0] - yScale.domain()[0];

        return 'translate(' + -(xScale.domain()[0] * ret.scaleFactor - xScale.range()[0]) +
                  ',' + -(yScale.domain()[0] * ret.scaleFactor - yScale.range()[0]) + ')' +
            'scale(' + ret.scaleFactor + ')';
    }

    function createNucleotides(selection, nucleotideNodes) {
        // create groupings for each nucleotide and label
        var gs = selection
        .selectAll('.gnode')
        .data(nucleotideNodes)
        .enter()
        .append('svg:g')
        .classed('gnode', true)
        .attr('transform', function(d) {
            return 'translate(' + d.x + ',' + d.y + ')';
        });

        var circles = gs.append('svg:circle')
        .classed(fstyle.node, true)
        .attr('node_type', 'nucleotide')
        .attr('base_type', (d) => { if (d.name) { return d.name.toLowerCase(); }})
        .attr('r', options.nucleotideRadius)


        if (options.showNucleotideLabels) {
            var nucleotideLabels = gs.append('svg:text')
            .text(function(d) { return d.name; })
            .classed(fstyle.nodeLabel, true)
            .append('svg:title')
            .text(function(d) { return d.struct_name + ':' + d.num; });
        }
    }

    function createLabels(selection, labelNodes) {
        // create groupings for each nucleotide and label

        var gs = selection
        .selectAll()
        .data(labelNodes)
        .enter()
        .append('svg:g')
        .classed('gnode', true)
        .attr('transform', function(d) {
            return 'translate(' + d.x + ',' + d.y + ')';
        });

        var circles = gs.append('svg:circle')
        .classed(fstyle.node, true)
        .attr('node_type', 'label')
        .attr('r', options.nucleotideRadius)

        var numberLabels = gs.append('svg:text')
        .classed(fstyle.nodeLabel, true)
        .text(function(d) { return d.name; })
    }

    function createName(selection, name) {
        let nameLabel = selection.append('svg:text')
        //.attr('dy', -10)
        .classed(fstyle.plotLabel, true)
        .text(name);

        let xyPos = options.namePosition.split(" ", 2) // 0 0.5 1
        let xy = []
        let textBBox = nameLabel.node().getBBox()
        let textSize = [textBBox.width, textBBox.height]
        let plotSize = [options.width, options.height]

        for (let p in [0, 1]) {
            switch (xyPos[p]) {
                case '0':
                    xy[p] = textSize[p] / 2
                    break;
                case '1':
                    xy[p] = plotSize[p] - textSize[p] / 2
                    break;
                case '0.5':
                    xy[p] = plotSize[p] / 2
                    break;
            }
        }
        nameLabel.attr('x', xy[0]).attr('y', xy[1])
    }

    function makeExternalLinksBundle(selection, links) {
        var nodesDict = {};
        var linksList = [];
        links = links.filter(function(d) { return d.linkType == 'correct' || d.linkType == 'incorrect' || d.linkType == 'extra'; });

        selection.selectAll('[link-type=extra]')
        .remove();


        for (var i = 0; i < links.length; i++) {
            if (links[i].source === null || links[i].target === null)
                continue;

            nodesDict[links[i].source.uid] = links[i].source;
            nodesDict[links[i].target.uid] = links[i].target;

            linksList.push({'source': links[i].source.uid, 'target': links[i].target.uid, 'linkType': links[i].linkType, 'extraLinkType': links[i].extraLinkType}) ;
        }

        var fbundling = d3.ForceEdgeBundling().nodes(nodesDict).edges(linksList)
        .compatibility_threshold(0.8).step_size(0.2);
        var results   = fbundling();

        var d3line = d3.svg.line()
            .x(function(d){return d.x;})
            .y(function(d){return d.y;})
            .interpolate('linear');

        for (var i = 0; i < results.length; i++) {
            var edge_subpoint_data = results[i];
            // for each of the arrays in the results
            // draw a line between the subdivions points for that edge

            selection.append('path').attr('d', d3line(edge_subpoint_data))
            .style('fill', 'none')
            .attr('link-type', function(d) { return linksList[i].linkType; })
            .attr('extra-link-type', function(d) { return linksList[i].extraLinkType; })
            .style('stroke-opacity',0.4); //use opacity as blending
        }

    }

    function createLinks(selection, links) {
        links = links.filter(function(d) { return d.source !== null && d.target !== null; });
        var gs = selection.selectAll('.link')
        .data(links)
        .enter()
        .append('svg:line')
        .attr('x1', function(d) { return d.source.x; })
        .attr('x2', function(d) { return d.target.x; })
        .attr('y1', function(d) { return d.source.y; })
        .attr('y2', function(d) { return d.target.y; })
        .attr('link-type', function(d) { return d.linkType; })
        .attr('extra-link-type', function(d) { return d.extraLinkType; })
        .classed('link', true)
        .classed(fstyle.link, true)
    }

    function chart(selection) {
        selection.each(function(data) {
            let plot = d3.select(this).append('g')
            .classed(fstyle.plot, true)

            // data should be a dictionary containing at least a structure
            // and possibly a sequence
            let rg = new RNAGraph(data.sequence, data.structure, data.name, options.startNucleotideNumber)
                    .recalculateElements()
                    .elementsToJson()
                    .addName(data.name);

            data.rnaGraph = rg;
            // calculate the position of each nucleotide
            // the positions of the labels will be calculated in
            // the addLabels function
            let positions = [];

            if (options.rnaLayout === 'naview') {
                var naview = new NAView();
                var naViewPositions = naview.naview_xy_coordinates(rg.pairtable);

                for (var i = 0; i < naViewPositions.nbase; i++) {
                    positions.push([naViewPositions.x[i], naViewPositions.y[i]]);
                }
            } else {
                positions = simpleXyCoordinates(rg.pairtable);
            }

            rg.addPositions('nucleotide', positions)
            //.reinforceStems()
            //.reinforceLoops()
            //.addExtraLinks(data.extraLinks)
            .addLabels(options.startNucleotideNumber, options.labelInterval);

            // create a transform that will fit the molecule to the
            // size of the viewport (canvas, svg, whatever)
            let fillViewportTransform = createTransformToFillViewport(
                rg.nodes.map(function(d) { return d.x; }),
                rg.nodes.map(function(d) { return d.y; })
            );
            plot.attr('transform', fillViewportTransform);

            let nucleotideNodes = rg.nodes.filter(function(d) {
                return d.nodeType == 'nucleotide';
            });

            let labelNodes = rg.nodes.filter(function(d) {
                return d.nodeType == 'label';
            });

            let links = rg.links;

            createLinks(plot, links);
            createNucleotides(plot, nucleotideNodes);
            createLabels(plot, labelNodes);
            createName(d3.select(this), data.name);

            if (options.bundleExternalLinks) {
                makeExternalLinksBundle(plot, links);
            }

        });
    }

    chart.width = function(_) {
        if (!arguments.length) return options.width;
        options.width = _;
        return chart;
    };

    chart.height = function(_) {
        if (!arguments.length) return options.height;
        options.height = _;
        return chart;
    };

    chart.showNucleotideLabels = function(_) {
        if (!arguments.length) return options.showNucleotideLabels;
        options.showNucleotideLabels = _;
        return chart;
    };

    chart.rnaEdgePadding = function(_) {
        if (!arguments.length) return options.rnaEdgePadding;
        options.rnaEdgePadding = _;
        return chart;
    };

    chart.nucleotideRadius = function(_) {
        if (!arguments.length) return options.nucleotideRadius;
        options.nucleotideRadius = _;
        return chart;
    };

    chart.labelInterval = function(_) {
        if (!arguments.length) return options.labelInterval;
        options.labelInterval = _;
        return chart;
    };

    chart.showNucleotideLabels = function(_) {
        if (!arguments.length) return options.showNucleotideLabels;
        options.showNucleotideLabels = _;
        return chart;
    };

    chart.startNucleotideNumber = function(_) {
        if (!arguments.length) return options.startNucleotideNumber;
        options.startNucleotideNumber = _;
        return chart;
    };

    chart.bundleExternalLinks = function(_) {
        if (!arguments.length) return options.bundleExternalLinks;
        options.bundleExternalLinks = _;
        return chart;
    };

    chart.rnaLayout = function(_) {
        if (!arguments.length) return options.rnaLayout;
        options.rnaLayout = _;
        return chart;
    };

    chart.namePosition = function(_) {
        if (!arguments.length) return options.namePosition;
        options.namePosition = _;
        return chart;
    };

    return chart;
}
