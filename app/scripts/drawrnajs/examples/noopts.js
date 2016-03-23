var Rna = require("drawrnajs");

var input = [
    "CAGCACGACACUAGCAGUCAGUGUCAGACUGCAIACAGCACGACACUAGCAGUCAGUGUCAGACUGCAIACAGCACGACACUAGCAGUCAGUGUCAGACUGCAIA",
    "..(((((...(((((...(((((...(((((.....)))))...))))).....(((((...(((((.....)))))...))))).....)))))...))))).."
];

var app = new Rna({
    el: yourDiv,
    seq: input[0],
    dotbr: input[1],
    layout: "naview",
    seqpanel: true,
    optspanel: false,
    resindex: true
})
app.render();
