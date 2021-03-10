const express = require("express");
var fs = require('fs');
const app = express();
const port = 3001;
const router = require("./routes");
var cors = require('cors')
require("./model/db");
const bodyParser = require("body-parser");

var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('ssl/key.pem', 'utf8');
var certificate = fs.readFileSync('ssl/cert.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};
var httpsServer = https.createServer(credentials, app);

app.use(bodyParser.urlencoded());
app.use(cors())
app.use(bodyParser.json());
app.use("/", router);

httpsServer.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = {
  httpsServer
};
