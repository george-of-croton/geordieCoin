const crypto = require('crypto')

module.exports = class Block {
  constructor( index, timestamp, data, previousHash ) {
    this.index = index
    this.timestamp = timestamp
    this.data = data
    this.previousHash = previousHash
    this.hash = this.hashBlock()
  }

    hashBlock () {
    var sha = crypto.createHash('sha256')
    sha.update(this.index.toString() +
               this.timestamp.toString() +
               this.data.toString() +
               this.previousHash.toString())
    return sha.digest()
  }
}
