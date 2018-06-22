/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'USERS',
  attributes: {
  	name: {
  		type: 'string',
  		required: true
  	},
  	username: {
  		type: 'string',
  		unique: true,
  		required: true
  	},
  	city: {
  		type: 'string',
  		defaultsTo: 'City'
  	},
  	state: {
  		type: 'string',
  		defaultsTo: 'State'
  	},
  	country: {
  		type: 'string',
  		defaultsTo: 'Nigeria'
  	},
  	avatar: {
  		type: 'string',
  		defaultsTo: 'https://www.gravatar.com/avatar'
  	},
  	posts: {
  		collection: 'post',
  		via: 'author'
  	},
  	comments: {
  		collection: 'comments',
  		via: 'author'
  	},
  	email: {
  		type: 'string',
  		email: true
  	}
  }
};

