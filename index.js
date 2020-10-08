// index.js

/**
 * Required External Modules
 */

const express = require("express");
const path = require("path");
const slackTasks = require("./routes/slackTasksList");
const amcslack = require("./routes/slackamc");
var bodyParser = require('body-parser');



/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "3000";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

/**
 *  App Configuration
 */

/**
 * Routes Definitions
 */

app.use(express.json()); //Used to parse JSON bodies

app.get("/", (req, res) => {
  res.status(200).send("WHATABYTE: Food For Devs");
});



app.use('/slackTasks', slackTasks);

app.use('/amcslack', amcslack);

app.use('/uploads', express.static('/data'))

/**
 * Server Activation
 */

 app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});