var express = require('express')
var router = express.Router()
const axios = require('axios');
var bodyParser = require('body-parser');
var tokenMaker = require('basic-auth-token');


router.post('/', function (req, res) {
	console.log(req.body.payload.properties)
	 console.log(req.body.payload)
	 console.log('Hello ' + process.env.slackurl)

	 
	var data = JSON.stringify({"text":"Hello, World!"});
	var config = {
  		method: 'post',
  		url: process.env.slackurl,
  		headers: { 
    		'Content-Type': 'application/json'
  		},
  		data : data
	};
console.log('Hello ' + process.env.NAME)

	axios(config).then(function (response) {
			res.send(req.body);
	}).catch(function (error) {
    console.log("Error:" + error);
    res.send(error);
  });

})



module.exports = router

