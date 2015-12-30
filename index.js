var bs = require('fs-blob-store')
var B2 = require('blake2s')
var sink = require('stream-sink')

var blobs = bs((process.env.HOME || process.env.USERPROFILE) + '/.cdump')

var makePath = function (hash) {
  return hash.substr(0, 2) + '/' +
    hash.substr(2, 2) + '/' +
    hash
}

module.exports = {
  put: function (blob, cb) {
    var b2 = new B2()
    b2.update(blob)
    var hash = b2.digest('hex')
    var ws = blobs.createWriteStream({
      key: makePath(hash)
    })
    ws.write(blob)
    ws.end(function () {
      cb(null, hash)
    })
  },
  get: function (hash, cb) {
    var rs = this.stream(hash)
    rs.pipe(sink())
      .on('data', function (data) {
        cb(null, data)
      })
      .on('error', function (err) {
        cb(err)
      })
  },
  stream: function (hash) {
    return blobs.createReadStream({
      key: makePath(hash)
    })
  }
}
