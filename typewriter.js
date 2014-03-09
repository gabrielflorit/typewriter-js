var typewriter = (function () {

	function prepareElement(element) {
		
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

			for (i = 0; i < characters.length; i++) {
				span = document.createElement('span');
				span.innerHTML = characters[i];
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
	
	function prepare(elements) {

		// if elements is a single array, turn into array
		elements = elements.length ? elements : [elements];

		for (var i = 0; i < elements.length; i++) {
			prepareElement(elements[i]);
		}

	}

	function type(element, options) {

		// wait 10 ms before typing - not exactly sure why i have to do this :(
		var promise = pinkySwear();

		var opts = {};
		opts.animationend = options.animationend || 'animationend';
		opts.prefix = options.prefix || '';

		setTimeout(function() {
			
			var children = element.children;
			var displayDelay;

			// use delay if present,
			// otherwise use duration if present,
			// otherwise provide default delay
			opts.delay = options.delay ? options.delay :
				options.duration ? options.duration/children.length :
				0.05;

			for (i = 0; i < children.length; i++) {

				// add event listener on last child
				if (i === children.length - 1) {

					children[i].addEventListener(options.animationend, function(e) {
						if (e.animationName === 'typewriter') {
							promise(true);
						}
					});

				}

				// using .toFixed(3) - no need to use greater precision than milliseconds
				displayDelay = (i*opts.delay).toFixed(3)  + 's';

				// animate
				children[i].style.setProperty(options.prefix + 'animation', 'typewriter 0 steps(1) ' + displayDelay + ' forwards');

			}
		}, 10);
		
		return promise;
	}
	
	return {
		prepare: prepare,
		type: type
	};
	
})();