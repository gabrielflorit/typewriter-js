var typewriter = (function () {

	function prepareElement(element) {
		
		// grab the text (as long as it doesn't have (&), (<), or (>) - see https://developer.mozilla.org/en-US/docs/Web/API/Element.innerHTML)
		var text = element.innerHTML;

		// split text into characters
		var characters = text.split('');

		var spans = '';

		for (var i = 0; i < characters.length; i++) {
			spans += '<span>' + characters[i] + '</span>';
		}

		element.innerHTML = spans;
	}
	
	function prepare(selector) {

		var elements = document.querySelectorAll(selector);

		for (var i = 0; i < elements.length; i++) {
			prepareElement(elements[i]);
		}
	}

	function type(selector, options) {

		// wait 10 ms before typing - not exactly sure why i have to do this :(
		var promise = pinkySwear();

		var opts = {};
		options = options || {};

		setTimeout(function() {

			var children = document.querySelectorAll(selector + ' span');

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

					// TODO: options.duration doesn't really work
					// atm it's limited by device refresh rate, e.g. 60
					// rewrite this to look at time delta since last call
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