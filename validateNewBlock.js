const crypto = require('crypto')
module.exports = function validateNewBlock(newBlock, previousBlock, callback) {
  var calchash = calculateHash(newBlock).toString()
  var blockhash = Buffer.from(newBlock.hash).toString()
  if(previousBlock.index + 1 !== newBlock.index) {
    console.log('invalid index', 'previousBlock: ' + previousBlock.index, "newBlock: " + newBlock.index)
    return false
  }
  else if(previousBlock.hash.toString() !== newBlock.previousHash.toString()) {
    console.log('invalid previousHash', "new hash: " + newBlock.previousHash.tp, "previousHash: " + previousBlock.hash.data )
    return false
  }

  else if( calchash !== blockhash) {
    console.log("invalid hash: "+ hash + " " + Buffer.from(newBlock.hash))
    return false
  }

  else {
      werk(newBlock, (data) => {
        callback(data)
      })
  }

}

function calculateHash(newBlock) {
  console.log(newBlock)
  var cry = crypto.createHash('sha256')
  cry.update(newBlock.index.toString() +
             newBlock.timestamp.toString() +
             newBlock.data.toString() +
             newBlock.previousHash.toString())
  return cry.digest()
}


function werk(newBlock, callback) {
  var nonce = Math.random().toString()
  var cry = crypto.createHash('sha256')
  console.log(nonce)
  cry.update(newBlock.index.toString() +
             newBlock.timestamp.toString() +
             newBlock.data.toString() +
             newBlock.previousHash.toString() +
             nonce)
              var hash = cry.digest()
              hash = hash.toString('hex')
  if(hash[0] === '0' && hash[1] === "0") {
    console.log('match')
    console.log(nonce, 'this is nonce')
     callback(nonce)
  }
  else {
    werk(newBlock, callback)
  }
}
