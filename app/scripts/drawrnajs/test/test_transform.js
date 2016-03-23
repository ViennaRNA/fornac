// var assert = require("assert");
// var Rna = require("../src/drawrna");
//
// var seq = "GAGUACAAAUAGUACCG";
// var dotbr = "..((((.....))))..";
//
// describe("drawrnajs.initialize", function(){
//     it("should initialize the model correctly", function(done){
//         var app = new Rna({
//             el: null,
//             seq: seq,
//             dotbr: dotbr,
//             layout: "naview",
//             seqpanel: false,
//             optspanel: false,
//             resindex: false
//         });
//
//         assert.equal(app.struct.get("residues").length, 17);
//         assert.equal(app.struct.get("links").length, 20);
//         var phos = [];
//         var hbond = [];
//         for(var i=0; i<app.struct.get("links").length; i++){
//             var link = app.struct.get("links").at(i);
//             link.type === "phosphodiester" ? phos.push(link) : hbond.push(link);
//         }
//         assert.equal(phos.length, 16);
//         assert.equal(hbond.length, 4);
//         assert.equal(hbond[3].source, 2);
//         assert.equal(hbond[3].target, 14);
//         assert.equal(hbond[2].source, 3);
//         assert.equal(hbond[2].target, 13);
//         assert.equal(hbond[1].source, 4);
//         assert.equal(hbond[1].target, 12);
//         assert.equal(hbond[0].source, 5);
//         assert.equal(hbond[0].target, 11);
//
//         done();
//     });
// });
//
// // describe("toCytoscapeElements", function(){
// //     it("should return the correct cytoscape elements", function(done){
// //         var doc = jsdom.jsdom("../examples/simple.html");
// //         var window = doc.parentWindow;
// //         var $ = global.jQuery = require("jquery")(window);
// //
// //         var transformed = t.transformDotBracket(seq, dotbr);
// //         var cyto = t.toCytoscapeElements(transformed);
// //
// //         assert.equal(cyto.length, transformed.nodes.length + transformed.edges.length);
// //         for(var i=0; i<cyto.length; i++){
// //             var xor = cyto[i].group === "nodes" ? !(cyto[i].group === "edges") : cyto[i].group === "edges";
// //             assert.ok(xor);
// //         }
// //
// //         done();
// //     });
// // });
// //
// // describe("getColor", function(){
// //     it("should return the right color", function(done){
// //         var el = "phosphodiester";
// //         assert.equal(t.getColor(el), "black");
// //         el = "hbond";
// //         assert.equal(t.getColor(el), "#3A0AD9");
// //         el = "A";
// //         assert.equal(t.getColor(el), "#64F73F");
// //         el = "C";
// //         assert.equal(t.getColor(el), "#FFB340");
// //         el = "U";
// //         assert.equal(t.getColor(el), "#EB413C");
// //         el = "G";
// //         assert.equal(t.getColor(el), "#3C88EE");
// //         el = "violation";
// //         assert.equal(t.getColor(el), "red");
// //
// //         done();
// //     });
// // });
// //
// // describe("getWeight", function(){
// //     it("should return the correct edge weight", function(done){
// //         var type = "hbond"
// //         assert.equal(t.getWeight(type), 4);
// //         type = "violation";
// //         assert.equal(t.getWeight(type), 4);
// //         type = "phosphodiester";
// //         assert.equal(t.getWeight(type), 5);
// //
// //         done();
// //     });
// // });
// //
// // describe("getPartner", function(){
// //     it("should return the right partner", function(done){
// //         var g = t.transformDotBracket(seq, dotbr);
// //
// //         var partner;
// //         partner = t.getPartner(2, g.links);
// //         assert.equal(partner, 14);
// //         partner = t.getPartner(3, g.links);
// //         assert.equal(partner, 13);
// //         partner = t.getPartner(4, g.links);
// //         assert.equal(partner, 12);
// //         partner = t.getPartner(5, g.links);
// //         assert.equal(partner, 11);
// //         partner = t.getPartner(14, g.links);
// //         assert.equal(partner, 2);
// //         partner = t.getPartner(13, g.links);
// //         assert.equal(partner, 3);
// //         partner = t.getPartner(12, g.links);
// //         assert.equal(partner, 4);
// //         partner = t.getPartner(11, g.links);
// //         assert.equal(partner, 5);
// //
// //         done();
// //     });
// // });
// //
// // describe("graphToStrings", function(){
// //     it("convert the graph object to a string correctly", function(done){
// //         var g = t.transformDotBracket(seq, dotbr);
// //         var str = t.graphToStrings(g);
// //
// //         assert.equal(str.seq, seq);
// //         assert.equal(str.dotbr, dotbr);
// //
// //         done();
// //     });
// // });
// //
// // describe("isWatsonCrick", function(){
// //     it("should recognize whether a bond forms a correct Watson-Crick pair", function(done){
// //         assert.ok(t.isWatsonCrick("A", "T"));
// //         assert.ok(t.isWatsonCrick("T", "A"));
// //         assert.ok(t.isWatsonCrick("C", "G"));
// //         assert.ok(t.isWatsonCrick("G", "C"));
// //         assert.ok(t.isWatsonCrick("A", "U"));
// //         assert.ok(t.isWatsonCrick("U", "A"));
// //
// //         assert.ok(!t.isWatsonCrick("A", "G"));
// //         assert.ok(!t.isWatsonCrick("C", "T"));
// //         assert.ok(!t.isWatsonCrick("U", "C"));
// //
// //         done();
// //     });
// // });
