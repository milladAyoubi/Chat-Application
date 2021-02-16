const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')


//Connecting Server
const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000


//Joining static files (HTML,CSS,Client Side JS) from directory
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

let count = 0
const message = "Welcome To Unova Chat!"

//Runs On Socket.io Connection to server
io.on('connection', (socket) => {
    console.log('New WebSocket connection')
        //Sending event to client 
    socket.emit('welcomeMessage', message)
    socket.broadcast.emit('newUser', 'A New User Has Joined!')
        //Reciveing Increment from client side
    socket.on('increment', () => {
            count++
            socket.emit('countUpdated', count)



        })
        //Receiveing, Confirming and Displaying User messages sent from client
    socket.on('messageSent', (message, callback) => {
        const filter = new Filter()


        if (filter.isProfane(message))
            return io.emit('message', 'Hey No Swearing!')
        message = message + "\n"
        io.emit('message', message)
        callback('Received Message On Server')

    })


    socket.on('location', (coords) => {
        io.emit('leftUser', 'Location -> Lat: ' + coords.latitude + ' Long: ' + coords.latitude)
    })

    socket.on('disconnect', () => {
        io.emit('leftUser', 'A User Has Left!')
    })
})


server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})