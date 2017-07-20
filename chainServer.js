const express = require('express')
const app = express()
const fs = require('fs')
const bodyParser = require('body-parser')
const validateNewBlock = require('./validateNewBlock.js')
const request = require('request')
const crypto = require('crypto')
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

app.post('/notify', function(req, res) {
  console.log('notified by peer')
	fs.readFile('./geordieChain.json', function(err, data) {
		if (err) {
			console.log(err)
			res.sendStatus(404)
		} else {
			if (hashCompare(data, req.body)) {
				res.sendStatus(200)
				console.log('local chain up to date')
			} else {
				getLatestChain()
			}
		}
	})
})

app.post('/submitblock', function(req, res) {
	var chain = fs.readFileSync('./geordieChain.json')
	chain = JSON.parse(chain)
	var newBlock = req.body
	var lastBlock = chain[chain.length - 1]
	res.sendStatus(200)
  validateNewBlock(newBlock, lastBlock, (data) => {
    console.log(data, "data in server callback")
    if (data) {
      chain.push(newBlock)
      fs.writeFile('./geordieChain.json', JSON.stringify(chain), function(err) {
        if (err) {
          console.log(err)
        } else {
          console.log('new block added', chain)
          notify(chain)
        }
      })
    }
  })
})

app.listen(3001, function() {
	console.log('chainserver listening on port 3001')
	getLatestChain()
})


function hashCompare(localChain, foreignChain) {
	sha = crypto.createHash('sha256')
	sha.update(localChain.toString())
	currentHash = sha.digest()
	sha = crypto.createHash('sha256')
	sha.update(foreignChain.toString())
	masterHash = sha.digest()
	if (masterHash.toString() === currentHash.toString()) {
		return true
	} else {
		return false
	}
}

function notify(chain) {
  console.log(chain)
	request({
		method: 'POST',
		url: 'http://localhost:3002/notify',
		json: chain
	}, function(req, res, body) {
		if (res && res.statusCode === 200) {
			console.log('chain successfully received by peer')
		} else if (res && res.statusCode === 404) {
			console.log('peer failed to reconcile chain with their local copy')
		}
	})
}

function getLatestChain() {
  request.get('http://localhost:3002/chain', function(req, res, body) {
    console.log('requested')
    fs.readFile('./geordieChain.json', (err, data) => {
      if(err) {
        fs.writeFileSync('./geordieChain.json', res.body)
        console.log('master chain gathered from peer node')
      }
      else {
        if(res && hashCompare(data, res.body)) {
          console.log("local chain up to date")
        } else if(res){
           parsedBody = JSON.parse(res.body)
           if(parsedBody.length > JSON.parse(data).length) {
             fs.writeFile('./geordieChain.json', res.body, (err) => {
               if(err){console.log(err)}
               else {
                 console.log('successfully updated local chain')
               }
             })
           }
           else {
             console.log('peer chain shorter than local. local chain takes precedence')
           }
        }
        else {console.log("no peers accessible. local chain may be invalid")}
      }
    })
  })
}
