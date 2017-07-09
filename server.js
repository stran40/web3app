/*********************************************************************************
 * WEB322 – Assignment 05
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
 * of this assignment has been copied manually or electronically from any other source
 * (including 3rd party web sites) or distributed to other students.
 *
 * Name: Stephanie Tran Student ID: 132233162 Date: July 9 2017
 *
 * Online (Heroku) Link:https://git.heroku.com/web322-app-postgres.git
 *
 ********************************************************************************/
const express = require("express");
const app = express();
const path = require("path");
const dataService = require("./data-service.js");
const fs = require("fs");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

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
// handle .hbs extensions 
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

// setup a 'route' to listen on the default url path (http://localhost)
app.get("/", function (req, res) {
    try {
        res.render("home");
    } catch (rejectMsg) {
        // catch any errors here
        console.log(rejectMsg);
    };
});

// setup another route to listen on /about
app.get("/about", function (req, res) {
    try {
        res.render("about");
    } catch (rejectMsg) {
        // catch any errors here
        console.log(rejectMsg);
    };
});

// setup route to listen on /employees
app.get("/employees", (req, res) => {
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
app.get('/employees/add', function (req, res) {
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

app.post("/employees/add", (req, res) => {
    try {
        dataService.addEmployee(req.body).then(() => {
            res.redirect("/employees")
        });
    } catch (rejectMsg) {
        res.status(404).send("Could not add employee.");
    };
});

app.get("/employee/:empNum", (req, res) => {
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
                console.log(chalk.green('viewData = ' + JSON.stringify(viewData)));

                res.render("employee", {
                    viewData: viewData
                }); // render the "employee" view
            }
        });
});

app.post("/employee/update", (req, res) => {
    try {
        dataService.updateEmployee(req.body).then(() => {
            res.redirect("/employees")
        });
    } catch (rejectMsg) {
        // catch any errors here
        console.log(rejectMsg);
    };
});

// setup route to listen on /managers
app.get("/managers", (req, res) => {
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
app.get("/departments", (req, res) => {
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
app.get("/departments/add", (req, res) => {
    try {
        res.render("addDepartment");
    } catch (rejectMsg) {
        res.render("addDepartment", {
            title: "Add Department"
        });
    };
});
app.post("/departments/add", (req, res) => {
    try {
        dataService.addDepartment(req.body).then(() => {
            res.redirect("/departments")
        });
    } catch (rejectMsg) {
        // catch any errors here
        console.log(rejectMsg);
    };
});
app.post("/departments/update", (req, res) => {
    try {
        dataService.updateDepartment(req.body).then(() => {
            res.redirect("/departments")
        });
    } catch (rejectMsg) {
        // catch any errors here
        console.log(rejectMsg);
    };
});
app.get("/department/:departmentNum", (req, res) => {
    try {
        dataService.getDepartmentById(req.params.id).then((data) => {
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
    .then(listen)
    .catch(function (rejectMsg) {
        // catch any errors here
        console.log(rejectMsg);
    });