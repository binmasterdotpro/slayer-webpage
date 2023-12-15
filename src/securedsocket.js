const socket = io();

function secureSend(type, data) {
    const password = localStorage.getItem('password')
    if (password == null) return
    socket.emit('jsondat', JSON.stringify({type, data, password}))
}