var typewriter = (function () {

	function prepareElement(element) {
		
		// grab the text (as long as it doesn't have (&), (<), or (>) - see https://developer.mozilla.org/en-US/docs/Web/API/Element.innerHTML)
		var text = element.innerHTML;
		
		var destination = document.createElement('p');
		destination.className = 'typewriter-active';
		
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
		options = options || {};

		setTimeout(function() {
			
			var children = element.children;

			// use delay if present,
			// otherwise use duration if present,
			// otherwise provide default delay
			opts.delay = options.delay ? options.delay :
				options.duration ? options.duration/children.length :
				50;

			var i = 0;
			var rAF;

			function typeCharacter() {

				setTimeout(function() {

					rAF = requestAnimationFrame(typeCharacter);

					if (i < children.length) {

						children[i].className = 'show';

					} else {

						cancelAnimationFrame(rAF);
						promise(true);
					}

					i++;

				}, opts.delay);
			}

			typeCharacter();

		}, 10);
		
		return promise;
	}
	
	return {
		prepare: prepare,
		type: type
	};
	
})();