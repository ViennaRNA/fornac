var Backbone = require("backbone");
var Structure = require("./models/structure");
var Vispanel = require("./views/vispanel");
var Seqpanel = require("./views/seqpanel");
var Optspanel = require("./views/optspanel");

var Drawrnajs = Backbone.View.extend({
    initialize: function(opts){
        var layout = opts.layout || "naview";
        this.struct = new Structure(opts.seq, opts.dotbr, layout);
        this.el = opts.el;
        //views
        //sequence input panel
        if(opts.seqpanel){
            var seqEl = document.createElement("div");
            this.el.appendChild(seqEl);
            this.seq = new Seqpanel({
                struct: this.struct,
                el: seqEl
            })
        }
        //main view
        var visEl = document.createElement("div")
        visEl.className = "cy";
        this.el.appendChild(visEl);
        this.vis = new Vispanel({
            el: visEl,
            struct: this.struct,
            resindex: opts.resindex
        });
        if(opts.optspanel){
            var optsEl = document.createElement("div");
            this.el.appendChild(optsEl);
            this.optns = new Optspanel({
                el: optsEl,
                struct: this.struct,
                vis: this.vis
            });
            this.vis.el.style.width = "70%";
        }
    },
    render: function(){
        if(this.seq){
            this.seq.render();
        }
        if(this.optns){
            this.optns.render();
        }
        this.vis.render();
    }
});

module.exports = Drawrnajs;
