
const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.send("Node Server is running. Yay!!")
})

