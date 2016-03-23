var Rna = require("drawrnajs");

var apps = [];

var input = [
    "CAGCACGACACUAGCAGUCAGUGUCAGACUGCAIACAGCACGACACUAGCAGUCAGUGUCAGACUGCAIACAGCACGACACUAGCAGUCAGUGUCAGACUGCAIA",
    "..(((((...(((((...(((((...(((((.....)))))...))))).....(((((...(((((.....)))))...))))).....)))))...))))).."
];

for(var i=0; i<12; i++){
    apps.push(new Rna({
        el: document.getElementById("str" + (i+1)),
        seq: input[0],
        dotbr: input[1],
        layout: "naview",
        seqpanel: false,
        optspanel: false,
        resindex: true
    }));
    apps[i].render();
}
