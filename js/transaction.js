class Transaction {

    constructor(from, to, amount) {
        this.from = from
        this.to = to
        this.amount = amount
        // this.publicKey = publicKey
        // this.signature = this.genereteSignature(from + to + amount, )
    }

    generateSignature(){
        let EC = elliptic.ec;
        let ec = new EC('secp256k1');

        let key1 = ec.genKeyPair();
        console.log(key1)
    }
}