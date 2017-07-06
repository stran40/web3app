const fs = require("fs");
const chalk = require("chalk");
var test = chalk.cyan;
var test2 = chalk.yellow;
var error = chalk.red.bold;

var employees = [];
var empCount = 0;
var departments = [];

setMessage = (msg) => {
    return new Promise((resolve, reject) => {
        message = msg;
        resolve;
    });
};

getMessage = () => {
    return new Promise((resolve, reject) => {
        if (message.length > 0) {
            resolve(message)
        } else {
            reject("Oh No!");
        }
    });
}
/*-----------------------------------
 * worker();
 * 
 * Function constructor for person object
 * --------------------------------*/
function worker(setNum, setFirstName, setLastName, setEmail, setSSN,
    setAddressStreet, setAddressCity, setAddressState,
    setAddressPostal, setMaritalStatus, setManager,
    setEmployeeManagerNum, setStatus, setDepartment, setHireDate) {
    this.employeeNum = setNum;
    this.firstName = setFirstName;
    this.lastName = setLastName;
    this.email = setEmail;
    this.ssn = setSSN;
    this.addressStreet = setAddressStreet;
    this.addresCity = setAddressCity;
    this.addressState = setAddressState;
    this.addressPostal = setAddressPostal;
    this.maritalStatus = setMaritalStatus;
    this.isManager = setManager;
    this.employeeManagerNum = setEmployeeManagerNum;
    this.status = setStatus;
    this.department = setDepartment;
    this.hireDate = setHireDate;
    if ( setStatus == 'Full Time' )
        this.statusBool = true
    else
        this.statusBool = false;
};

// worker prototype: methods setting properties of worker obj
worker.prototype.setNum = function (newNum) {
    this.employeeNum = newNum
};
worker.prototype.setNum = function (newNum) {
    this.employeeNum = newNum
};
worker.prototype.setFirstName = function (newFirstName) {
    this.firstName = newFirstName
};
worker.prototype.setLastName = function (newLastName) {
    this.lastName = newLastName
};
worker.prototype.setEmail = function (newEmail) {
    this.email = newEmail
};
worker.prototype.setSSN = function (newSSN) {
    this.SSN = newSSN
};
worker.prototype.setAddressStreet = function (newAddressStreet) {
    this.addressStreet = newAddressStreet
};
worker.prototype.setAddressCity = function (newCity) {
    this.addresCity = newCity
};
worker.prototype.setAddressState = function (newState) {
    this.addressState = newState
};
worker.prototype.setAddressPostal = function (newPostal) {
    this.addressPostal = newPostal
};
worker.prototype.setMaritalStatus = function (newMarital) {
    this.maritalStatus = newMartial
};
worker.prototype.setManager = function (newIsManager) {
    this.isManager = newIsManager
};
worker.prototype.setEmployeeManagerNum = function (newEmployeeManagerNum) {
    this.employeeManagerNum = newEmployeeManagerNum
};
worker.prototype.setStatus = function (newStatus) {
    this.status = newStatus
};
worker.prototype.setDepartment = function (newDepart) {
    this.department = newDepart
};
worker.prototype.setHireDate = function (newHireDate) {
    this.hireDate = newHireDate
};
/*-----------------------------------
 * departObj();
 * 
 * Function constructor for department object
 * --------------------------------*/
function departObj(setID, setName) {
    this.departID = setID;
    this.departName = setName;
};

// department prototype: methods setting properties of department obj
departObj.prototype.setID = function (newID) {
    this.departID = newID
};
departObj.prototype.setName = function (newName) {
    this.departName = newName
};

function readEmployees() {
    return new Promise(function (resolve, reject) {
        fs.readFile('./data/employees.json', 'utf8', function (err, data) {
            if (err) throw err;
            obj = JSON.parse(data);
            for (var i = 0; i < obj.length; i++) {
                var person = new worker(obj[i].employeeNum, obj[i].firstName,
                    obj[i].last_name, obj[i].email,
                    obj[i].SSN, obj[i].addressStreet,
                    obj[i].addresCity, obj[i].addressState,
                    obj[i].addressPostal, obj[i].maritalStatus,
                    obj[i].isManager, obj[i].employeeManagerNum,
                    obj[i].status, obj[i].department,
                    obj[i].hireDate );
                employees.push(person);
            }
            resolve(employees);
        });
    });
}; // end of readEmployees()

function readDepartments(msg) {
    var tempArray = [];
    return new Promise(function (resolve, reject) {
        fs.readFile('./data/departments.json', 'utf8', function (err, data) {
            if (err) throw err;
            obj = JSON.parse(data);
            for (var i = 0; i < obj.length; i++) {
                var tempDepartObj = new departObj(obj[i].departmentId, obj[i].departmentName);
                departments.push(tempDepartObj);
            }
            resolve(departments);
        });
    });
} // end of readDepartments();

/*-----------------------------------
 * initialize();
 * 
 * Reads contents of employees.json.
 * Converts file's contents into array of objects.
 * Assigns this array to employees array.
 * --------------------------------*/
