/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var typewriter = __webpack_require__(1);

	typewriter.prepare('.typewriter');

	// typewriter.type('.typewriter');

	// OR you could do the following, for greater control:
	typewriter.type('.three', { showCursor: true })
	.then(function() {
		typewriter.untype('.two');
		return typewriter.untype('.three', { showCursor: true });
	})
	.then(function() {
		typewriter.type('.one', { showCursor: true });
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var AnimationFrame = __webpack_require__(2);
	AnimationFrame.shim();
	var elementClass = __webpack_require__(8);

	module.exports = {

		prepareElement: function(element) {

			// grab the text (as long as it doesn't have (&), (<), or (>) - see https://developer.mozilla.org/en-US/docs/Web/API/Element.innerHTML)
			var text = element.innerHTML;

			// split text into characters
			var characters = text.split('');

			var spans = '';

			for (var i = 0; i < characters.length; i++) {

				spans += '<span' + (characters[i] === ' ' ? ' class="whitespace"' : '') + '>' + characters[i] + '</span>';
			}

			element.innerHTML = spans;
		},

		prepare: function(selector) {

			var elements = document.querySelectorAll(selector);

			for (var i = 0; i < elements.length; i++) {
				this.prepareElement(elements[i]);
			}
		},

		toggleType: function(mode, selector, options) {

			return new Promise(function(resolve, reject) {

				var opts = {};
				options = options || {};

				// wait 10 ms before typing - not exactly sure why i have to do this :(
				setTimeout(function() {

					var children = document.querySelectorAll(selector + ' span');

					if (mode === "untype") {

						// reverse children
						children = Array.prototype.slice.call(children).reverse();

						// give 'show' class to all children immediately
						for (var j = 0; j < children.length; j++) {
							elementClass(children[j]).add('show');
						}

					}

					// use delay if present,
					// otherwise use duration if present,
					// otherwise provide default delay
					opts.delay = options.delay ? options.delay :
						options.duration ? options.duration / children.length :
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

								if (mode === "type") {
									elementClass(children[i]).add('show');
								} else {
									elementClass(children[i]).remove('show');
								}

								if (options.showCursor) {
									// remove current cursor class:
									var currentCursor = i + (mode === 'type' ? -1 : 0);
									if (currentCursor in children) {
										elementClass(children[currentCursor]).remove('cursor');
									}

									// appending new one:
									var target = i + (mode === 'type' ? 0 : 1);
									if (target in children) {
										elementClass(children[target]).add('cursor');
									}
								}

							} else {

								cancelAnimationFrame(rAF);
								resolve();

								if (options.showCursor) {
									// adding blink animation to the last element:
									elementClass(children[children.length - 1]).add('cursor-blink');
								}
							}

							i++;

						}, opts.delay);
					}

					typeCharacter();

				}, 10);

			});

		},

		type: function(selector, options) {

			return this.toggleType('type', selector, options);
		},

		untype: function(selector, options) {

			return this.toggleType('untype', selector, options);
		}
	};


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * An even better animation frame.
	 *
	 * @copyright Oleg Slobodskoi 2015
	 * @website https://github.com/kof/animationFrame
	 * @license MIT
	 */

	module.exports = __webpack_require__(3)


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var nativeImpl = __webpack_require__(4)
	var now = __webpack_require__(5)
	var performance = __webpack_require__(6)

	// Weird native implementation doesn't work if context is defined.
	var nativeRequest = nativeImpl.request
	var nativeCancel = nativeImpl.cancel

	/**
	 * Animation frame constructor.
	 *
	 * Options:
	 *   - `useNative` use the native animation frame if possible, defaults to true
	 *   - `frameRate` pass a custom frame rate
	 *
	 * @param {Object|Number} options
	 */
	function AnimationFrame(options) {
	    if (!(this instanceof AnimationFrame)) return new AnimationFrame(options)
	    options || (options = {})

	    // Its a frame rate.
	    if (typeof options == 'number') options = {frameRate: options}
	    options.useNative != null || (options.useNative = true)
	    this.options = options
	    this.frameRate = options.frameRate || AnimationFrame.FRAME_RATE
	    this._frameLength = 1000 / this.frameRate
	    this._isCustomFrameRate = this.frameRate !== AnimationFrame.FRAME_RATE
	    this._timeoutId = null
	    this._callbacks = {}
	    this._lastTickTime = 0
	    this._tickCounter = 0
	}

	module.exports = AnimationFrame

	/**
	 * Default frame rate used for shim implementation. Native implementation
	 * will use the screen frame rate, but js have no way to detect it.
	 *
	 * If you know your target device, define it manually.
	 *
	 * @type {Number}
	 * @api public
	 */
	AnimationFrame.FRAME_RATE = 60

	/**
	 * Replace the globally defined implementation or define it globally.
	 *
	 * @param {Object|Number} [options]
	 * @api public
	 */
	AnimationFrame.shim = function(options) {
	    var animationFrame = new AnimationFrame(options)

	    window.requestAnimationFrame = function(callback) {
	        return animationFrame.request(callback)
	    }
	    window.cancelAnimationFrame = function(id) {
	        return animationFrame.cancel(id)
	    }

	    return animationFrame
	}

	/**
	 * Request animation frame.
	 * We will use the native RAF as soon as we know it does works.
	 *
	 * @param {Function} callback
	 * @return {Number} timeout id or requested animation frame id
	 * @api public
	 */
	AnimationFrame.prototype.request = function(callback) {
	    var self = this

	    // Alawys inc counter to ensure it never has a conflict with the native counter.
	    // After the feature test phase we don't know exactly which implementation has been used.
	    // Therefore on #cancel we do it for both.
	    ++this._tickCounter

	    if (nativeImpl.supported && this.options.useNative && !this._isCustomFrameRate) {
	        return nativeRequest(callback)
	    }

	    if (!callback) throw new TypeError('Not enough arguments')

	    if (this._timeoutId == null) {
	        // Much faster than Math.max
	        // http://jsperf.com/math-max-vs-comparison/3
	        // http://jsperf.com/date-now-vs-date-gettime/11
	        var delay = this._frameLength + this._lastTickTime - now()
	        if (delay < 0) delay = 0

	        this._timeoutId = setTimeout(function() {
	            self._lastTickTime = now()
	            self._timeoutId = null
	            ++self._tickCounter
	            var callbacks = self._callbacks
	            self._callbacks = {}
	            for (var id in callbacks) {
	                if (callbacks[id]) {
	                    if (nativeImpl.supported && self.options.useNative) {
	                        nativeRequest(callbacks[id])
	                    } else {
	                        callbacks[id](performance.now())
	                    }
	                }
	            }
	        }, delay)
	    }

	    this._callbacks[this._tickCounter] = callback

	    return this._tickCounter
	}

	/**
	 * Cancel animation frame.
	 *
	 * @param {Number} timeout id or requested animation frame id
	 *
	 * @api public
	 */
	AnimationFrame.prototype.cancel = function(id) {
	    if (nativeImpl.supported && this.options.useNative) nativeCancel(id)
	    delete this._callbacks[id]
	}


