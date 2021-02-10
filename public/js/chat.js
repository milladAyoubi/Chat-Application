//Client Logs countUpdated Event From Server

const socket = io()

socket.on('countUpdated', (count) => {
    console.log('Count has been updated', count)
    display.innerHTML = 'Button Has Been Click ' + count
})


socket.on('welcomeMessage', (message) => {
    const title = document.querySelector('#title')
    title.innerHTML = message
})


const messageDisplay = document.querySelector('#messageDisplay')
socket.on('message', (send) => {
    messageDisplay.innerHTML = send
})




/*const display = document.querySelector('#countDisplay')

//Button That Initiates Serverside and Client Side Exchange
document.querySelector('#increment').addEventListener('click', () => {
    console.log('Clicked')
        //Runs increment event on serverSide
    socket.emit('increment')

})*/


document.querySelector('#messageForm').addEventListener('submit', (e) => {
    e.preventDefault()
    const send = document.querySelector('#text').value
    socket.emit('messageSent', send)

})