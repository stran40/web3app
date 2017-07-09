const chalk = require('chalk');
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
    departmentName: Sequelize.STRING

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
        sequelize.sync()
            .then(() => {
                resolve();
            })
            .catch(function (error) {
                console.log("Something went wrong with model creation.");
            });
    });
}; // end of initialize();

/*-----------------------------------
 * getAllEmployees();
 * --------------------------------*/
getAllEmployees = (msg) => {
    return new Promise(function (resolve, reject) {
        sequelize.sync().then(function () {
            Employee.findAll()
                .then(function (data) {
                    resolve(data);
                }).catch(function (error) {
                    console.log('No results returned.');
                });
        });
    });
};
/*-----------------------------------
 * getEmployeesByStatus(status);
 * --------------------------------*/
getEmployeesByStatus = (status) => {
    return new Promise(function (resolve, reject) {
        sequelize.sync().then(function () {
            Employee.findAll({
                    where: {
                        status: status
                    }
                })
                .then(function (data) {
                    resolve(data);
                })
                .catch(function (error) {
                    console.log('No results returned.');
                });
        });
    });
};
/*-----------------------------------
 * getEmployeesByDepartment(department)
 * --------------------------------*/
getEmployeesByDepartment = (department) => {
    return new Promise(function (resolve, reject) {
        sequelize.sync().then(function () {
            Employee.findAll({
                    where: {
                        department: department
                    }
                })
                .then(function (data) {
                    resolve(data);
                })
                .catch(function (error) {
                    console.log('No results returned.');
                });
        });
    });

};
/*-----------------------------------
 * getEmployeesByManager(manager)
 * --------------------------------*/
getEmployeesByManager = (manager) => {
    return new Promise(function (resolve, reject) {
        sequelize.sync().then(function () {
            Employee.findAll({
                    where: {
                        manager: manager
                    }
                })
                .then(function (data) {
                    resolve(data);
                })
                .catch(function (error) {
                    console.log('No results returned.');
                });
        });
    });

};
/*-----------------------------------
 * getEmployeeByNum(num)
 * --------------------------------*/
getEmployeeByNum = (num) => {
    return new Promise(function (resolve, reject) {
        sequelize.sync().then(function () {
            Employee.find({
                    where: {
                        employeeNum: num
                    }
                })
                .then(function (data) {
                    resolve(data);
                })
                .catch(function (error) {
                    console.log('No results returned.');
                });
        });
    });
};
/*-----------------------------------
 * getManagers()
 * --------------------------------*/
getManagers = () => {
    return new Promise(function (resolve, reject) {
        sequelize.sync().then(function () {
            Employee.findAll({
                    where: {
                        isManager: true
                    }
                })
                .then(function (data) {
                    resolve(data);
                })
                .catch(function (error) {
                    console.log('No results returned.');
                });
        });
    });
};

/*-----------------------------------
 * getDepartments()
 * --------------------------------*/
getDepartments = () => {
    return new Promise(function (resolve, reject) {
        sequelize.sync().then(function () {
            Department.findAll()
                .then(function (data) {
                    console.log(chalk.yellow('getDepartments() ran.'));
                    resolve(data);
                })
                .catch(function (error) {
                    console.log('No results returned (getDepartments()).');
                });
        });
    });

};

/*-----------------------------------
 *  addEmployee(employeeData);
 * --------------------------------*/
addEmployee = (employeeData) => {
    return new Promise(function (resolve, reject) {

        sequelize.sync().then(function () {
            employeeData.isManager = (employeeData.isManager) ? true : false;
            // set blank values to null
            for (var prop in employeeData) {
                if (employeeData[prop] == '') {
                    employeeData[prop] = null;
                }
            };
            // create Employee obj
            Employee.create({
                employeeNum: employeeData.employeeNum,
                firstName: employeeData.firstName,
                last_name: employeeData.last_name,
                email: employeeData.email,
                SSN: employeeData.SSN,
                addressStreet: employeeData.addressStreet,
                addresCity: employeeData.addresCity,
                addressState: employeeData.addressState,
                addressPostal: employeeData.addressPostal,
                isManager: employeeData.isManager,
                employeeManagerNum: employeeData.employeeManagerNum,
                status: employeeData.status,
                department: employeeData.department,
                hireDate: employeeData.hireDate
            }).then(function (data) {
                console.log(chalk.yellow("Employee created."));
                resolve(data);
            }).catch(function (error) {
                console.log("unable to create employee.");
            });
        });
    });
};
/*-----------------------------------
 *  updateEmployee(employeeData) 
 * --------------------------------*/
