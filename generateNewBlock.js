var Block = require('./block.js')

module.exports = function nextBlock(lastBlock, data) {
  index = lastBlock.index + 1
  timestamp = lastBlock.timestamp
  data = data
  hash = lastBlock.hash
  return(new Block(index, timestamp, data, hash))
}
