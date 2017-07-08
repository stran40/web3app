const Sequelize = require('sequelize');

var sequelize = new Sequelize('d19638ftm2u815', 'upyrexbutjnovu', 'ad0e8893af8635af64b9ec305dbe232b94799f0b4fc695385ae3201fd2818882', {
    host: 'ec2-107-21-205-25.compute-1.amazonaws.com',
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
        ssl: true
    }
});

sequelize
    .authenticate()
    .then(function () {
        console.log('Connection has been established successfully.');
    })
    .catch(function (err) {
        console.log('Unable to connect to the database:', err);
    });

// Define a "Employee" model
var Employee = sequelize.define('Employee', {
    employeeNum: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: Sequelize.STRING,
    last_name: Sequelize.STRING,
    email: Sequelize.STRING,
    SSN: Sequelize.STRING,
    addressStreet: Sequelize.STRING,
    addresCity: Sequelize.STRING,
    addressState: Sequelize.STRING,
    addressPostal: Sequelize.STRING,
    maritalStatus: Sequelize.STRING,
    isManager: Sequelize.BOOLEAN,
    employeeManagerNum: Sequelize.INTEGER,
    status: Sequelize.STRING,
    department: Sequelize.INTEGER,
    hireDate: Sequelize.STRING
});

// Define a "Department" model
var Department = sequelize.define('Department', {
    departmentId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    departmentName : Sequelize.STRING

});

setMessage = (msg) => {
    return new Promise(function (resolve, reject) {
        reject();
    });

};

getMessage = () => {
    return new Promise(function (resolve, reject) {
        reject();
    });

};

/*-----------------------------------
 * initialize();
 * 
 * --------------------------------*/
initialize = () => {
    return new Promise(function (resolve, reject) {
        sequelize.sync().then(function () {

            // create a new "Employee" table and add it to the database
            Employee.create({ }).then(function (employee) {
                console.log("Worker model created.");
                resolve();
            })
            Department.create({}).then(function (employee) {
                console.log("Department model created.");
                resolve();
            }).catch(function (error) {
                console.log("Something went wrong with model creation.");
            });
        });
        reject();
    });


}; // end of initialize();
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
    if (setStatus == 'Full Time')
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
        reject();
    });

}; // end of readEmployees()

function readDepartments(msg) {
    return new Promise(function (resolve, reject) {
        reject();
    });

} // end of readDepartments();


/*-----------------------------------
 * getAllEmployees();
 * --------------------------------*/
getAllEmployees = (msg) => {
    return new Promise(function (resolve, reject) {
        reject();
    });

};

/*-----------------------------------
 * getEmployeesByStatus(status);
 * --------------------------------*/
getEmployeesByStatus = (status) => {
    return new Promise(function (resolve, reject) {
        reject();
    });

};

/*-----------------------------------
 * getEmployeesByDepartment(department)
 * --------------------------------*/
getEmployeesByDepartment = (department) => {
    return new Promise(function (resolve, reject) {
        reject();
    });

};

/*-----------------------------------
 * getEmployeesByManager(manager)
 * --------------------------------*/
getEmployeesByManager = (manager) => {
    return new Promise(function (resolve, reject) {
        reject();
    });

};
/*-----------------------------------
 * getEmployeeByNum(num)
 * --------------------------------*/
getEmployeeByNum = (num) => {
    return new Promise(function (resolve, reject) {
        reject();
    });

};

/*-----------------------------------
 * getManagers()
 * --------------------------------*/
getManagers = () => {
    return new Promise(function (resolve, reject) {
        reject();
    });

};

/*-----------------------------------
 * getDepartments()
 * --------------------------------*/
getDepartments = () => {
    return new Promise(function (resolve, reject) {
        reject();
    });

};

/*-----------------------------------
 *  addEmployee(employeeData);
 * --------------------------------*/
addEmployee = (employeeData) => {
    return new Promise(function (resolve, reject) {
        reject();
    });

};

/*-----------------------------------
 *  updateEmployee(employeeData) 
 * --------------------------------*/
updateEmployee = (employeeData) => {
    return new Promise(function (resolve, reject) {
        reject();
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
    addEmployee: addEmployee,
    updateEmployee: updateEmployee
}