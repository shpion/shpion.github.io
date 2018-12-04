let Block = require("./modules/block");
let Blockchain = require("./modules/blockchain");
let Transaction = require("./modules/transaction");

// window = global;
// window.BlobBuilder = require("blob");
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

let peer = new Peer('mainer_2', {
    host: '127.0.0.1',
    port: 9000,
    path: '/peerjs'
});

// console.log(peer)

// let conn = peer.connect("mainer_1");



// peer.on('connection', function(conn) {
//
// }





peer.on('connection', function(conn) {
    // console.log(conn);
    conn.on('data', function(data){
        // Will print 'hi!'
        console.log(data);
    });
});