
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { pubSubClient } from '../../src/pubSubClient';


type Data = {
    message?: string,
    b?: any
};

const timeout = 60;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if( req.method === 'GET' ){
    const { subscriptionName } = req.query;
    
    if( !subscriptionName ){
      res.status(404).send({ message: "Debe incluir el nombre de la subscripcion" })
      return;
    }

    const subscription = pubSubClient.subscription(subscriptionName as string);

    // Create an event handler to handle messages
    let messageCount = 0;
    const messageHandler = (message : any) => {
        console.log(`Received message ${message.id}:`);
        console.log(`\tData: ${message.data}`);
        console.log(`\tAttributes: ${message.attributes}`);
        messageCount += 1;
        // "Ack" (acknowledge receipt of) the message
        message.ack();
    };

    // Listen for new messages until timeout is hit
    subscription.on('message', messageHandler);

    setTimeout(() => {
        subscription.removeListener('message', messageHandler);
        console.log(`${messageCount} message(s) received.`);
    }, timeout * 1000);

    res.status(200).send({ b: req.query })
  }     
  res.status(404);
}
