const socket = require('socket.io-client')('http://127.0.0.1:3001')
// const socket = io.connect
setTimeout(() => {

    console.log('test...');
    socket.on('connection', function () {
        console.log('connected...');

    });
}, 2000)