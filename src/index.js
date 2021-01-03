const {publishMessage} = require('./util/publishModule');

const helloWorld = async () => {
  console.log('Posting greeting to pub sub');
  return publishMessage({
    greeting: 'Hello World!'
  }, {
    type: 'GreetingMessage'
  });
}

/**
 * Export functions that can be deployed as Google Cloud Functions.
 */
module.exports = {
  helloWorld
};
