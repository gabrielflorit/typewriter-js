var typewriter = require('./index.js');

typewriter.prepare('.typewriter');

// typewriter.type('.typewriter');

// OR you could do the following, for greater control:
typewriter.type('.three')
.then(function() {
	return typewriter.untype('.two');
})
.then(function() {
	typewriter.type('.one');
});

