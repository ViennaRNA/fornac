var Rna = require("drawrnajs");

//First initialise the RNA viewer without dot-bracket notation
var input = [
    "GANYNNHNAAGNNAU",
    ""
];
var app = new Rna({
    el: yourDiv,
    seq: input[0],
    dotbr: input[1],
    layout: "naview",
    seqpanel: false,
    optspanel: false,
    resindex: false
})
app.render();
//Add hydrogen bonds manually
app.struct.get("links").newBond("3", "6")
app.struct.get("links").newBond("2", "7")
app.struct.get("links").newBond("1", "8")
app.struct.get("links").newBond("9", "14")
app.struct.get("links").newBond("10", "13")

//Change the bond type of the two NN-Basepairs
//to non-canonical hydrogen bond and bond type of
//the canonical AU base pair to non-canonical
app.vis.changeBondType("11to12", "non-canonical")
app.vis.changeBondType("4to5", "non-canonical")
app.vis.changeBondType("9to14", "non-canonical")

//Add the non-canonical h-bond between A and G
app.vis.addNCBond(0, 14)

//Set bond edges for the non-canonical hydrogen bonds
app.vis.setLeontisWesthof("2to7", "sghgtrans")
app.vis.setLeontisWesthof("1to8", "hghgtrans")
app.vis.setLeontisWesthof("10to13", "sghgtrans")
app.vis.setLeontisWesthof("9to14", "wchgtrans")
app.vis.setLeontisWesthof("0to14", "sghgcis")
