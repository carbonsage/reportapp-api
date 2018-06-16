var AWS = require('aws-sdk')
AWS.config.update({ accessKeyId: process.env.ACCESS_KEY_ID, secretAccessKey: process.env.SECRET_ACCESS_KEY });
var s3 = new AWS.S3()

module.exports = {
	uploadToS3: function(bs4Str) {
		var params = {
		  Bucket: 'reportapp-bucket',
		  Key: `avatar`,
		  Body: bs4Str,
		  ACL: 'public-read',
		  ContentEncoding: 'base64',
		}

		s3.upload(params, (err, data) => {
		  if (err) { return console.log(err) }
		  
		  // Continue if no error
		  // Save data.Location in your database
		  console.dir(data);
		});
	}
}