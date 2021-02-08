var socket = io.connect('http://localhost:3000');
socket.on('countUpdated', (count) => {
    console.log('Count has been updated', count)
})


document.querySelector('#increment').addEventListener('click', () => {
    console.log('Clicked')
    socket.emit('increment')
})