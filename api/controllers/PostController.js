/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
	postevents: function(req, res) {
		if (req.isSocket) {
			console.log('yippee');
			Post.subscribe(req, 'postadded');
			return res.ok()
		} else {
			return res.negotiate();
		}
	},
	createPost: function(req, res) {
		GeolocationService.getCoordLoc(req.param('lat'), req.param('long')).then(function(loc) {
			S3Service.upload(req.param('img') || '', `${req.param('title')}_${new Date().valueOf()}`)
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
					image: url || 'https://res.cloudinary.com/jesse-dirisu/image/upload/v1530355817/Logo.jpg',
					anonymous: req.param('anonymous'),
					from_twitter: req.param('from_twitter') || false,
					urls: req.param('urls'),
					featured: req.param('featured') || false
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
					image: req.param('img') || 'https://res.cloudinary.com/jesse-dirisu/image/upload/v1530355817/Logo.jpg',
					anonymous: req.param('anonymous'),
					from_twitter: req.param('from_twitter') || false,
					urls: req.param('urls'),
					featured: req.param('featured') || false
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
					  	Post.publishUpdate('postadded', post);
					  	return res.json(post);
					  }
					});
				  }
				});
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
	getRecPosts: function(req, res) {
		Post
		.find()
		.sort("createdAt DESC")
		.where({'createdAt': {'>': req.param('time')}})
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
	getTrendingPosts: function(req, res) {
		Post
		.find()
		.where({upvotes: {'>': 0}})
		.sort("upvotes DESC")
		.sort("createdAt DESC")
		.limit(10)
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
	getFeaturedPosts: function(req, res) {
		Post
		.find()
		.where({featured: true})
		.sort("createdAt DESC")
		.limit(5)
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

