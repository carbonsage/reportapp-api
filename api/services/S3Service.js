var cloudinary = require('cloudinary');
var fs = require('fs');
var base64_arraybuffer= require('base64-arraybuffer-converter');
var blober = require('blob-util');

cloudinary.config({ 
  cloud_name: 'jesse-dirisu', 
  api_key: '872994525413396', 
  api_secret: 'ugk7i8bjN4CLIkxJXczmHDOqhA8' 
})

urlr = /^(http(s)?)?(:\/\/)?(www\.)?[\d\w]+\.[\d\w\D\W]+/

module.exports = {
	upload: function(bs4Str, title) {
		title = title.split(" ").join('_');
		console.log('uploading picture');
		return new Promise(function(res, rej) {
			if (!bs4Str) {
				console.log('empty data');
				res('');
			} else {
				if (urlr.test(bs4Str)) {
					res(bs4Str)
				} else {
					cloudinary.v2.uploader.upload('data:image/jpeg;base64,'+bs4Str, {public_id: title, format: 'jpg'}, function(err, result) {
						if (err) {
							cloudinary.v2.uploader.upload('data:image/png;base64,'+bs4Str, {public_id: title, format: 'jpg'}, function(err, result) {
								if (err) {
									cloudinary.v2.uploader.upload('data:image/gif;base64,'+bs4Str, {public_id: title, format: 'jpg'}, function(err, result) {
										if (err) {
											cloudinary.v2.uploader.upload(bs4Str, {public_id: title, format: 'jpg'}, function(err, result) {
												if (err) {
													rej(err)
												}
												if (result) {
													res(result.url)
												}
											})
										}
										if (result) {
											res(result.url)
										}
									})
								}
								if (result) {
									res(result.url)
								}
							})
						}
						if (result) {
							res(result.url)
						}
					})
				}
			}
		})
	},
	uploadVideo: function(bs4Str, title) {
		console.log('uploading video');
		return new Promise((res, rej) => {
			if (!bs4Str) {
				console.log('empty data');
				res('');
			}
			cloudinary
			.v2
			.uploader
			.upload('data:video/mp4;base64,'+bs4Str,
				{timeout:12000000, public_id: title, format: 'mp4', resource_type: "video"},
				function(err, result) {
				 	if (err) {
				 		cloudinary.v2.uploader.upload('data:video/3gp;base64,'+bs4Str, 
				 			{timeout:12000000, public_id: title, format: 'mp4', resource_type: "video"}, function(err, result) {
						 	if (err) {
						 		console.dir(err)
						 		rej('');
						 	} else {
						 		console.dir(result)
						 		res(result.url)
						 	}
						 })
				 	} else {
				 		console.dir(result)
				 		res(result.url)
				 	}
				}
			)
		})

	},
	uploadAudio: function(bs4Str, title) {
		console.log('uploading audio');
		return new Promise((res, rej) => {
			if (!bs4Str) {
				console.log('empty data');
				res('');
			}
			cloudinary
			.v2
			.uploader
			.upload('audio/3gpp;base64,'+bs4Str,
				{timeout:12000000, public_id: title, format: 'mp3', resource_type: "video"},
				function(err, result) {
				 	if (err) {
				 		rej('');
				 	} else {
				 		console.dir(result)
				 		res(result.url)
				 	}
				}
			)
		})

	}
}


// else {
// var buf = base64_arraybuffer.base64_2_ab('data:video/mp4;base64,'+bs4Str);
// var buf = new Buffer(buf, 'binary');
// console.log(buf);
// // var buf = Buffer.write(bs4Str, 'binary');
// // var stream = cloudinary.uploader.upload_stream(function(result) { console.log(result) }, {public_id: title,  format: 'mp4', resource_type: "video"});
// // var file_reader = fs.createReadStream(buf | 'data:image/mp4;base64'+bs4Str, {encoding: 'binary'}).on('data', stream.write).on('end', stream.end);
// cloudinary.v2.uploader.upload_large(buf, 
// 	   {public_id: title,  format: 'mp4', resource_type: "video"},
// 	   function(error, result) { console.dir(result); })
// 	// console.log(`data:image/mp4;base64,${bs4Str}`);
// 	// var data = atob(`data:image/mp4;base64,${bs4Str}`);
	// cloudinary.uploader.upload_stream({timeout:120000, public_id: title, format: 'mp4', resource_type: "raw"}, function(error, result) {console.log(result)}).end(buf)

// }