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
const express = require("express");
const app = express();
const path = require("path");
const dataService = require("./data-service.js");
const fs = require("fs");
const chalk = require("chalk");
var test = chalk.cyan;
var test2 = chalk.yellow;

const HTTP_PORT = process.env.PORT || 8080;

// call this function after the http server starts listening for requests
function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT + "\n");
}

//setup static folder
app.use(express.static("public"));

// setup a 'route' to listen on the default url path (http://localhost)
app.get("/", function (req, res) {
    try { 
        res.sendFile(path.join(__dirname + "/views/home.html"));
    }catch(rejectMsg) {
        // catch any errors here
        console.log(rejectMsg);
    };
});

// setup another route to listen on /about
app.get("/about", function (req, res) {
    try { 
        res.sendFile(path.join(__dirname + "/views/about.html"));
    }catch(rejectMsg) {
        // catch any errors here
        console.log(rejectMsg);
    };
});

// setup route to listen on /employees
app.get("/employees", (req, res) => {
    try { 
            res.sendFile(path.join(__dirname + "/public/css/site.css"));
        if (req.query.status) {
        dataService.getEmployeesByStatus(req.query.status).then((data)=>{
                res.json(data);
            }); 
        } else if (req.query.manager) {
            dataService.getEmployeesByManager(req.query.manager).then((data)=>{
                res.json(data);
            }); 
        } else if (req.query.department) {
            dataService.getEmployeesByDepartment(req.query.department).then((data)=>{
                res.json(data);
            }); 
        }  else {
            dataService.getAllEmployees().then((data) => {
                res.json(data);
                });
        }
    }catch(rejectMsg) {
        // catch any errors here
        console.log(rejectMsg);
    };
});

app.get('/employee/:id', function(req, res) {
    try {
         dataService.getEmployeeByNum(req.params.id).then((data)=>{
            res.json(data);
        })}catch(rejectMsg) {
        // catch any errors here
        console.log(rejectMsg);
    };
});

// setup route to listen on /managers
app.get("/managers", (req, res) => {
     try{dataService.getManagers().then((data)=>{
            res.json(data);
        })}catch(rejectMsg) {
        // catch any errors here
        console.log(rejectMsg);
    }; 
});

// setup route to listen on /departments
app.get("/departments", (req, res) => {
   try{dataService.getDepartments().then((data)=>{
            res.json(data);
        })}catch(rejectMsg) {
        // catch any errors here
        console.log(rejectMsg);
    };
});

app.get("/employee/:empNum", (req, res) => {
    try{res.json({
        message: req.params.empNum
    })}catch(rejectMsg) {
        // catch any errors here
        console.log(rejectMsg);
    };
});

//Function to handle 404 requests to pages that are not found.
app.use((req, res) => {
    res.status(404).send("Page Not Found!");
});

// put app.listen in function listen();
listen = () => { 
    return new Promise(function (resolve, reject) {
        app.listen(HTTP_PORT, onHttpStart);
        resolve;
    })
 };

dataService.initialize()
    .then(listen)
    .catch(function (rejectMsg) {
        // catch any errors here
        console.log(rejectMsg);
    });