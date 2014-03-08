var typewriter = (function () {
	
	function prepareElement(element, options) {
		
		// grab the text (as long as it doesn't have (&), (<), or (>) - see https://developer.mozilla.org/en-US/docs/Web/API/Element.innerHTML)
		var text = element.innerHTML;
		
		var destination = document.createElement('p');
		destination.className = 'typewriter-active';
		
		if (Modernizr.csstransitions) {
			
			var fragment = document.createDocumentFragment();
			
			// split text into characters
			var characters = text.split('');
			
			// create spans
			var span;
			
			var opts = options || {};
			
			var delay;
			
			// use delay if present,
			if (options.delay) {
				delay = options.delay;
				// otherwise use duration if present,
			} else if (options.duration) {
				delay = options.duration/characters.length;
				// otherwise provide default delay
			} else {
				delay = 0.05;
			}
			
			for (i = 0; i < characters.length; i++) {
				span = document.createElement('span');
				span.innerHTML = characters[i];
				// TODO: add all the vendor prefixes
				// use .toFixed(3) - no need to use less than milliseconds
				span.style.setProperty('transition-delay', (i*delay).toFixed(3)  + 's');
				
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
		for (var i = 0; i < elements.length; i++) {
			prepareElement(elements[i], options || {});
		}
	}
	
	function type(element) {
		// wait 10 ms before typing - not exactly sure why i have to do this :(
		var promise = pinkySwear();

		setTimeout(function() {
			
			var children = element.children;
			for (i = 0; i < children.length; i++) {

				// add event listener on last child
				if (i === children.length - 1) {
					// TODO: add all the vendor prefixes
					children[i].addEventListener('transitionend', function(event) {
						promise(true);
					});
					
				}

				// show child
				children[i].className = 'show';

			}
		}, 10);
		
		return promise;
	}
	
	return {
		prepare: prepare,
		type: type
	};
	
})();