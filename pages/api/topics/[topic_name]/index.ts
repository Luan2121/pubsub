// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { pubSubClient } from '../../../../src/pubSubClient';
//import { Topic } from '@google-cloud/pubsub';

type TopicResponse = {
  name: string
};

type Data = {
    name?: string
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if( req.method === 'GET' ){
    const { topic_name } = req.query;
    const [allTopics] = await pubSubClient.getTopics();

    let topic = "";
    
    allTopics.forEach( t => {
        const currenTopicName = t.name.split("/").reverse()?.[0];
        if( currenTopicName === topic_name ){
            topic = currenTopicName;
        }
    })
    
    res.status(200).json({ 
        name: topic || "not found"
    })
  }     

  res.status(404);
}
