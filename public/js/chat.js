const socket = io()


const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })
console.log(username, room)

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
let fullScript = ''

// Scroll Feature For Displayd Messages
const scroll = () => {

    const height = messageDisplay.offsetHeight

    const container = messageDisplay.scrollHeight


    messageDisplay.scrollTo(0, container)



    console.log(container)

}
socket.on('message', (send) => {
    fullScript = fullScript + '<br>' + send.user + ' - ' + moment(send.createdAt).format('h:mm A') + ' <br> ' + send.msg + '<br>'
    messageDisplay.innerHTML = fullScript
    const date = new Date()
    console.log(date.getHours() - 12 + ':' + date.getMinutes())
    scroll()
})

socket.on('locationMessage', (location) => {
    fullScript = fullScript + location.user + ' - ' + moment(location.createdAt).format('h:mm A') + '<br>' + location.location + '</a>' + '<br>'
    messageDisplay.innerHTML = fullScript
    console.log(location)
    scroll()
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

const messageForm = document.querySelector('#messageForm')
const messageFormButton = messageForm.querySelector('button')
const send = document.querySelector('#text')

socket.on('clearTextBox', () => {
    send.value = ''
})

document.querySelector('#messageForm').addEventListener('submit', (e) => {
    e.preventDefault()
    messageFormButton.setAttribute('disabled', 'disabled')
    messageFormButton.removeAttribute('disabled')



    if (send.value != '') {

        socket.emit('messageSent', send.value, (error) => {

            send.value = ''


            if (error)
                return console.log(error)

            console.log('Message Delivered')
        })
    }

})



//Sending Username and Room parameters 
socket.emit('join', { username, room }, (error) => {
    if (error) {
        alert(error)
        location.href = '/'
    }

})