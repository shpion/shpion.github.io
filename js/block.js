class Block {

    constructor() {
        this.index = 0
        this.previousHash = ""
        this.hash = ""
        this.nonce = 1
        this.transactions = []
        this.difficulty = DIFFICULTY
        this.rate = RATE
        this.timestamp = 0
    }

    main(){

        this.getDifficulty()

        let timeStart = Date.now() / 1000

        this.nonce++;
        this.hash = this.generateHash()

        while (this.hash.substring(0, this.difficulty) != '0'.repeat(this.difficulty)) {
            this.nonce++;
            this.hash = this.generateHash()
        }

        this.rate = Date.now() / 1000 - timeStart
    }

    generateHash(){
        return sha3_256(this.nonce + JSON.stringify(this.transactions) + this.index + this.previousHash)
    }

    addTransaction(transaction) {
        this.transactions.push(transaction)
    }

    getDifficulty(){
        if(this.rate > RATE + 10)
            this.difficulty--
        else if(this.rate < RATE - 10)
            this.difficulty++
    }
}