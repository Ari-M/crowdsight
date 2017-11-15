var express = require('express');
var router = express.Router();
// Twilio Credentials
const accountSid = 'ACef781bfa27de25d1d9cee3fa9d48590d';
const authToken = 'a47d38c302690f6613068ebe30823de3';
// INSTALLING TWILLIO
var twilio = require('twilio');

router.get('/test', function(req, res, next) {
	var client = new twilio(accountSid, authToken);
	client.messages.create({
	    to: '+1 206-468-8087',
	    from: '+12064721649',
	    body: "What's up?"
  	})
  	.then((message) => console.log(message.sid));
  	res.status(200)
})



module.exports = router;