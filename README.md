# typewriter.js

**[DEMO](http://gabrielflorit.github.io/typewriter.js/)**

Adds typewriter effect to HTML elements. Features:

- Uses requestAnimationFrame for better mobile performance.
- Paragraphs take up their "finished" space before typing. This means elements after paragraphs don't constantly reflow.
- Returns promises so you can chain paragraph animations.

### Real-world examples

- http://apps.bostonglobe.com/spotlight/clash-in-the-name-of-care/story/

### Install

`npm install typewriter-js`

Make sure you also reference `typewriter.css`.

### Dependencies

- This module relies on `Promise` being available. You might want to use a [polyfill](https://github.com/stefanpenner/es6-promise) to patch [older browsers](http://caniuse.com/#search=promise).

### Usage

Create elements with class `typewriter`:

``` html
<p class='typewriter one'>Lorem ipsum dolor sit amet.</p>
<p class='typewriter two'>Ut enim ad minim veniam.</p>
<p class='typewriter three'>Excepteur sint occaecat cupidatat non proident.</p>
```


Require the library:

``` javascript
var typewriter = require('typewriter-js');
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

Optionally pass in **delay**:

``` javascript
typewriter.type('.typewriter', {
	delay: 10 // milliseconds until next character
});
```

or **duration**:

``` javascript
typewriter.type('.typewriter', {
	duration: 1000 // milliseconds until all characters have been typed
});
```

You can also **untype** text. It works exactly like **type**:

``` javascript
typewriter.untype('.typewriter', {
  duration: 1000
});
```

NOTE 1: If both **delay** and **duration** are present, **delay** takes priority.

NOTE 2: At the moment you won't be able to type faster than your device's refresh rate. So **duration** is sort of broken.

## Contributors

- [Gabriel Florit](https://gabrielflorit.github.io)
- [Michael Shick](https://github.com/mshick)

## License

MIT © [Gabriel Florit](http://gabrielflorit.github.io)
