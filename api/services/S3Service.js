var cloudinary = require('cloudinary');

cloudinary.config({ 
  cloud_name: 'jesse-dirisu', 
  api_key: '872994525413396', 
  api_secret: 'ugk7i8bjN4CLIkxJXczmHDOqhA8' 
})

urlr = /^(http(s)?)?(:\/\/)?(www\.)?[\d\w]+\.[\d\w\D\W]+/

module.exports = {
	upload: function(bs4Str, title) {
		return new Promise(function(res, rej) {
			if (!bs4Str) {
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
	}
}