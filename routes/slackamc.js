var express = require('express')
var router = express.Router()
const axios = require('axios');
var bodyParser = require('body-parser');
var tokenMaker = require('basic-auth-token');


router.post('/', function (req, res) {
	console.log(req.body.payload.properties)
	 console.log(req.body.payload)

	var data = JSON.stringify({"text":"Hello, World!"});
	var config = {
  		method: 'post',
  		url: 'https://hooks.slack.com/services/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',
  		headers: { 
    		'Content-Type': 'application/json'
  		},
  		data : data
	};


	axios(config).then(function (response) {
			res.send(req.body);
	}).catch(function (error) {
    console.log("Error:" + error);
    res.send(error);
  });

})



module.exports = router

