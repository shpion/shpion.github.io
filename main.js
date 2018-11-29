let Block = require("./modules/block")
let Blockchain = require("./modules/blockchain")
let Transaction = require("./modules/transaction")


// create first block
let firstBlock = new Block()
let blockchain = new Blockchain(firstBlock)

// create a transaction
let transactions = []
transactions.push(new Transaction('User_1','User_2',30))
transactions.push(new Transaction('User_2','User_3',10))

let block = blockchain.getNextBlock(transactions)
blockchain.addBlock(block)

let anotherTransaction = new Transaction("User_2","User_4",5)
let block1 = blockchain.getNextBlock([anotherTransaction])
blockchain.addBlock(block1)

let transaction = new Transaction("User_1","User_4",15)
let block2 = blockchain.getNextBlock([transaction])
blockchain.addBlock(block2)

transaction = new Transaction("User_3","User_4",7)
let block3 = blockchain.getNextBlock([transaction])
blockchain.addBlock(block3)

console.log(JSON.stringify(blockchain, null, 4))

if(blockchain.validateFullChain())
    console.log("Blockchain valid")
else
    console.log("Blockchain compromised!")