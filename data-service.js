var fs = require("fs");
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
 * worker();
 * 
 * Function constructor for person object
 * --------------------------------*/
function worker(){
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
 };

// worker prototype: methods setting properties of worker obj
worker.prototype.setNum = function(newNum){this.employeeNum = newNum};
worker.prototype.setFirstName = function(newFirstName){this.firstName = newFirstName};
worker.prototype.setLastName  = function(newLastName){this.lastName = newLastName};
worker.prototype.setEmail  = function(newEmail){this.email = newEmail};
worker.prototype.setSSN  = function(newSSN){this.SSN= newSSN};
worker.prototype.setAddressStreet  = function(newAddressStreet){this.addressStreet = newAddressStreet};
worker.prototype.setAddressCity  = function(newCity){this.addresCity = newCity};
worker.prototype.setAddressState  = function(newState){ this.addressState = newState };
worker.prototype.setAddressPostal  = function(newPostal){this.addressPostal = newPostal};
worker.prototype.setMaritalStatus  = function(newMarital){this.maritalStatus = newMartial};
worker.prototype.setManager  = function(newIsManager){this.isManager = newIsManager};
worker.prototype.setEmployeeManagerNum  = function(newEmployeeManagerNum)
                                            {this.employeeManagerNum = newEmployeeManagerNum};
worker.prototype.setStatus  = function(newStatus){this.status = newStatus};
worker.prototype.setDepartment  = function(newDepart){this.department = newDepart};
worker.prototype.setHireDate  = function(newHireDate){this.hireDate = newHireDate};
/*-----------------------------------
 * initialize();
 * 
 * Reads contents of employees.json.
 * Converts file's contents into array of objects.
 * Assigns this array to employees array.
 * --------------------------------*/
function initialize(){
    return new Promise(function(resolve, reject){
        fs.readFile('./data/employees.json', 'utf8', function(err, data) {
        if (err) throw err;
        obj = JSON.parse(data);
        console.log(obj);
        resolve("initialize() complete");
        });
    });
    
};

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