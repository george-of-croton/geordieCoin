var generateNewBlock = require('./generateNewBlock.js')
var request = require('request')
var fs = require('fs')
var lastblockurl = 'http://localhost:3001/lastblock'
var postblock = 'http://localhost:3001/submitblock'


request.get(lastblockurl, function(req, res, body) {
  console.log(body)
  const lastBlock = JSON.parse(body)
  const newBlock = generateNewBlock(lastBlock, "this is the second block")
  request({method: 'POST', url: postblock, json: newBlock}, function(req, res, body) {
    if(res.statusCode === 200) {
      fs.writeFile('./mywallet.json', JSON.stringify(newBlock), function(err) {
        if(err) {console.log(err)}
      } )
    }
  })
})
