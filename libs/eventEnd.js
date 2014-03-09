// modified from http://davidwalsh.name/vendor-prefix
// pass in 'animation' or 'transition'
function whichEventEnd(name) {

	var t;
	var el = document.createElement('fakeelement');
	var Name = name[0].toUpperCase() + name.substr(1);
	var transitions = {};

	transitions[name] = name + 'end';
	transitions['O' + Name] = 'o' + Name + 'End';
	transitions['Moz' + Name] = name + 'end';
	transitions['Webkit' + Name] = 'webkit' + Name + 'End';

	for (t in transitions) {
		if (el.style[t] !== undefined) {
			return transitions[t];
		}
	}

}