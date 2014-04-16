# Chord diagram generator in pure JS

A tiny (~750 bytes when minified and gzipped) function written in pure javascript (no jQuery or other dependencies) which draws basic guitar chord diagrams in HTML/CSS. Accepts an array of fret positions (mandatory) and an array of finger numbers (optional). Automatically detects barre if more than one string is picked on the same fret with the same finger.

## Quick start

Download a [JS file](https://github.com/shkuznetsov/chord-diagram/blob/master/js/chord-diagram.js) ([minified](https://raw.github.com/shkuznetsov/chord-diagram/master/js/chord-diagram.min.js), [gzipped](https://raw.github.com/shkuznetsov/chord-diagram/master/js/chord-diagram.min.js.gz)) and a [CSS stylesheet](https://github.com/shkuznetsov/chord-diagram/blob/master/css/chord-diagram.css) ([minified](https://raw.github.com/shkuznetsov/chord-diagram/master/css/chord-diagram.min.css), [gzipped](https://raw.github.com/shkuznetsov/chord-diagram/master/css/chord-diagram.min.css.gz)), drop them onto your page. To create a ```div``` containing DOM structure for **C** chord call:
```
var diagram = chordDiagram([-1,3,2,0,1,0], [-1,3,2,-1,1,-1]);
```
Then to attach it to your document, call:
```
document.body.appendChild(diagram);
```

Above will produce something like this:

![C chord diagram goes here](https://raw.github.com/shkuznetsov/chord-diagram/master/demo/C.png)

## Arguments

You sort of can work it out from the above example, but I will describe it here at some point.

## Copyright and license

Doesn't apply. Use it as you wish, but be aware that it may explode and blow your head off or something, so don't come back to me if that happens blah blah blah.