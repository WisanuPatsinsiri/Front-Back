const express = require("express");
const axios = require("axios");
var bodyParser = require("body-parser");
const path = require("path");
const app = express();

const base_url = "http:http://localhost:5500";

app.set("views",path.join(__dirname, "/public/views"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + "/public"));


//Show all Patient
app.get("/",)



app.listen(5500,() => {
  console.log('Server started on port 5500');
});