
var cdump = require('./index.js')
var test = require('tape')

test('persist and restore', function (t) {
  cdump.put(new Buffer('hello worlds'), function (err, res) {
    if (err) return t.fail(err)
    t.equal(res, '7bc688fa88936e634d2493f0c3fdee78f55651e89d46700fb7a1aaab82e17c35')

    cdump.get(res, function (err, res) {
      if (err) return t.fail(err)
      t.equal(res, 'hello worlds')
      t.end()
    })
  })
})
