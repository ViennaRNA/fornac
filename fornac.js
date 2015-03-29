function FornaContainer(element, dimensions, options) {
    var self = this;

    if (arguments.length < 2) { 
        console.warn('Not enough arguments passed to FornaContainer');
    }

    self.forceOptions = {
        'applyForce': false
    }

    if (arguments.length == 3) {
        for (var option in options) {
            if (options.hasOwnProperty(option))
                self.forceOptions[option] = options[option];
        }
    }

    self.fornaForce = new FornaForce(element, dimensions, self.forceOptions)
    
    self.addRNA = function(structure, options) {
        var options = { 
                        'seq': 'CGCUUCAUAUAAUCCUAAUGAUAUGGUUUGGGAGUUUCUACCAAGAGCCUUAAACUCUUGAUUAUGAAGUG',
                        'struct': '((((((((((..((((((.........))))))......).((((((.......))))))..)))))))))',
                        'name': '1y26',
                        'positions': [],
                        'labelInterval': 10,
                      };

        if (arguments.length == 2) {
            for (var option in options) {
                if (options.hasOwnProperty(option))
                    options[option] = options[option];
            }
        }

        console.log('structure:', structure);
        rg = new RNAGraph(options.seq, options.struct, options.name);

        rnaJson = rg.recalculateElements()

        if (options.positions.length === 0) {
            // no provided positions means we need to calculate an initial layout
            options.positions = simple_xy_coordinates(rnaJson.pairtable);
        }

        rnaJson = rnaJson.elementsToJson()
        .addPositions("nucleotide", options.positions)
        .addLabels(options.labelInterval)
        .reinforceStems()
        .reinforceLoops()
        .connectFakeNodes()


        self.fornaForce.addRNAJSON(rnaJson);
    }
}
