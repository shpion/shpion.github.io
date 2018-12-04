// const express = require('express');
// const routes = express.Router();
//
// const app = express();
//
// const port = process.env.PORT || 3000;
//
// app.set('port', port);
//
// const listener = app.listen(port, function(){
//     console.log('Listening on port ' + listener.address().port);
// });
//
// app.get('/', (req, res, next) => {
//     res.send('uuguy')
// });

let Block = require("./modules/block")
let Blockchain = require("./modules/blockchain")
let Transaction = require("./modules/transaction")

// window = global;
// // window.BlobBuilder = require("blob");
// Blob = require("blob");
// location = { protocol: 'http' };
// BinaryPack = require("binary-pack");
// XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
//
// net = require('net');
// wrtc = require('wrtc');
// RTCPeerConnection = wrtc.RTCPeerConnection;
// RTCSessionDescription = wrtc.RTCSessionDescription;
// RTCIceCandidate = wrtc.RTCIceCandidate;
//
// WebSocket = require('ws');
// let Peer = require("peerjs");

const Peer = require('peerjs-nodejs');

let peer = new Peer({
    host: '127.0.0.1',
    port: 9000,
    path: '/peerjs'
})

peer.on('open', function(id) {
    console.log(peer.id);
});

// console.log(peer);

let conn = peer.connect("mainer_2");
conn.on('open', function(){
    conn.send('hi!');
});



// process.exit()
//
// // create first block
// let firstBlock = new Block()
// let blockchain = new Blockchain(firstBlock)
//
// // create a transaction
// let transactions = []
// transactions.push(new Transaction('User_1','User_2',30))
// transactions.push(new Transaction('User_2','User_3',10))
//
// let block = blockchain.getNextBlock(transactions)
// blockchain.addBlock(block)
//
// let anotherTransaction = new Transaction("User_2","User_4",5)
// let block1 = blockchain.getNextBlock([anotherTransaction])
// blockchain.addBlock(block1)
//
// let transaction = new Transaction("User_1","User_4",15)
// let block2 = blockchain.getNextBlock([transaction])
// blockchain.addBlock(block2)
//
// transaction = new Transaction("User_3","User_4",7)
// let block3 = blockchain.getNextBlock([transaction])
// blockchain.addBlock(block3)
//
// console.log(blockchain)
//
// if(blockchain.validateFullChain())
//     console.log("Blockchain valid")
// else
//     console.log("Blockchain compromised!")