initialize = () => {
    return new Promise(function (resolve, reject) {
        // invoke functions in order
        readEmployees()
            .then(readDepartments)
            .then(() => {
                empCount = employees.length;
            })
            .then(() => {
                resolve();
            })
            .catch(function (rejectMsg) {
                // catch errors here
                console.log(rejectMsg);
            });
            
    });
  
}; // end of initialize();

/*-----------------------------------
 * getAllEmployees();
 * --------------------------------*/
getAllEmployees = (msg) => {
    return new Promise(function (resolve, reject) {
        if (employees.length > 0) {
            resolve(employees);
        } else {
            reject("No results returned from getAllEmployees();");
        }
    });
};

/*-----------------------------------
 * getEmployeesByStatus(status);
 * --------------------------------*/
getEmployeesByStatus = (status) => {
    // create variable to hold matches
    var matches = [];
    return new Promise(function (resolve, reject) {
        if (employees.length > 0) {
            for (var i = 0; i < employees.length; i++) {
                if (status == employees[i].status) {
                    matches.push(employees[i]);
                }
            }
            resolve(matches);
        } else {
            reject("\nNo results returned from getEmployeesByStatus();");
        }
    });

};

/*-----------------------------------
 * getEmployeesByDepartment(department)
 * --------------------------------*/
getEmployeesByDepartment = (department) => {
    // create variable to hold matches
    var matches = [];
    return new Promise(function (resolve, reject) {
        if (employees.length > 0) {
            for (var i = 0; i < employees.length; i++) {
                if (department == employees[i].department) {
                    matches.push(employees[i]);
                }
            }
            resolve(matches);
        } else {
            reject("\nNo results returned from getEmployeesByDepartment();");
        }
    });
};

/*-----------------------------------
 * getEmployeesByManager(manager)
 * --------------------------------*/
getEmployeesByManager = (manager) => {
    // create variable to hold matches
    var matches = [];
    return new Promise(function (resolve, reject) {
        if (employees.length > 0) {
            for (var i = 0; i < employees.length; i++) {
                if (manager == employees[i].employeeManagerNum) {
                    matches.push(employees[i]);
                }
            }
            resolve(matches);
        } else {
            reject("\nNo results returned from getEmployeesByManager();");
        }
    });
};
/*-----------------------------------
 * getEmployeeByNum(num)
 * --------------------------------*/
getEmployeeByNum = (num) => {
    // create variable to hold matches
    var matches = [];
    return new Promise(function (resolve, reject) {
        if (employees.length > 0) {
            for (var i = 0; i < employees.length; i++) {
                if (num == employees[i].employeeNum) {
                    matches.push(employees[i]);
                }
            }
            resolve(matches);
        } else {
            reject("\nNo results returned from getEmployeesByNum();");
        }
    });
};

/*-----------------------------------
 * getManagers()
 * --------------------------------*/
getManagers = () => {
    // create variable to hold matches
    var matches = [];
    return new Promise(function (resolve, reject) {
        if (employees.length > 0) {
            for (var i = 0; i < employees.length; i++) {
                if (employees[i].isManager ) {
                    matches.push(employees[i]);
                }
            }
            resolve(matches);
        } else {
            reject("\nNo results returned from getManagers();");
        }
    });
};

/*-----------------------------------
 * getDepartments()
 * --------------------------------*/
getDepartments = () => {
    // create variable to hold matches
    var matches = [];
    return new Promise(function (resolve, reject) {
        if (departments.length > 0) {
            for (var i = 0; i < departments.length; i++) {
                matches.push(departments[i]);
            }
            resolve(matches);

        } else {
            reject("No results returned from getDepartments();");
        }
    });

};

/*-----------------------------------
 *  addEmployee(employeeData);
 * --------------------------------*/
 addEmployee = (employeeData) => {
     return new Promise(function (resolve, reject) {
        empCount++;
        employeeData.employeeNum = empCount;
        // add new employeeData obj to employees array
        employees.push(employeeData);
        resolve();
     });
 };

/*-----------------------------------
 *  updateEmployee(employeeData) 
 * --------------------------------*/
updateEmployee = (employeeData) => {
    return new Promise(function (resolve, reject) {
        console.log("updateEmployee called.");
        console.log("Employee being updated: " + JSON.stringify(employeeData) );
       // search employees array
       for ( var i = 0; i < employees.length; i++  ) {
            if ( employees[i].employeeNum = employeeData.employeeNum ){
                console.log("Match found: " + employees[i].employeeNum + " = " + employeeData.employeeNum );
                employees[i] = employeeData; // match found. Overwrite object with new data
            }
       }
        resolve();
     });
};

module.exports = {
    initialize: initialize,
    setMessage: setMessage,
    getMessage: getMessage,
    getAllEmployees: getAllEmployees,
    getEmployeesByStatus: getEmployeesByStatus,
    getEmployeesByDepartment: getEmployeesByDepartment,
    getEmployeesByManager: getEmployeesByManager,
    getEmployeeByNum: getEmployeeByNum,
    getManagers: getManagers,
    getDepartments: getDepartments,
    addEmployee : addEmployee,
    updateEmployee : updateEmployee
}