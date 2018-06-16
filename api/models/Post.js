/**
 * Post.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'POSTS',
  attributes: {
  	title: {
  		type: 'string',
  		required: true,
  		size: 250
  	},
  	image: {
  		type: 'string',
      defaultsTo: 'https://4.bp.blogspot.com/-i_6lnKy8NU4/WCRylC1DQrI/AAAAAAAANnk/kTX9v5v32XMHuJ70c8Ms_e3cZo5T18gywCLcB/s1600/default-thumbnail.png'
  	},
    long: {
      type: 'float',
    },
    lat: {
      type: 'float',
    },
    loc: {
      type: 'string',
    },
  	body: {
  		type: 'text',
  		required: true
  	},
  	featured: {
  		type: 'boolean',
  		defaultsTo: false
  	},
  	author: {
  		model: 'user'
  	},
  	time: {
  		type: 'string',
  	},
  	comments: {
  		collection: 'comments',
  		via: 'post'
  	},
  	upvotes: {
  		type: 'integer',
  	},
  	downvotes: {
  		type: 'integer',
  	},
  }
};

