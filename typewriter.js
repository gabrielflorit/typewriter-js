var typewriter = (function () {

	function prepareElement(element, options) {
		
		// grab the text (as long as it doesn't have (&), (<), or (>) - see https://developer.mozilla.org/en-US/docs/Web/API/Element.innerHTML)
		var text = element.innerHTML;
		
		var destination = document.createElement('p');
		destination.className = 'typewriter-active';
		
		if (Modernizr.cssanimations) {
			
			var fragment = document.createDocumentFragment();
			
			// split text into characters
			var characters = text.split('');
			
			// create spans
			var span;
			
			var displayDelay;

			// use delay if present,
			// otherwise use duration if present,
			// otherwise provide default delay
			var delay = options.delay ? options.delay :
				options.duration ? options.duration/characters.length :
				0.05;

			// if no vendor prefix provided, set to blank
			options.prefix = options.prefix || '';
			
			for (i = 0; i < characters.length; i++) {
				span = document.createElement('span');
				span.innerHTML = characters[i];

				// using .toFixed(3) - no need to use greater precision than milliseconds
				displayDelay = (i*delay).toFixed(3)  + 's';

				span.style.setProperty(options.prefix + 'animation-delay', displayDelay);
				span.style.setProperty(options.prefix + 'animation-duration', 0);
				span.style.setProperty(options.prefix + 'animation-fill-mode', 'forwards');
				span.style.setProperty(options.prefix + 'animation-timing-function', 'steps(1)');
				
				fragment.appendChild(span);
			}
			
			destination.appendChild(fragment);
			
		} else {
			
			destination.innerHTML = text;
			
		}
		
		var parent = element.parentNode;
		parent.insertBefore(destination, element);
		parent.removeChild(element);
		
	}
	
	function prepare(elements, options) {

		// if elements is a single array, turn into array
		elements = elements.length ? elements : [elements];

		for (var i = 0; i < elements.length; i++) {
			prepareElement(elements[i], options || {});
		}

	}

	function type(element, options) {
		// wait 10 ms before typing - not exactly sure why i have to do this :(
		var promise = pinkySwear();

		options.animationend = options.animationend || 'animationend';
		options.prefix = options.prefix || '';

		setTimeout(function() {
			
			var children = element.children;

			for (i = 0; i < children.length; i++) {

				// add event listener on last child
				if (i === children.length - 1) {

					children[i].addEventListener(options.animationend, function(e) {
						if (e.animationName === 'typewriter') {
							promise(true);
						}
					});

				}

				// show child
				children[i].style.setProperty(options.prefix + 'animation-name', 'typewriter');

			}
		}, 10);
		
		return promise;
	}
	
	return {
		prepare: prepare,
		type: type
	};
	
})();