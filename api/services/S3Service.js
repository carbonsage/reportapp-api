var AWS = require('aws-sdk')
AWS.config.update({ accessKeyId: process.env.ACCESS_KEY_ID, secretAccessKey: process.env.SECRET_ACCESS_KEY });
var s3 = new AWS.S3()

module.exports = {
	uploadToS3: function(bs4Str, title) {
		return new Promise(function(res, rej) {
			var params = {
			  Bucket: 'reportapp-bucket',
			  Key: title,
			  Body: bs4Str,
			}
			s3.upload(params, (err, data) => {
			  if (err) {
			  	rej(err);
			  } else {
			  	res(data.Location)
			  }
			});
		})
	}
}