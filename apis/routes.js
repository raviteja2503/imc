module.exports = function(app) {
	require('./users/users')(app);
	require('./event/event')(app);
	require('./post/post')(app);
	require('./comments/comments')(app);
};
