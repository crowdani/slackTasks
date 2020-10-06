var express = require('express')
var router = express.Router()
const axios = require('axios');
var bodyParser = require('body-parser');
var tokenMaker = require('basic-auth-token');
const USERNAME = "deadmin"
const PASSWORD = "Sm3gh3ad"
const LOGINURL = 'https://159.8.183.152:9443/bpm/system/login'
const CREATIONURL = "https://159.8.183.152:9443/bpm/processes?"
const QUERYURL = "https://159.8.183.152:9443/bpm/processes"

const QuerySearchURL = "https://159.8.183.152:9443/rest/bpm/wle/v1/process/{instanceId}/taskSummary/"

//model=MortgageHoliday&container=LA&optional_parts=data'
var AUTHTOKEN = tokenMaker("cp4Admin","Sm3gh3ad")



// define the home page route
router.get('/', function (req, res) {
	var localQueryUrl = QUERYURL;
  	console.log(req.query)
  	
  	axios.post(LOGINURL, {},{ auth: {
    	username: USERNAME,
    	password: PASSWORD
  	}}).then(function (response) {
    

    // Get Process ID login
    processID = req.query.processID;
    
    console.log(response.data)
    
    token = response.data.csrf_token
    headers= {
      headers: {
        BPMCSRFToken: token
      },
      auth: {
        username: USERNAME,
        password: PASSWORD
      }
    }
    
    data = {};
    localQueryUrl = "https://159.8.183.152:9443/bpm/user-tasks?states=ready"
    //localQueryUrl = localQueryUrl + "/"+ processID + "?optional_parts=actions"
    //console.log(headers);
    console.log(localQueryUrl)
    
    axios.get(localQueryUrl,headers)
    .then(function (response) {
    	//FormatData
    	jsonPayload = response.data
    	console.log(jsonPayload.user_task_instances)
    	var myslackBlocks = {"type": "home"};
    	var i =0;
    	myslackBlocks.blocks = []
    	for(var x = 0; i < jsonPayload.user_task_instances.length; x++)
		{
    		//console.log("myWorkItem " + workItem)
    		myslackBlocks.blocks[i] = {
					"type": "section",
					"text": {
						"type": "mrkdwn",
						"text": jsonPayload.user_task_instances[x].name
					 }},
			myslackBlocks.blocks[i+1]= 	 
					 {
					"type": "divider"
					}
			myslackBlocks.blocks[i+2]= 	 
					 	{
							"type": "section",
							"text": {
								"type": "mrkdwn",
								"text": jsonPayload.user_task_instances[x].model
							},
							"accessory": {
								"type": "image",
								"image_url": "https://api.slack.com/img/blocks/bkb_template_images/plane.png",
								"alt_text": "plane"
							}
						}
			myslackBlocks.blocks[i+3]= 
						{
							"type": "actions",
							"elements": [
								{
									"type": "button",
									"text": {
										"type": "plain_text",
										"text": "View Details"
									},
									"value": "1803PD",
									"action_id": "Process task"
								}
							]
						}
    	i=i+4;
    	}	

     // console.log(response.data)
      res.send(myslackBlocks)
    }).catch(function (error) {
      console.log("Error:" + error);
      res.send(error);
    })
  }).catch(function (error) {
    console.log("Error:" + error);
    res.send(error);
  });
})


// define the about route
router.get('/about', function (req, res) {
  res.send('About birds')
})

module.exports = router