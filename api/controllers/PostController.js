/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	createPost: function(req, res) {
		GeolocationService.getCoordLoc(req.param('lat'), req.param('long')).then(function(loc) {
			S3Service.uploadToS3(req.param('img'), `${req.param('title')}_${new Date().valueOf()}`)
			.then(function(url) {
				Post.create({
					upvotes: 0,
					downvotes: 0,
					title: req.param('title'),
					body: req.param('body'),
					author: req.param('author'),
					time:  new Date().toUTCString().replace("GMT", "").trim(),
					loc: loc,
					lat: req.param('lat') || 0,
					long: req.param('long') || 0,
					image: url
				})
				.exec(function (err, post){
				  if (err) { 
				  	return res.negotiate(err); 
				  }
				  if (!post) {
				  	return res.negotiate(err); 
				  }
				  if (post) {
				  	Post
					.findOne({
						id: post.id,
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
				  }
				});
			}).catch(function(err) {
				return res.negotiate(err);
			})
		})
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
		.exec(function (err, posts){
		  if (err) { 
		  	return res.negotiate(err); 
		  }
		  if (!posts) {
		  	return res.negotiate(); 
		  }
		  if (posts) {
		  	return res.json(posts);
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

