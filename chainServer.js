const express = require('express')
const app = express()
const fs = require('fs')
const bodyParser = require('body-parser')
const validateNewBlock = require('./validateNewBlock.js')
app.use(bodyParser.json())


app.get('/lastblock', function(req, res) {
  var chain = fs.readFileSync('./geordieChain.json')
  chain = JSON.parse(chain)
  lastBlock = chain[chain.length - 1]
  res.send(lastBlock)
})

app.get('/chain', function(req, res) {
  var chain = fs.readFileSync('./geordieChain.json')
  res.send(JSON.parse(chain))
})

app.post('/submitblock', function(req, res) {
    var chain = fs.readFileSync('./geordieChain.json')
    chain = JSON.parse(chain)
    var newBlock = req.body
    var lastBlock = chain[chain.length - 1]
    res.sendStatus(200)
    if(validateNewBlock(newBlock, lastBlock)) {
      chain.push(newBlock)
      fs.writeFile('./geordieChain.json', JSON.stringify(chain), function(err) {
        if(err) {console.log(err)}
    })
  }
})

app.listen(3001, function() {
  console.log('chainserver listening on port 3001')
})
