var fs = require("fs");
var workers = require('./workers.js');
var employees = [];
var departments = [];

module.exports.setMessage = (msg) => {
    return new Promise((resolve, reject)=>{
        message = msg;
        resolve;
    });
};

module.exports.getMessage = () => {
    return new Promise((resolve,reject)=>{
        if(message.length > 0){
            resolve(message)
        }else{
            reject("Oh No!");
        }
    });
}

/*-----------------------------------
 * initialize();
 * 
 * Reads contents of employees.json.
 * Converts file's contents into array of objects.
 * Assigns this array to employees array.
 * --------------------------------*/
function initialize(){
    function readEmployees(){
        // temp array of objects
        var employeeObj = [];
    return new Promise(function(resolve, reject){
        fs.readFile('./data/employees.json', 'utf8', function(err, data) {
        if (err) throw err;
        obj = JSON.parse(data);
        for (var i = 0; i < obj.length; i++){
            var person = new worker(obj[i].employeeNum, obj[i].firstName,
                                        obj[i].last_name,obj[i].email,
                                        obj[i].SSN,obj[i].addressStreet,
                                        obj[i].addresCity,obj[i].addressState,
                                        obj[i].addressPostal,obj[i].maritalStatus,
                                        obj[i].isManager,obj[i].employeeManagerNum,
                                        obj[i].status, obj[i].department,
                                        obj[i].hireDate);
                    employeeObj.push(person);
            }
            employees = employeeObj.slice();
                resolve("read operation of employees complete.");
                });
            });
        }; // end of readEmployees()

    function readDepartments(msg){
        // temp array of objects
        var departObj = [];
        return new Promise(function(resolve, reject){
                fs.readFile('./data/departments.json', 'utf8', function(err, data) {
                if (err) throw err;
                obj = JSON.parse(data);
                for (var i = 0; i < obj.length; i++){
                    var person = new worker(obj[i].employeeNum, obj[i].firstName,
                                                obj[i].last_name,obj[i].email,
                                                obj[i].SSN,obj[i].addressStreet,
                                                obj[i].addresCity,obj[i].addressState,
                                                obj[i].addressPostal,obj[i].maritalStatus,
                                                obj[i].isManager,obj[i].employeeManagerNum,
                                                obj[i].status, obj[i].department,
                                                obj[i].hireDate);
                    employeeObj.push(person);
            }
            employees = employeeObj.slice();
                console.log("Departments sucessfully read.");
                resolve("read operation of departments complete.");
                });
            });
    } // end of readDepartments();

    // invoke functions in order
    readEmployees()
    .then(readDepartments)
    .catch(function(rejectMsg){
        // catch errors here
        console.log(rejectMsg);
    });

}; // end of initialize();
initialize();
/*-----------------------------------
 * getAllEmployees();
 * 
 * --------------------------------*/
function getAllEmployees(msg){
    return new Promose(function(resolve, reject){
        resolve("getAllEmployees() complete.");
    });
};

/*-----------------------------------
 * getEmployeesByStatus(status);
 * 
 * --------------------------------*/
function getEmployeesByStatus(status){


};

/*
initialize()
.then(getAllEmployees)
.catch(function(rejectMsg){
    // catch errors here
    console.log(rejectMsg);
});

*/