const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')
const { genMessage } = require('./utils/message')

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


    socket.emit('message', genMessage('Hola!'))
        //Reciveing Increment from client side
    socket.on('increment', () => {
            count++
            socket.emit('countUpdated', count)



        })
        //Receiveing, Confirming and Displaying User messages sent from client
    socket.on('messageSent', (message, callback) => {
        const filter = new Filter()


        if (filter.isProfane(message)) {

            io.emit('clearTextBox')
            return io.emit('message', genMessage('Hey No Swearing!'))
        }
        message = message + "\n"
        io.emit('message', genMessage(message))

        callback('Received Message On Server')

    })


    socket.on('location', (coords) => {
        io.emit('locationMessage', 'https://google.com/maps?q=' + coords.latitude + ',' + coords.longitude)

    })

    socket.on('disconnect', () => {
        io.emit('leftUser', 'A User Has Left!')
    })
})


server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})