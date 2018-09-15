// let chat = require('socket.io-client')('http://localhost:3001/chat?user_id=5b99f43150fd6337a440817d&client_id=5b99f43150fd6337a440817e');
const user_id_1 = ''
const user_id_2 = ''
const client_id_1 = ''
let chat = require('socket.io-client')('http://localhost:3001/?user_id=' + user_id_1 + '&client_id=' + client_id_1);
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', async function (line) {

    chat.emit('sendPrivateMessage', {
        receiverId: user_id_2,
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