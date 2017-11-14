var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var { Twet } = require('../models/user');
var request = require('request');
var Twitter = require('twitter');
const TWITTER_CONSUMER_KEY = '0Dqvt2smAU9Hjk2oTQRMSQ8bl'
const TWITTER_CONSUMER_SECRET = '8YRoU3cFmGpFAmShInQ0AD6yzsGCk7DBwyR5uD7VORqGS7rvw2'
const ENC_SECRET = new Buffer(TWITTER_CONSUMER_KEY + ':' + TWITTER_CONSUMER_SECRET).toString('base64')
var BEARER_TOKEN;

// Twitter Hook Up
// var twitter = new Twitter({
// 	consumer_key: TWITTER_CONSUMER_KEY,
// 	consumer_secret: TWITTER_CONSUMER_SECRET,
// 	bearer_token: 
// });

router.post('/user', function(req, res, next) {
    Twet.find({ userId: req.body.user }, function(err, tweets){
		if (err) return console.log(err);
        res.send(tweets)
        console.log("req.body.user" + req.body.user)
    });
});

router.post('/', function(req, res, next) {
    Twet.create({
        userId: req.body.user.id,
        handle: req.body.handle
    }, function(err, user) {
        if (err) {
            res.send(err.message)
        } else {
            req.flash('success', 'Welcome to your new account! You are logged in.');
        }
    });
});

//gonna try to call twitter API
router.post('/find', function(req, res, next){
    Twet.find({_id: req.body.id}, function(err, tweets){
        if (err) return console.log(err);
        res.send(tweets)
        console.log("req.body.id" + req.body.id)
    })
})

module.exports = router;