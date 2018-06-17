var AWS = require('aws-sdk')
AWS.config.update({ accessKeyId: 'AKIAIBWHV3PS557VKFOA', secretAccessKey: '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' });
var s3 = new AWS.S3()

module.exports = {
	uploadToS3: function(bs4Str, title) {
		// var buf = new Buffer(bs4Str, 'base64');
		console.log(buf);
		var params = {
			Bucket: 'reportapp-bucket',
		  	Key: `${title}.jpeg`,
		  	Body: bs4Str,
		  	// ContentEncoding: 'base64',
		  	// ContentType:  'image/jpeg',
		  	ACL: 'public-read'
		}
		return new Promise(function(res, rej) {
			s3.upload(params, (err, data) => {
			  if (err) {
			  	rej(err);
			  	console.log(err);
			  } else {
			  	console.dir(data.Location);
			  	res(data.Location);
			  }
			});
		})
	}
}