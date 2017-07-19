const crypto = require('crypto')
module.exports = function validateNewBlock(newBlock, previousBlock) {
  var calchash = calculateHash(newBlock).toString()
  var blockhash = Buffer.from(newBlock.hash).toString()
  if(previousBlock.index + 1 !== newBlock.index) {
    // console.log('invalid index', 'previousBlock: ' + previousBlock.index, "newBlock: " + newBlock.index)
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
  else if(werk(newBlock)) {
      return nonce
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


function werk(newBlock) {
  var nonce = Math.random().toString()
  var cry = crypto.createHash('sha256')
  cry.update(newBlock.index.toString() +
             newBlock.timestamp.toString() +
             newBlock.data.toString() +
             newBlock.previousHash.toString() +
             nonce)
              var hash = cry.digest()
              hash = hash.toString('hex')
              console.log(hash[0], hash[1])
  if(hash[0] === '0' && hash[1] === "0") {
    return nonce
  }
  else {
    werk(newBlock)
  }
}
