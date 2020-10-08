var express = require('express')
var router = express.Router()
const axios = require('axios');
var bodyParser = require('body-parser');
var tokenMaker = require('basic-auth-token');


router.post('/', function (req, res) {
	console.log(req.body.payload.properties)
	 console.log(req.body)
	 console.log('Hello ' + process.env.slackurl)

	let sampledata = { payload: {
    attachment_url: '/uploads/scenario_session_attachment/attachment/62/attachment.jpg',
    mobile_capture_user_email: 'admin@example.com'
  }
}

payloadData = req.body
let myheader = req.headers.host
console.log(myheader);
	var data = JSON.stringify({"text": "https://" + myheader + sampledata.payload.attachment_url});
	var config = {
  		method: 'post',
  		url: process.env.slackurl,
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