/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict'

	var global = window

	// Test if we are within a foreign domain. Use raf from the top if possible.
	try {
	    // Accessing .name will throw SecurityError within a foreign domain.
	    global.top.name
	    global = global.top
	} catch(e) {}

	exports.request = global.requestAnimationFrame
	exports.cancel = global.cancelAnimationFrame || global.cancelRequestAnimationFrame
	exports.supported = false

	var vendors = ['Webkit', 'Moz', 'ms', 'O']

	// Grab the native implementation.
	for (var i = 0; i < vendors.length && !exports.request; i++) {
	    exports.request = global[vendors[i] + 'RequestAnimationFrame']
	    exports.cancel = global[vendors[i] + 'CancelAnimationFrame'] ||
	        global[vendors[i] + 'CancelRequestAnimationFrame']
	}

	// Test if native implementation works.
	// There are some issues on ios6
	// http://shitwebkitdoes.tumblr.com/post/47186945856/native-requestanimationframe-broken-on-ios-6
	// https://gist.github.com/KrofDrakula/5318048

	if (exports.request) {
	    exports.request.call(null, function() {
	        exports.supported = true
	    });
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict'

	/**
	 * Crossplatform Date.now()
	 *
	 * @return {Number} time in ms
	 * @api private
	 */
	module.exports = Date.now || function() {
	    return (new Date).getTime()
	}


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var now = __webpack_require__(5)
	var PerformanceTiming = __webpack_require__(7)

	/**
	 * Crossplatform performance.now()
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/API/Performance.now()
	 *
	 * @return {Number} relative time in ms
	 * @api public
	 */
	exports.now = function () {
	    if (window.performance && window.performance.now) return window.performance.now()
	    return now() - PerformanceTiming.navigationStart
	}



/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var now = __webpack_require__(5)

	/**
	 * Replacement for PerformanceTiming.navigationStart for the case when
	 * performance.now is not implemented.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming.navigationStart
	 *
	 * @type {Number}
	 * @api private
	 */
	exports.navigationStart = now()


/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = function(opts) {
	  return new ElementClass(opts)
	}

	function indexOf(arr, prop) {
	  if (arr.indexOf) return arr.indexOf(prop)
	  for (var i = 0, len = arr.length; i < len; i++)
	    if (arr[i] === prop) return i
	  return -1
	}

	function ElementClass(opts) {
	  if (!(this instanceof ElementClass)) return new ElementClass(opts)
	  var self = this
	  if (!opts) opts = {}

	  // similar doing instanceof HTMLElement but works in IE8
	  if (opts.nodeType) opts = {el: opts}

	  this.opts = opts
	  this.el = opts.el || document.body
	  if (typeof this.el !== 'object') this.el = document.querySelector(this.el)
	}

	ElementClass.prototype.add = function(className) {
	  var el = this.el
	  if (!el) return
	  if (el.className === "") return el.className = className
	  var classes = el.className.split(' ')
	  if (indexOf(classes, className) > -1) return classes
	  classes.push(className)
	  el.className = classes.join(' ')
	  return classes
	}

	ElementClass.prototype.remove = function(className) {
	  var el = this.el
	  if (!el) return
	  if (el.className === "") return
	  var classes = el.className.split(' ')
	  var idx = indexOf(classes, className)
	  if (idx > -1) classes.splice(idx, 1)
	  el.className = classes.join(' ')
	  return classes
	}

	ElementClass.prototype.has = function(className) {
	  var el = this.el
	  if (!el) return
	  var classes = el.className.split(' ')
	  return indexOf(classes, className) > -1
	}

	ElementClass.prototype.toggle = function(className) {
	  var el = this.el
	  if (!el) return
	  if (this.has(className)) this.remove(className)
	  else this.add(className)
	}


/***/ }
/******/ ]);