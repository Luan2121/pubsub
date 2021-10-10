import express, { Express } from 'express';
import * as http from 'http';
import next, { NextApiHandler } from 'next';
import * as socketio from 'socket.io';

import { Subscription } from '@google-cloud/pubsub';
import { pubSubClient } from '../src/pubSubClient';

const port: number = parseInt(process.env.PORT || '3000', 10);
const dev: boolean = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler: NextApiHandler = nextApp.getRequestHandler();

let messageCount = 0;

const messageHandler = (socket : socketio.Socket) => (message : any) => {
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

nextApp.prepare().then(async() => {
    const app: Express = express();
    const server: http.Server = http.createServer(app);
    const io: socketio.Server = new socketio.Server();
    io.attach(server);

    io.on('connection', (socket: socketio.Socket) => {
        console.log('connection');
        let subscription : Subscription;
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
    app.all('*', (req: any, res: any) => nextHandler(req, res));
    server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`);
    });
});