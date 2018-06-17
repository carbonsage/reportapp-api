/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	createPost: function(req, res) {
		var img = "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"
		GeolocationService.getCoordLoc(req.param('lat'), req.param('long')).then(function(loc) {
			// S3Service.uploadToS3(req.param('img'), `${req.param('title')}_${new Date().valueOf()}`)
			// .then(function(url) {
			// 	Post.create({
			// 		upvotes: 0,
			// 		downvotes: 0,
			// 		title: req.param('title'),
			// 		body: req.param('body'),
			// 		author: req.param('author'),
			// 		time:  new Date().toUTCString().replace("GMT", "").trim(),
			// 		loc: loc,
			// 		lat: req.param('lat') || 0,
			// 		long: req.param('long') || 0,
			// 		image: url
			// 	})
			// 	.exec(function (err, post){
			// 	  if (err) { 
			// 	  	return res.negotiate(err); 
			// 	  }
			// 	  if (!post) {
			// 	  	return res.negotiate(err); 
			// 	  }
			// 	  if (post) {
			// 	  	Post
			// 		.findOne({
			// 			id: post.id,
			// 		})
			// 		.populate('author')
			// 		.exec(function (err, post){
			// 		  if (err) { 
			// 		  	return res.negotiate(err); 
			// 		  }
			// 		  if (!post) {
			// 		  	return res.negotiate(); 
			// 		  }
			// 		  if (post) {
			// 		  	return res.json(post);
			// 		  }
			// 		});
			// 	  }
			// 	});
			// }).catch(function(err) {
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
					image: req.param('img') || img
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
			// })
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

