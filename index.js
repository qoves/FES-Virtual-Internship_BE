const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 3030;
const url = process.env.URL;

//-------------------------Use Middleware--------------------------
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(cors());
require("./Route/Index")(app);
//-------------------------For the Database-------------------------
mongoose.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error) => {
    if (!error) console.log("Connect to Database");
    else console.log(error.message);
  }
);

app.listen(port, () => {
  console.log("Connect To Server");
});
