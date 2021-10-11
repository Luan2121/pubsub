// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Topic } from '@google-cloud/pubsub';
import { pubSubClient } from '../../../../src/pubSubClient';

type Data = {
    message?: string
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if( req.method === 'POST' ){
    const { topic_name } = req.query;
    const [allTopics] = await pubSubClient.getTopics();
    let topicName = "";
    allTopics.forEach( ( t : Topic ) => {
        const currenTopicName = t.name.split("/").reverse()?.[0];
        if( currenTopicName === topic_name ){
            topicName = currenTopicName;
        }
    });
    if(topicName){
        const dataBuffer = Buffer.from(JSON.stringify(req.body));
        try {
            const messageId = await pubSubClient.topic(topicName).publish(dataBuffer);
            console.log(`Message ${messageId} published.`);
            res.status(201).send({
                message: "Publicacion creada correctamente"
            })
        } catch (error) {
            console.error(`Received error while publishing`);
        }
    }
  }     
  res.status(404);
}
