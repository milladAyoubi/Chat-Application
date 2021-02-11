//Client Logs countUpdated Event From Server

const socket = io()

socket.on('countUpdated', (count) => {
    console.log('Count has been updated', count)
    display.innerHTML = 'Button Has Been Click ' + count
})

const userDisplay = document.querySelector('#userDisplay')
socket.on('newUser', (message) => {
    userDisplay.innerHTML = message
})

socket.on('leftUser', (message) => {
    userDisplay.innerHTML = message
    userDisplay.classList.add('.leave')

})

socket.on('welcomeMessage', (message) => {
    const title = document.querySelector('#title')
    title.innerHTML = message
})


const messageDisplay = document.querySelector('#messageDisplay')
socket.on('message', (send) => {
    messageDisplay.innerHTML = send
})


/*documnet.querySelector('#sendLocation').addEventListener('click', () => {
    if (!navigator.geolocation)
        return alert('Geolocation is not ')

})*/

/*const display = document.querySelector('#countDisplay')

//Button That Initiates Serverside and Client Side Exchange
document.querySelector('#increment').addEventListener('click', () => {
    console.log('Clicked')
        //Runs incremen ement')

})*/


document.querySelector('#messageForm').addEventListener('submit', (e) => {
    e.preventDefault()
    const send = document.querySelector('#text').value
    socket.emit('messageSent', send)

})