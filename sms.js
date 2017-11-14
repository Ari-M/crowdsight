// Twilio Credentials
const accountSid = 'AC442993e6790604fe12b6221b05ea1b88';
const authToken = 'ef574afd0e8b5ab728673ac3309218dd';
// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);
client.messages
  .create({
    to: '+12064688087',
    from: '+15005550006',
    body: "This is a test to see if this will work but apparently it's not"
  })
  .then((message) => console.log(message.sid));