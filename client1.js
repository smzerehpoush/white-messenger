// let chat = require('socket.io-client')('http://localhost:3001/chat?user_id=5b99f43150fd6337a440817d&client_id=5b99f43150fd6337a440817e');
let chat = require('socket.io-client')('http://localhost:3001/?user_id=5b99f43150fd6337a440817d&client_id=5b99f43150fd6337a440817e');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', async function (line) {

    chat.emit('sendPrivateMessage', {
        receiverId: '5b9b784739a1366cb5b8ab4d',
        text: await line
    })
})

chat.on('connect', function () {
    console.log('connected...');

});
chat.on('receivePrivateMessage',async function (data) {
    console.log('-: ',await data)
});
chat.on('disconnect', function () {});