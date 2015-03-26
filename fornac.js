function FornaContainer(element, dimensions) {
    var self = this;

    if (arguments.length < 2) { 
        console.warn('Not enough arguments passed to FornaContainer');
    }

    self.fornaForce = new FornaForce(element, dimensions)
    
    self.addRNA = function(structure, rnaOptions) {
        var options = { 
                        'seq': 'CGCUUCAUAUAAUCCUAAUGAUAUGGUUUGGGAGUUUCUACCAAGAGCCUUAAACUCUUGAUUAUGAAGUG',
                        'struct': '((((((((((..((((((.........))))))......).((((((.......))))))..)))))))))',
                        'name': '1y26',
                        'positions': [],
                        'labelInterval': 10
    
                      };

        if (arguments.length == 2) {
            for (var property in rnaOptions) {
                if (options.hasOwnProperty(option))
                    options[option] = rnaOptions[option];
            }
        }

        console.log('structure:', structure);
        rg = new RNAGraph(options.seq, options.struct, options.name);

        rnaJson = rg.recalculateElements()
        .elementsToJson()
        .addPositions(options.positions)
        .addLabels(options.labelInterval)
        .reinforceStems()
        .reinforceLoops()
        .connectFakeNodes()

        self.fornaForce.addRNAJSON(rnaJson);
    }
}
