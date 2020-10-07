var express = require('express')
var router = express.Router()
const axios = require('axios');
var bodyParser = require('body-parser');
var tokenMaker = require('basic-auth-token');


router.post('/', function (req, res) {
	console.log(req.body.payload.properties)
	 console.log(req.body.payload)

	 res.send(req.body);

})

module.exports = router

