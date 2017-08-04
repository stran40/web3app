/*********************************************************************************
 * WEB322 – Assignment 07
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
 * of this assignment has been copied manually or electronically from any other source
 * (including 3rd party web sites) or distributed to other students.
 *
 * Name: Stephanie Tran Student ID: 132233162 Date: August 4th 2017
 *
 * Online (Heroku) Link:https://fierce-headland-81020.herokuapp.com/
 *
 ********************************************************************************/
const express = require("express");
const app = express();
const path = require("path");
const dataService = require("./data-service.js");
const dataServiceComments = require("./data-service-comments.js");
const fs = require("fs");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const clientSessions = require('client-sessions');
const dataServiceAuth = require('./data-service-auth.js');
const chalk = require("chalk");

const HTTP_PORT = process.env.PORT || 8080;

// call this function after the http server starts listening for requests
function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT + "\n");
}

//setup static folder
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));

// setup bodyParser middleware
// add custom Handlebars helper 'equal'
// set global defacult layout to layout.hbs
app.engine(".hbs", exphbs({
    extname: ".hbs",
    defaultLayout: 'layout',
    helpers: {
        equal: function (lvalue, rvalue, options) {
            if (arguments.length < 3)
                throw new Error("Handlebars Helper equal needs 2 parameters");
            if (lvalue != rvalue) {
                return options.inverse(this);
            } else {
                return options.fn(this);
            }
        }
    }
}));

app.set("view engine", ".hbs");

// Setup client-sessions
app.use(clientSessions({
    cookieName: "session", 
    secret: "week10example_web322", 
    duration: 2 * 60 * 1000, 
    activeDuration: 1000 * 60 //(1 minute)
}));

// custom middleware function to ensure templates will have access to "session" object
app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
});

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

app.get("/login", function (req, res) {
     try {
        res.render("login");
    } catch (rejectMsg) {
        console.log(chalk.yellow(rejectMsg + 'app.get("/login")'));
         res.status(404).send("Page Not Found!");
    };
});

app.get("/register", function (req, res) {
     try {
        res.render("register");
    } catch (rejectMsg) {
        console.log(chalk.yellow(rejectMsg + 'app.get("/register")'));
         res.status(404).send("Page Not Found!");
    };
});

app.post("/register", function (req, res) {
     try {
        dataServiceAuth.registerUser(req.body)
        .then(() => {
            res.render("register", {successMsg: "User created"});
        })
    } catch (err) {
        res.render("register", {errorMsg: err, user: req.body.user});
    };
});


// The login route that adds the user to the session
app.post("/login", (req, res) => {
    if (req.body.user === "" || req.body.password === "") {
        // Render 'missing credentials'
        return res.render("login", {
            errorMsg: "Missing credentials."
        });
    }
    
    try {
        dataServiceAuth.checkUser(req.body) 
        .then(() => {
            // Add the user on the session and redirect them to the dashboard page.
            req.session.user = {
                username: req.body.user
            };
            res.redirect("/employees");
        })
    } catch (rejectMsg){
        res.render("/login", {errorMsg: rejectMsg, user: req.body.user});
    }
});

function ensureLogin(req, res, next) {
    if (!req.session.user) {
        res.redirect("/login");
    } else {
        next();
    }
}
// An authenticated route that requires the user to be logged in.
app.get("/dashboard", ensureLogin, (req, res) => {
    res.render("dashboard", {
        user: req.session.user
    });
});
// Log a user out by destroying their session
// and redirecting them to /login
app.get("/logout", function (req, res) {
    req.session.reset();
    res.redirect("/login");
});

// setup a 'route' to listen on the default url path (http://localhost)
app.get("/", function (req, res) {
    try {
        res.redirect("/login");
    } catch (rejectMsg) {
        // catch any errors here
        console.log(rejectMsg);
    };
});

// setup another route to listen on /about
app.get("/about", function (req, res) {
    try {
        dataServiceComments.getAllComments().then((data) => {
            res.render("about", {
                data: data,
                title: "Employees"
            });
        });
    } catch (rejectMsg) {
        console.log(chalk.yellow(rejectMsg + "getAllComments did not work."));
        res.render("about");
    };
});

app.post("/about/addComment", function (req, res) {
    try {
        dataServiceComments.addComment(req.body).then(() => {
            res.redirect("/about")
        });
    } catch (rejectMsg) {
        // catch any errors here
        console.log(chalk.yellow(rejectMsg + "addComment did not work."));
        res.redirect("/about");
    };
});

app.post("/about/addReply", function (req, res) {
    try {
        dataServiceComments.addReply(req.body).then(() => {
            res.redirect("/about")
        });
    } catch (rejectMsg) {
        // catch any errors here
        console.log(chalk.yellow(rejectMsg + "addReply did not work."));
        res.redirect("/about");
    };
});



