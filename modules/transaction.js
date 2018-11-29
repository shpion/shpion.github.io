let constants = require('./const');
let EC = require("elliptic").ec;
let ec = new EC('secp256k1');

class Transaction {

    constructor(from, to, amount) {
        this.from = from;
        this.to = to;
        this.amount = amount;

        this.generateSignature()
    }

    generateSignature(){
        let key = ec.genKeyPair();
        this.publicKey = key.getPublic().encode('hex');
        let data = this.from + this.to + this.amount;
        this.signature = key.sign(data.toString('hex'));
    }

    verifySignature(){
        let key = ec.keyFromPublic(this.publicKey, 'hex');
        let data = this.from + this.to + this.amount;
        return key.verify(data.toString('hex'), this.signature)
    }

    validate(){
        if(!this.verifySignature())
            return false;

        return true
    }
}

module.exports = Transaction;