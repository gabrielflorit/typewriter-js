# typewriter.js

Types paragraphs. Features:

- Uses requestAnimationFrame for better mobile performance.
- Paragraphs take up their "finished" space before typing. This means elements after paragraphs don't constantly reflow.
- Returns promises so you can chain paragraph animations.


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

Create an element with class `typewriter`:

``` html
<p class='typewriter one'>Lorem ipsum dolor sit amet.</p>
<p class='typewriter two'>Ut enim ad minim veniam.</p>
<p class='typewriter three'>Excepteur sint occaecat cupidatat non proident.</p>
```

Prepare the element:

``` javascript
var paragraphs = document.querySelectorAll('.typewriter');
typewriter.prepare(paragraphs);
```



Type away:

``` javascript
typewriter.type(paragraphs[0])
	.then(function() {
		return typewriter.type(paragraphs[1]);
	})
	.then(function() {
		return typewriter.type(paragraphs[2]);
	});
```







