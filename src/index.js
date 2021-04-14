const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')
const { genMessage, MessageLocation } = require('./utils/message')
const { addUsers, userRemove, getUser, getUsersRoom } = require('./utils/users')

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


    //Recieves paraments for Username and which Room user wants to join 
    socket.on('join', ({ username, room }, callback) => {
            const { error, user } = addUsers({ userID: socket.id, userName: username, chatRoom: room })

            if (error) {
                return callback(error)
            }


            socket.join(room)

            socket.emit('message', genMessage('Unova ', 'Welcome To The Chat!'))

            socket.broadcast.to(room).emit('message', genMessage('Unova ', user.userName + ' has Joined!'))
            callback()
        })
        //Receiveing, Confirming and Displaying User messages sent from client
    socket.on('messageSent', (message, callback) => {
        const user = getUser(socket.id)
        const filter = new Filter()


        if (filter.isProfane(message)) {

            io.emit('clearTextBox')
            return io.emit('message', genMessage('Unova', 'Hey No Swearing!'))
        }
        message = message + "\n"
        io.to(user.chatRoom).emit('message', genMessage(user.userName, message))

        callback('Received Message On Server')

    })


    socket.on('location', (coords) => {
        const user = getUser(socket.id)
        io.to(user.chatRoom).emit('locationMessage', MessageLocation(user.userName, 'https://google.com/maps?q=' + coords.latitude + ',' + coords.longitude))

    })

    socket.on('disconnect', () => {

        const userLeft = userRemove(socket.id)
        console.log(userLeft)
        if (userLeft)
            socket.broadcast.to(userLeft.chatRoom).emit('message', genMessage('Unova ', userLeft.userName + ' has left!'))
    })


})


server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})