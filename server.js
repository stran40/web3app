/*********************************************************************************
* WEB322 – Assignment 03
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: Stephanie Tran Student ID: 132233162 Date: June 8 2017
*
* Online (Heroku) Link:https://polar-eyrie-23988.herokuapp.com/
*
********************************************************************************/
var express = require("express");
var app = express();
var path 
= require("path");
var dataService = require("./data-service.js");
var fs = require("fs");

var HTTP_PORT = process.env.PORT || 8080;

// call this function after the http server starts listening for requests
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

//setup static folder
app.use(express.static("public")); 

// setup a 'route' to listen on the default url path (http://localhost)
app.get("/", function(req,res){
   res.sendFile(path.join(__dirname + "/views/home.html"));
});

// setup another route to listen on /about
app.get("/about", function(req,res){
  res.sendFile(path.join(__dirname + "/views/about.html"));
});

// setup route to listen on /employees
app.get("/employees", (req,res) => {
  if(req.query.status){
        res.json({message: req.query.status});
    }else if(req.query.manager){
        res.json({message: req.query.manager});
    }else if(req.query.department){
        res.json({message: req.query.department});
    }else{
        dataService.getMessage().then((dataMessage)=>{
            res.json({message: dataMessage});
        }).catch((errorMessage)=>{
            res.json({message: errorMessage});
        });
    }
});

app.get("/employee/:empNum", (req,res) => {
    res.json({message: req.params.empNum});
});

//Function to handle 404 requests to pages that are not found.
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

dataService.setMessage("Hello!").then(()=>{
    app.listen(HTTP_PORT);
});
// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart);
