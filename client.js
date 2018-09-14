let socket = require('socket.io-client')('http://localhost:3001?user_id=5b99f43150fd6337a440817d&client_id=5b99f43150fd6337a440817e');
// let socket = require('socket.io-client')('http://localhost:3001?');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', function (line) {
    socket.emit('privateChat', line)
})

socket.on('connect', function () {
    console.log('connected...');

});
socket.on('privateChat', function (data) {
    console.log(data)
});
socket.on('disconnect', function () {});