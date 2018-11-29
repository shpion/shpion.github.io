let Block = require("./block")

class Blockchain {

    constructor(block) {
        this.blocks = [];
        this.worldState = {};
        this.addBlock(block);
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

        let previousBlock = this.getPreviousBlock()
        block.index = this.blocks.length
        block.previousHash = previousBlock.hash
        block.rate = previousBlock.rate
        block.difficulty = previousBlock.difficulty

        for(let i = 0; i < transactions.length; i++){
            if(transactions[i].validate() && this.isEnoughOnBalance(transactions[i].from, transactions[i].amount)){
                this.changeState(transactions[i].from, transactions[i].amount, false);
                this.changeState(transactions[i].to, transactions[i].amount, true);
                block.addTransaction(transactions[i])
            }
        }

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

    getAmountFromState(address) {
        if (this.worldState[address] !== undefined)
            return this.worldState[address]

        return -1;
    }

    isEnoughOnBalance(address, value){
        let balance = this.getAmountFromState(address);

        if(balance >= 0 && balance - value < 0)
            return false

        if(balance < 0)
            this.createNewRecordInState(address,value);

        return true
    }

    createNewRecordInState(address, value){
        this.worldState[address] = value;
    }

    changeState(address, value, inc){
        let balance = this.getAmountFromState(address);

        if(balance < 0)
            this.createNewRecordInState(address,value);

        if(inc)
            balance = balance + value;
        else
            balance = balance - value;

        this.worldState[address] = balance;
    }
}

module.exports = Blockchain;