// setup route to listen on /employees
app.get("/employees", ensureLogin, (req, res) => {
    try {
        if (req.query.status) {
            dataService.getEmployeesByStatus(req.query.status).then((data) => {
                res.render("employeeList", {
                    data: data,
                    title: "Employees"
                });
            });
        } else if (req.query.manager) {
            dataService.getEmployeesByManager(req.query.manager).then((data) => {
                res.render("employeeList", {
                    data: data,
                    title: "Employees"
                });
            });
        } else if (req.query.department) {
            dataService.getEmployeesByDepartment(req.query.department).then((data) => {
                res.render("employeeList", {
                    data: data,
                    title: "Employees"
                });
            });
        } else {
            dataService.getAllEmployees().then((data) => {
                res.render("employeeList", {
                    data: data,
                    title: "Employees"
                });
            });
        }
    } catch (rejectMsg) {
        // if there is an error, send empty object for 'data
        res.render("employeeList", {
            data: {},
            title: "Employees"
        });
    };
});

// add employees route
app.get('/employees/add', ensureLogin, (req, res) => {
    try {
        dataService.getDepartments().then((data) => {
            console.log(chalk.yellow('getDepartments called.'));
            res.render("addEmployee", {
                departments: data
            });
        })
    } catch (rejectMsg) {
        res.render("addEmployee", {
            title: "Add Employee"
        });
    };
});

app.post("/employees/add", ensureLogin, (req, res) => {
    try {
        dataService.addEmployee(req.body).then(() => {
            res.redirect("/employees")
        });
    } catch (rejectMsg) {
        res.status(404).send("Could not add employee.");
    };
});

app.get("/employee/:empNum", ensureLogin, (req, res) => {
    // initialize an empty object to store the values
    let viewData = {};
    dataService.getEmployeeByNum(req.params.empNum)
        .then((data) => {
            viewData.data = data; //store employee data in the "viewData" object as "data"
        }).catch(() => {
            viewData.data = null; // set employee to null if there was an error
        }).then(dataService.getDepartments)
        .then((data) => {
            viewData.departments = data; // store department data in the "viewData" object as "departments"

            // loop through viewData.departments and once we have found the departmentId that matches
            // the employee's "department" value, add a "selected" property to the matching
            // viewData.departments object
            for (let i = 0; i < viewData.departments.length; i++) {
                if (viewData.departments[i].departmentId == viewData.data.department) {
                    viewData.departments[i].selected = true;
                }
            }
        }).catch(() => {
            console.log(chalk.red('departments set as empty array.'));
            viewData.departments = []; // set departments to empty if there was an error
        }).then(() => {
            if (viewData.data == null) { // if no employee - return an error
                res.status(404).send("Employee Not Found");
            } else {
                res.render("employee", {
                    viewData: viewData
                }); // render the "employee" view
            }
        });
});

app.post("/employee/update", ensureLogin, (req, res) => {
    try {
        dataService.updateEmployee(req.body).then(() => {
            res.redirect("/employees")
        });
    } catch (rejectMsg) {
        // catch any errors here
        console.log(rejectMsg);
    };
});

app.get("/employee/delete/:empNum", ensureLogin, (req, res) => {
    try {
        dataService.deleteEmployeeByNum(req.params.empNum).then(() => {
            res.redirect("/employees");
        })
    } catch (rejectMsg) {
        res.status(500).send("Unable to Remove Employee / Employee not found.");
    };
});

// setup route to listen on /managers
app.get("/managers", ensureLogin, (req, res) => {
    try {
        dataService.getManagers().then((data) => {
            res.render("employeeList", {
                data: data,
                title: "Employees (Managers)"
            });
        })
    } catch (rejectMsg) {
        res.render("employeeList", {
            data: {},
            title: "Employees (Managers)"
        });
    };
});

// setup route to listen on /departments
app.get("/departments", ensureLogin, (req, res) => {
    try {
        dataService.getDepartments().then((data) => {
            res.render("departmentList", {
                data: data,
                title: "Departments"
            });
        })
    } catch (rejectMsg) {
        res.render("departmentList", {
            data: {},
            title: "Departments"
        });
    };
});
// setup route to listen on /departments/add
app.get("/departments/add", ensureLogin, (req, res) => {
    try {
        res.render("addDepartment");
    } catch (rejectMsg) {
        res.render("addDepartment", {
            title: "Add Department"
        });
    };
});
app.post("/departments/add", ensureLogin, (req, res) => {
    try {
        dataService.addDepartment(req.body).then(() => {
            res.redirect("/departments")
        });
    } catch (rejectMsg) {
        // catch any errors here
        console.log(rejectMsg);
    };
});
app.post("/departments/update", ensureLogin, (req, res) => {
    try {
        dataService.updateDepartment(req.body).then(() => {
            res.redirect("/departments")
        });
    } catch (rejectMsg) {
        // catch any errors here
        console.log(rejectMsg);
    };
});
app.get("/department/:id", ensureLogin, (req, res) => {
    try {
        dataService.getDepartmentById(req.params.id).then((data) => {
            console.log(chalk.yellow('departmentID: ' + req.params.id));
            res.render("department", {
                data: data
            });
        })
    } catch (rejectMsg) {
        res.status(404).send("Department Not Found");
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
    .then(dataServiceComments.initialize)
    .then(dataServiceAuth.initialize)
    .then(() => {
        app.listen(HTTP_PORT, onHttpStart);
    })
    .catch((err) => {
        console.log("unable to start the server: " + err);
    });
