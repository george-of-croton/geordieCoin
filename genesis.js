var Block = require('./block.js')
var fs = require('fs')

function createGenesisBlock() {
  return (new Block(0, Date.now(), "On the first day...", "0"))
}

fs.writeFile('geordieChain.json', JSON.stringify([createGenesisBlock()]), (err, data) => {
  if(err) {console.log(err)}
  else {console.log("...and then there was light")}
} )
