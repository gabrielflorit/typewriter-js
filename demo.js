var typewriter = require('./index.js');

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
