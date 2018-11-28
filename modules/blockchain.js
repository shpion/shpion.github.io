let Block = require("./block")

class Blockchain {

    constructor(block) {
        this.blocks = []
        this.addBlock(block)
    }

    addBlock(block) {

        if(this.blocks.length == 0) {
            block.previousHash = "0000000000000000"
            block.hash = block.generateHash()
            block.timestamp = Date.now()
            this.blocks.push(block)
        }
        else {

            if (this.isOrderValid(block)) {
                block.timestamp = Date.now()
                this.blocks.push(block)
            }
            else
                console.log("Bad Block!")
        }
    }

    getNextBlock(transactions) {

        let block = new Block()

        transactions.forEach(function(transaction){
            if(transaction.validate())
                block.addTransaction(transaction)
        })

        let previousBlock = this.getPreviousBlock()
        block.index = this.blocks.length
        block.previousHash = previousBlock.hash
        block.rate = previousBlock.rate
        block.difficulty = previousBlock.difficulty
        block.main()
        return block
    }

    getPreviousBlock() {
        return this.blocks[this.blocks.length - 1]
    }

    isOrderValid(block){
        let prevBlock = this.getPreviousBlock()
        if(block.previousHash == prevBlock.hash)
            return true

        return false
    }

    validateBlock(hash, index){
        if(hash != this.blocks[index].hash)
            return false

        if(hash != this.blocks[index].generateHash())
            return false

        return true
    }

    validateFullChain() {
        let blocks = this.blocks
        for(let i = 0; i < blocks.length - 1 ; i++){
            if(blocks[i].hash != blocks[i + 1].previousHash)
                return false
        }

        return true
    }
}

module.exports = Blockchain;