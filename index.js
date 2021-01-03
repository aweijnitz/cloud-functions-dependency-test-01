const {PubSub} = require('@google-cloud/pubsub');

// Setup pub sub
const projectId = process.env.GOOGLE_CLOUD_PROJECT || 'GOOGLE_CLOUD_PROJECT_NOT_SET';
const topicName = process.env.PUBSUB_TOPIC || 'PUBSUB_TOPIC_NOT_SET';
const pubSubClient = new PubSub({projectId});


const publishMessage = async (msgObj, msgType) => {
  //const dataBuffer = Buffer.from(JSON.stringify(msgObj));
  try {
    const attributes = {
      type: msgType
    };
    const messageId = await pubSubClient.topic(topicName).publishJSON(msgObj, attributes); // https://googleapis.dev/nodejs/pubsub/latest/Topic.html#publishJSON
    console.log(`Message ${messageId} published.`);
  } catch (error) {
    console.error(`Received error while publishing: ${error.message}`);
    process.exitCode = 1;
  }
}



const helloWorld = async () => {
  console.log('Posting greeting to pub sub');
  return publishMessage({
    greeting: 'Hello World!'
  }, {
    type: 'GreetingMessage'
  });
}


// Multiple functions: https://stackoverflow.com/questions/52732672/how-to-deploy-multiple-functions-using-gcloud-command-line

/**
 * Export functions that can be deployed as Google Cloud Functions.
 */
module.exports = {
  helloWorld
};
