let express = require('express')
let app = express()
let srv = app.listen(process.env.PORT || 9000)
app.use('/peerjs', require('peer').ExpressPeerServer(srv, {
    debug: true
}))