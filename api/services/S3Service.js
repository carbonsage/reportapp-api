var cloudinary = require('cloudinary');
var fs = require('fs');

cloudinary.config({ 
  cloud_name: 'jesse-dirisu', 
  api_key: '872994525413396', 
  api_secret: 'ugk7i8bjN4CLIkxJXczmHDOqhA8' 
})

urlr = /^(http(s)?)?(:\/\/)?(www\.)?[\d\w]+\.[\d\w\D\W]+/

module.exports = {
	upload: function(bs4Str, title, isVideo) {
		return new Promise(function(res, rej) {
			if (!bs4Str) {
				res('');
			} else {
				if (urlr.test(bs4Str)) {
					res(bs4Str)
				} else {
					if (!isVideo) {
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
					} else {
						res('');
						// var buf = Buffer.write(bs4Str, 'base64');
						// var stream = cloudinary.uploader.upload_stream(function(result) { console.log(result) }, {public_id: title,  format: 'mp4', resource_type: "video"});
						// var file_reader = fs.createReadStream('data:image/mp4;base64'+buf, {encoding: 'binary'}).on('data', stream.write).on('end', stream.end);
						// cloudinary.v2.uploader.upload_large('data:image/mp4;base64,'+bs4Str, 
					 //        {public_id: title,  format: 'mp4', resource_type: "video"},
					 //        function(error, result) { console.log(result); })
						 // cloudinary.v2.uploader.upload('data:image/jpeg;base64,'+buf, {public_id: title, format: 'jpg'}, function(err, result) {
						 // 	if (err) {
						 // 		console.log(err)
						 // 	} else {
						 // 		res(result.url)
						 // 		console.dir(buf)
						 // 		res('');
						 // 	}
						 // })
					}
				}
			}
		})
	}
}