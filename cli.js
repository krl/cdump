#! /usr/bin/env node
var cdump = require('./index.js')
var fs = require('fs')

if (!process.argv[2] ||
    !process.argv[3]) {
  console.log('usage\n  cdump get <hash>\n  cdump put <file>')
} else {
  var cmd = process.argv[2]

  if (cmd === 'put') {
    cdump.put(fs.readFileSync(process.argv[3]), function (err, res) {
      if (err) return console.error(err)
      console.log(res)
    })
  } else if (cmd === 'get') {
    cdump.get(process.argv[3], function (err, res) {
      if (err) return console.error(err)
      console.log(res)
    })
  } else {
    console.error('no such command')
  }
}
