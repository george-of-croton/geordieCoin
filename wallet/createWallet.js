const crypto = require('crypto')

takeInput(process.argv[1])

function takeInput( input ) {

  console.log(input)
  if(input[0] !== "-") {

    var wallet =  new createWallet(input)
    var walletString = JSON.stringify(wallet)
    console.log(walletString)
    var encrypted = crypto.privateEncrypt(input, Buffer.from(walletString))
    var prvkey = wallet.privateKey
    fs.writeFile('./wallet' + Date.now(), JSON.stingify('wallet'), function(err) {
      if(err) {console.log(err)}
      else{
        hash(input)
      }
    })
  }
  if(input === '-h' || input === '-help') {
    process.stdout.write('Usage: node ./createWallet <password for wallet>\n your password will be used for decrypting the wallet to make transactions and checking the balance' )
  }
}

function createWallet(password) {
  this.dateCreated = Date.now().toString()
  this.address = hash(password)
  this.privateKey = (this.dateCreated + this.address + password)
  this.balance = 0
  this.transactions = []
}


function hash(input) {
  var sha = crypto.createHash('sha256')
      sha.update((input + Math.random()).toString())
      return sha.digest()
}
