const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const clientPath = `${__dirname}/../client`;

app.use(express.static(clientPath));

const server = http.createServer(app);
const io = socketio(server);
const port = 8080;



const User = require('./User');

var clients = [];
var winner = null;

io.on('connection', function(sock) {
    const user = new User(sock.id);

    sock.emit("connected", user.id);

    clients.push(user);
    sock.emit('test', clients);
    sock.emit('message', 'Hi, you are connected');
    user.sayName();

    sock.on('win', () => {
        if(!winner) {
            winner = sock;
            sock.emit('win');
        }
        else {
            sock.emit('lose');
            winner = null;
        }
    });

    // sock.on('message', (text) => {
    //     io.emit('message', text);
    //     console.log(sock.id + " => " + text);
    // });

    sock.on('disconnect', function() {
        console.log(sock.id + " Has disconnected");
        // Find user with the 
        for(let i = 0; i < clients.length; i++) {
            if(clients[i].id == sock.id) {
                clients.splice(i, 1);
            }
        }
    });

    sock.on('testDisconnect', function(user) {
        sock.send('test');
        console.log(user);
    });

    function disconnectUser(id) {

    }
    
});


server.on('error', function(err){
    console.log("Server error:", err);
});

server.listen(8080, () => {
    console.log(`RPS Started on ${port}`);
    console.log(`Serving static from ${clientPath}`);
});


// This is a test commit to see if pushing works