var Rna = require("drawrnajs");

galaxy.getData(function(data, req){
	var lines = data.split("\n");
	if(lines.length < 3 ){
		el.textContent = "Error: invalid dbn file";
	}
	var app = new Rna({
		el: galaxy.el,
	    seq: lines[1],
	    dotbr: lines[2],
	    layout: "naview",
	    seqpanel: true,
	    optspanel: true
	)};
	app.render();
});
