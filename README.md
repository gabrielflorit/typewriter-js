# typewriter.js

**[DEMO](http://gabrielflorit.github.io/typewriter.js/)**

Adds typewriter effect to HTML elements. Features:

- Uses requestAnimationFrame for better mobile performance.
- Paragraphs take up their "finished" space before typing. This means elements after paragraphs don't constantly reflow.
- Returns promises so you can chain paragraph animations.
- **338 bytes gzipped, 527 bytes uncompressed**.


### Install

Include `typewriter.js` and `typewriter.css`. Make sure to reference [PinkySwear](https://github.com/timjansen/pinkyswear.js) and [requestAnimationFrame](http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/) first:

``` html
<link rel='stylesheet' href='typewriter.css'>
...
<script src='libs/PinkySwear.js/pinkyswear.js'></script>
<script src='libs/requestAnimationFrame.js'></script>
<script src='typewriter.js'></script>
```


### Usage

Create elements with class `typewriter`:

``` html
<p class='typewriter one'>Lorem ipsum dolor sit amet.</p>
<p class='typewriter two'>Ut enim ad minim veniam.</p>
<p class='typewriter three'>Excepteur sint occaecat cupidatat non proident.</p>
```

Prepare the elements:

``` javascript
typewriter.prepare('.typewriter');
```

Type away:

``` javascript
typewriter.type('.typewriter');
```

Or you could do the following, for greater control:

``` javascript
typewriter.type('.three')
	.then(function() {
		return typewriter.type('.two');
	});
	.then(function() {
		return typewriter.type('.one');
	});
```

Optionally pass in delay:

``` javascript
typewriter.type('.typewriter', {
	delay: 10 // milliseconds until next character
});
```

or duration:

``` javascript
typewriter.type('.typewriter', {
	duration: 1000 // milliseconds until all characters have been typed
});
```

NOTE: At the moment you won't be able to type faster than your device's refresh rate. So `duration` is sort of broken.

## License

MIT © [Gabriel Florit](http://gabrielflor.it)
