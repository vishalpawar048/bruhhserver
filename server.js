const express = require("express");
const app = express();
const port = 3001;
const router = require("./routes");
var cors = require('cors')
require("./model/db");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded());
app.use(cors())
app.use(bodyParser.json());
app.use("/", router);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = {
  app
};
