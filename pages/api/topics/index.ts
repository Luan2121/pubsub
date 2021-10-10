// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { pubSubClient } from '../../../src/pubSubClient';
import { Topic } from '@google-cloud/pubsub';

type TopicResponse = {
  name: string
};

type Data = {
  topics ?: TopicResponse[],
  name ?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if( req.method === 'GET' ){
    const [allTopics] = await pubSubClient.getTopics();
    res.status(200).json({ topics: allTopics.map( ( topic : Topic ) => ({ name: topic.name.split("/").reverse()?.[0] })) })
  }

  if( req.method === 'POST' ){
    const topicName = req.body.name;
    await pubSubClient.createTopic( topicName );
    res.status(201).json({ name: topicName });
  }

  res.status(404);
}
