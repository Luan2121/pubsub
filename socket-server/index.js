const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const { PubSub } = require('@google-cloud/pubsub');
var cors = require('cors');
// Creates a client; cache this for further use
const pubSubClient = new PubSub({
    projectId: "gleaming-aegis-308101"
});


const port = parseInt(4000);
const dev = process.env.NODE_ENV !== 'production';
let messageCount = 0;

const messageHandler = (socket) => (message) => {
    console.log(`Received message ${message.id}:`);
    console.log(`\tData: ${message.data}`);
    console.log(`\tAttributes: ${message.attributes}`);
    messageCount += 1;
    console.log({ socket });
    try {
        const content = JSON.parse(message.data);
        socket.emit('message',content);
    }catch (err) {
        console.log(err);
    }
    // "Ack" (acknowledge receipt of) the message
    message.ack();
}

const app = express();
app.use( cors() );
const server = http.createServer(app);
const io = new socketio.Server();

io.attach(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    }
});

io.on('connection', (socket) => {
    console.log('connection');
    let subscription;
    socket.on('connect-pubsub', (data) => {
        console.log("Nodo se ha conectado a pubsub");
        //obtenemos una referencia al objeto de la subscripcion
        subscription = pubSubClient.subscription("Luis");
        //Cuando alguien se conecta al servidor de sockets se activa el handler de la subscription
        subscription.on("message", messageHandler(socket) ); 
    });
    socket.on('disconnect', () => {
        console.log("disconnected");
        console.log(subscription);
        if(subscription){
            subscription.removeListener('message', messageHandler(socket) );
        }
    })
});

app.all('*', (req,res) => {
    res.send("hello");
});

server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
});
