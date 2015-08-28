# FornaContainer

In many situations, the user interaction is superfluous and the desired goal is to simply display a secondary structure on a web page. This is a common scenario in, for example, servers that predict a secondary structure. The output, a dot-bracket string can simply be added to a `FornaContainer` object to display.

## Trivial Example

Below is an example of a simple web page which uses a `FornaContainer` to show a simple RNA molecule:

![blah blah](https://raw.githubusercontent.com/pkerpedjiev/fornac/develop/doc/img/forna-container-screenshot.png "An example of the FornaContainer")

The code for creating this web page is rather straightforward. After importing some necessary javascript files, we create a container using `new FornaContainer("#rna_ss", {'applyForce': false})`, passing in `#rna_ss` as the id of the `div` which will hold the container and then populate it with a structure and sequence using `container.addRNA`:

```html
<!DOCTYPE html>
<meta charset="utf-8">

This is an RNA container.
<div id='rna_ss'> </div>
This after the RNA container.

    <link rel='stylesheet' type='text/css' href='css/fornac.css' />
    <script type='text/javascript' src='js/jquery.js'></script>
    <script type='text/javascript' src='js/d3.js'></script>
    <script type='text/javascript' src='js/fornac.js'></script>
    <script type='text/javascript'>
        var container = new FornaContainer("#rna_ss", {'applyForce': false});

        var options = {'structure': '((..((....)).(((....))).))',
                        'sequence': 'CGCUUCAUAUAAUCCUAAUGACCUAU'
        };

        container.addRNA(options.structure, options);
    </script>
```
## Options

The `FornaContainer` supports a number of options to allow users to customize how the RNA will be presented.

### applyForce

Indicate whether the force-directed layout will be applied to the displayed molecule. Enabling this option allows users to change the layout of the molecule by selecting and dragging the individual nucleotide nodes

### allowPanningAndZooming [default=true]

Allow users to zoom in and pan the display. If this is enabled then pressing the 'c' key on the keyboard will center the view.

### circularizeExternal [default=true]

This only makes sense in connection with the `applyForce` argument. If it's true, the external loops will be arranged in a nice circle. If false, they will be allowed to flop around as the force layout dictates:

<img src="https://github.com/pkerpedjiev/fornac/blob/master/doc/img/uncircularized_exterior.png" width=200 align=center />

### labelInterval [default=10]

Change how often nucleotide numbers are labelled with their number.

### Installation

You need [ANT](http://ant.apache.org/), [Java](http://java.com) and [GNU Make](https://www.gnu.org/software/make/) installed if you want to produce a release javascript file (compressed and optimized). Then just type:
```sh
$ make
```
Optionally, you can just cat all javascript files into one file:
```sh
$ cat src/*.js > js/fornac.js
```
Do not forget to run the unit tests in `test.html` to check for regressions!
