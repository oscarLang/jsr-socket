const express = require('express');
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

function randomString(l) {
   var result = '';
   var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charLen = alphabet.length;
   for ( var i = 0; i < l; i++ ) {
      result += alphabet.charAt(Math.floor(Math.random() * charLen));
   }
   return result;
}

io.origins(['https://oscarlang.me:443']);


io.on('connection', function (socket) {
    console.info("User connected");

    socket.on('chat message', function (message) {
        message.id = randomString(10);
        console.log(message);
        io.emit('chat message', message);
    });
    socket.on('user connected', function (info) {
        let status = "User " + info.user + " joined the chat!";
        console.log(status);
        info.text = status;
        info.user = "System";
        info.id = randomString(10);
        io.emit('user connected', info);
    });
});

server.listen(8300);
