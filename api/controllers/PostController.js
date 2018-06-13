/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	createPost: function(req, res) {
		Post
		.create({
			upvotes: 0,
			downvotes: 0,
			title: req.param('title'),
			body: req.param('body'),
			author: req.param('author'),
			time:  new Date().toUTCString().replace("GMT", "").trim()
		})
		.exec(function (err, post){
		  if (err) { 
		  	return res.negotiate(err); 
		  }
		  if (!post) {
		  	return res.negotiate(err); 
		  }
		  if (post) {
		  	return res.json(post);
		  }
		});
	},
	getPost: function(req, res) {
		Post
		.findOne({
			id: req.param('id'),
		})
		.populate('author')
		.exec(function (err, post){
		  if (err) { 
		  	return res.negotiate(err); 
		  }
		  if (!post) {
		  	return res.negotiate(); 
		  }
		  if (post) {
		  	return res.json(post);
		  }
		});
	},
	getPosts: function(req, res) {
		Post
		.find()
		.sort("createdAt DESC")
		.limit(50)
		.populate('author')
		.exec(function (err, post){
		  if (err) { 
		  	return res.negotiate(err); 
		  }
		  if (!post) {
		  	return res.negotiate(); 
		  }
		  if (post) {
		  	return res.json(post);
		  }
		});
	},
	upVote: function(req, res) {
		Post
		.findOne({
			id: req.param('id'),
		})
		.exec(function (err, post){
		  if (err) { 
		  	return res.negotiate(err); 
		  }
		  if (!post) {
		  	return res.negotiate(); 
		  }
		  if (post) {
		  	Post
		  	.update(req.param('id'), {upvotes: post.upvotes += 1 })
		  	.exec(function(err, updated){
		  	  if (err) {
		  	    return res.negotiate(err);
		  	  }
		  	  if (updated) {
		  	  	return res.json(updated);
		  	  }
		  	});
		  }
		});
	},
	downVote: function(req, res) {
		Post
		.findOne({
			id: req.param('id'),
		})
		.exec(function (err, post){
		  if (err) { 
		  	return res.negotiate(err); 
		  }
		  if (!post) {
		  	return res.negotiate(); 
		  }
		  if (post) {
		  	Post
		  	.update(req.param('id'), {downvotes: post.downvotes += 1 })
		  	.exec(function(err, updated){
		  	  if (err) {
		  	    return res.negotiate(err);
		  	  }
		  	  if (updated) {
		  	  	return res.json(updated);
		  	  }
		  	});
		  }
		});
	}	
};

