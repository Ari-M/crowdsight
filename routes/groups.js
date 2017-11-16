var express = require('express');
var router = express.Router();
// Twilio Credentials
const accountSid = 'ACef781bfa27de25d1d9cee3fa9d48590d';
const authToken = 'a47d38c302690f6613068ebe30823de3';
// INSTALLING TWILLIO
var twilio = require('twilio');
//INSTALLING GOOGLE PHONE NUMBER FORMAT
var PNF = require('google-libphonenumber').PhoneNumberFormat;
var { User, Group } = require('../models/user')

router.get('/', function(req, res, next) {
	Group.find({ userId: req.params.user }, function(err, groups) {
        if (err) return console.log(err);
        res.send(groups)
    });
})

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

router.post('/create', function(req, res, next) {
	console.log(req.body)
	// THIS IS TO CLEAN UP THE ACTUAL ARRAY SO WE DON'T HAVE A LIST OF EMPTY CONTACTS THAT TAKE UP SPACE
	var actualContacts = []
	for (var i = 0; i < req.body.group.contacts.length; i++) {
		if(req.body.group.contacts[i].name != '') {
			actualContacts.push(req.body.group.contacts[i]);
		}
	}
	// NOW HERE IS WHEN WE ACTUALLY CREATE A GROUP
	Group.create({
        userId: req.body.user,
		name: req.body.group.title,
    	organizer: req.body.group.organizer,
    	location: req.body.group.location,
    	contacts: actualContacts
    }, function(err, user) {
        if (err) {
            res.send(err.message)
        } else {
        	res.status(200)
        }
    });
 res.status(200)

})



module.exports = router;