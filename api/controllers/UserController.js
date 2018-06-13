/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	signUp: function(req, res) {
		User
		.create({
			name: req.param('name'),
			username: req.param('username')
		})
		.exec(function (err, user){
		  if (err) { 
		  	return res.negotiate(err); 
		  }
		  if (!user) {
		  	return res.negotiate('not found'); 
		  }
		  if (user) {
		  	return res.json(user);
		  }
		});
	},
	getUser: function(req, res) {
		User
		.findOne({
			id: req.param('id'),
		})
		.exec(function (err, user){
		  if (err) { 
		  	return res.negotiate(err); 
		  }
		  if (!user) {
		  	return res.negotiate('not found'); 
		  }
		  if (user) {
		  	return res.json(user);
		  }
		});
	}
};

