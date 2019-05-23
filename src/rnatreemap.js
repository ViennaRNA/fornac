import {rnaPlot} from './rnaplot.js';

export function rnaTreemap(passedOptions = {}) {
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
        'namePosition': '0 0', // for x and y either 0, 0.5 or 1
    };

    var options = Object.assign(options, passedOptions);

    function rnaTreemapNode(selection) {
        // create a background rectangle for each RNA structure
        selection.each(function(d) {
            d3.select(this)
            .attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')' })
            .append('rect')
            .attr('fill', 'transparent')
            .attr('width', function(d) { return Math.max(0, d.dx); })
            .attr('height', function(d) { return Math.max(0, d.dy); })

            // draw the actual RNA structure
            var chart = rnaPlot(options)
            .width( Math.max(0, d.dx))
            .height( Math.max(0, d.dy))

            if ('structure' in d) d3.select(this).call(chart)
        });
    }

    var chart = function(selection) {
        selection.each(function(data) {
            console.log('data:', data)
            // initialize the treemap structure
            // sample input
            // { 'name': 'blah',
            // 'children: [{'structure': '..((..))',
            //               'sequence': 'ACCGGCC',
            //               'size': 50}]
            // }
            var treemap = d3.layout.treemap()
            .size([options.width, options.height])
            .sticky(false)
            .value(function(d) { return d.size; });

            // create a new <g> for each node in the treemap
            // this may be a little redundant, since we expect the calling
            // selection to contain their own g elements
            var gEnter = d3.select(this)
                .append('g')
                .classed('rnatreemap', true)
            var treemapGnodes = gEnter.datum(data).selectAll('.treemapnode')
                .data(treemap.nodes)
                .enter()
                .append('g')
                .classed('treemapnode', true)
                .call(rnaTreemapNode);
        });
    };

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

    chart.zoom = function(_) {
        if (!arguments.length) return options.zoom;
        options.zoom = _;
        return chart;
    };

    return chart;
}
