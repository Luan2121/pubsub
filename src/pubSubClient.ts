import { PubSub } from '@google-cloud/pubsub';

// Creates a client; cache this for further use
const pubSubClient = new PubSub();

export { pubSubClient };