updateEmployee = (employeeData) => {
    return new Promise(function (resolve, reject) {
        sequelize.sync().then(function () {
            employeeData.isManager = (employeeData.isManager) ? true : false;
            // set blank values to null
            for (var prop in employeeData) {
                if (employeeData[prop] == '')
                    employeeData[prop] = null;
            };
            // update Employee obj
            Employee.update({
                 employeeNum: employeeData.employeeNum,
                firstName: employeeData.firstName,
                last_name: employeeData.last_name,
                email: employeeData.email,
                SSN: employeeData.SSN,
                addressStreet: employeeData.addressStreet,
                addresCity: employeeData.addresCity,
                addressState: employeeData.addressState,
                addressPostal: employeeData.addressPostal,
                isManager: employeeData.isManager,
                employeeManagerNum: employeeData.employeeManagerNum,
                status: employeeData.status,
                department: employeeData.department,
                hireDate: employeeData.hireDate
            }, {
                where: {
                    employeeNum: employeeData.employeeNum
                }
            }).then(function (employee) {
                console.log(chalk.yellow("Employee updated."));
                resolve(employee);
            }).catch(function (error) {
                console.log("unable to update employee.");
            });
        });
    });
};
/*-----------------------------------
 * deleteEmployeeByNum(empNum)
 * --------------------------------*/
deleteEmployeeByNum = (empNum) => {
    return new Promise(function (resolve, reject) {
        sequelize.sync().then(function () {
            Employee.destroy({
                    where: {
                        employeeNum : empNum
                    }
                })
                .then(function () {
                    resolve();
                })
                .catch(function (error) {
                    console.log('Destroy was rejected.');
                });
        });
    });
};

/*-----------------------------------
 *  addDepartment(departmentData)
 * --------------------------------*/
addDepartment = (departmentData) => {
    return new Promise(function (resolve, reject) {
        // set blank values to null
        for (var prop in departmentData) {
            if (departmentData[prop] == '')
                departmentData[prop] = null;
        };
        //create department obj
        Department.create({
            departmentId: departmentData.departmentId,
            departmentName: departmentData.departmentName
        }).then(function (data) {
            console.log(chalk.yellow('Department obj created.'));
            resolve(data);
        }).catch(function (error) {
            console.log("unable to add department.");
        });
    });
};
/*-----------------------------------
 *  updateDepartment(departmentData)
 * --------------------------------*/
updateDepartment = (departmentData) => {
    return new Promise(function (resolve, reject) {
        sequelize.sync().then(function () {
            // set blank values to null
            for (var prop in departmentData) {
                if (departmentData[prop] == '')
                    departmentData[prop] = null;
            };
            // update department obj
            Department.update({
                departmentId: departmentData.departmentId,
                departmentName: departmentData.departmentName
            }, {
                where: {
                    departmentId: departmentData.departmentId
                }
            }).then(function (department) {
                console.log(chalk.yellow("Department updated."));
                resolve(department);
            }).catch(function (error) {
                console.log("unable to update department.");
            });
        });
    });
};

/*-----------------------------------
 * getDepartmentById(id)
 * --------------------------------*/
getDepartmentById = (id) => {
    return new Promise(function (resolve, reject) {
        sequelize.sync().then(function () {
            Department.findAll({
                    where: {
                        departmentId: id
                    }
                })
                .then(function (data) {
                    resolve(data);
                })
                .catch(function (error) {
                    console.log('No results returned.');
                });
        });
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
    updateEmployee: updateEmployee,
    getDepartmentById: getDepartmentById,
    updateDepartment: updateDepartment,
    addDepartment: addDepartment,
    deleteEmployeeByNum : deleteEmployeeByNum
}