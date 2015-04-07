# FornaContainer

In many situations, the user interaction is superfluous and the desired goal is to simply display a secondary structure on a web page. This is a common scenario in, for example, servers that predict a secondary structure. The output, a dot-bracket string can simply be added to a `FornaContainer` object to display.

## Trivial Example

Below is an example of a simple web page which uses a `FornaContainer` to show a simple RNA molecule:

![blah blah](https://raw.githubusercontent.com/pkerpedjiev/fornac/develop/doc/img/forna-container-screenshot.png "An example of the FornaContainer")

The code for creating this web page is rather straightforward. After importing some necessary javascript files, we create a container using `new FornaContainer("#rna_ss", {'applyForce': false})`, passing in `#rna_ss` as the id of the `div` which will hold the container and then populate it with a structure and sequence using `container.addRNA`:

```html
<!DOCTYPE html>
<meta charset="utf-8">
<link rel="stylesheet" type="text/css" href="fornaf.css" media="screen" />
This is an RNA container.
 
<div id='rna_ss'> </div>
 
This is after the RNA container.

    <script type='text/javascript' src='jquery.js'></script>
    <script type='text/javascript' src='d3.js'></script>
    <script type='text/javascript' src='rnautils.js'></script>
    <script type='text/javascript' src='rnagraph.js'></script>
    <script type='text/javascript' src='simplernaplot.js'></script>
    <script type='text/javascript' src='fornaf.js'></script>

    <script type='text/javascript'>
var container = new FornaContainer("#rna_ss", {'applyForce': false});

var options = {'structure': '((..((....)).(((....))).))',
    'sequence':             'CGCUUCAUAUAAUCCUAAUGACCUAU' 
};

container.addRNA(options.structure, options);
</script>
```
## Options

The `FornaContainer` supports a number of options to allow users to customize how the RNA will be presented.

### applyForce

Indicate whether the force-directed layout will be applied to the displayed molecule. Enabling this option allows users to change the layout of the molecule by selecting and dragging the individual nucleotide nodes

### allowPanningAndZooming

Allow users to zoom in and pan the display. If this is enabled then pressing the 'c' key on the keyboard will center the view.
