//Client Logs countUpdated Event From Server

const socket = io()


//Elements 

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


document.querySelector('#sendLocation').addEventListener('click', () => {
    if (!navigator.geolocation)
        return alert('Geolocation is not Supported')

    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position)
        socket.emit('location', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    })

})

/*const display = document.querySelector('#countDisplay')

//Button That Initiates Serverside and Client Side Exchange
document.querySelector('#increment').addEventListener('click', () => {
    console.log('Clicked')
        //Runs incremen ement')

})*/

const messageForm = document.querySelector('#messageForm')
const messageFormButton = messageForm.querySelector('button')

document.querySelector('#messageForm').addEventListener('submit', (e) => {
    e.preventDefault()
    messageFormButton.setAttribute('disabled', 'disabled')
    messageFormButton.removeAttribute('disabled')
    const send = document.querySelector('#text')


    if (send.value != '') {

        socket.emit('messageSent', send.value, (error) => {

            send.value = ''


            if (error)
                return console.log(error)

            console.log('Message Delivered')
        })
    }

})