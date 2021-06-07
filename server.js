const express = require("express");
var fs = require("fs");
const app = express();
const port = 3001;
const router = require("./routes");
var cors = require("cors");
require("./model/db");
const bodyParser = require("body-parser");

//Uncommente this line for production
var https = require("https");
var privateKey = fs.readFileSync("ssl/bruhh.in.key", "utf8");
var certificate = fs.readFileSync("ssl/bruhh.in.crt", "utf8");
var credentials = { key: privateKey, cert: certificate };
var httpsServer = https.createServer(credentials, app);

app.use(bodyParser.urlencoded());
app.use(cors());
app.use(bodyParser.json());
app.use("/", router);

//Uncommente this line for production
httpsServer.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);

// Uncomment this for local
// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });

module.exports = {
  app,
};
