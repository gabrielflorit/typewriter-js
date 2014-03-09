// modified from http://davidwalsh.name/vendor-prefix
var vendorPrefix = (function() {
	var styles = window.getComputedStyle(document.documentElement, '');
	var pre = (Array.prototype.slice
		.call(styles)
		.join('') 
		.match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
    )[1];
	return  '-' + pre + '-';
})();