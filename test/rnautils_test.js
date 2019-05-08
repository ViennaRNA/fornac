import {rnaUtilities} from '../app/scripts/rnautils.js'
import {ColorScheme} from '../app/scripts/rnautils.js'

describe('RNA utilities unit tests', function() {
    let pt = rnaUtilities.dotbracketToPairtable('.((..)).');

    it('Should convert dot-bracket strings to pairtables', function() {
        
        expect(pt).toEqual([8,0,7,6,0,0,3,2,0])
    });

    it ('Should be able to create a list of ss elements', function() {
        let elements = rnaUtilities.ptToElements(pt, 0, 1, pt[0]);

        expect(elements.length).toEqual(3);
    });
});

describe('RNA color scheme tests', function() {
    it('should parse ordinal colors', function() {
        let cs = new ColorScheme('domain=0:10 range=red:green 1: 0.7 2:0.8');

        /*
        console.log('cs:', cs);
        console.log('cs.colorJson.colorValues:', cs.colorsJson.colorValues);
        */

    });
});