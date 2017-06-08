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
function worker(setNum, setFirstName,setLastName,setEmail,setSSN,
                setAddressStreet,setAddressCity,setAddressState,
                setAddressPostal,setMaritalStatus,setManager,
                setEmployeeManagerNum,setStatus,setDepartment,setHireDate){
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
 * departObj();
 * 
 * Function constructor for department object
 * --------------------------------*/
function departObj(setID, setName){
    this.departID = setID;
    this.departName = setName;
 };

// department prototype: methods setting properties of department obj
departObj.prototype.setID = function(newID){this.departID = newID};
departObj.prototype.setName = function(newName){this.departName = newName};


/*-----------------------------------
 * initialize();
 * 
 * Reads contents of employees.json.
 * Converts file's contents into array of objects.
 * Assigns this array to employees array.
 * --------------------------------*/
module.exports.initialize = () => {
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
        var tempArray= [];
        return new Promise(function(resolve, reject){
                fs.readFile('./data/departments.json', 'utf8', function(err, data) {
                if (err) throw err;
                obj = JSON.parse(data);
                for (var i = 0; i < obj.length; i++){
                    var tempDepartObj = new departObj(obj[i].departmentId, obj[i].departmentName);
                    tempArray.push(tempDepartObj);
            }
            departments = tempArray.slice();
                resolve(setMessage("read operation of departments complete."));
            });
        });
    } // end of readDepartments();

    // invoke functions in order
    readEmployees()
    .then(readDepartments)
    .then(getAllEmployees)
    .catch(function(rejectMsg){
        // catch errors here
        console.log(rejectMsg);
    });

}; // end of initialize();

/*-----------------------------------
 * getAllEmployees();
 * 
 * --------------------------------*/
module.exports.getAllEmployees = (msg) => {
    return new Promise(function(resolve, reject){
        if(employees.length > 0){
            resolve(employees);
        }else{
            reject("No results returned from getAllEmployees();");
        }
    });
};

/*-----------------------------------
 * getEmployeesByStatus(status);
 * 
 * --------------------------------*/
modules.exports.getEmployeesByStatus = (status) => {
    return new Promise(function(resolve, reject){
        if(employees.length > 0){
            resolve(employees);
        }else{
            reject("No results returned from getEmployeesByStatus();");
        }
    });

};

/*
initialize()
.then(getAllEmployees)
.catch(function(rejectMsg){
        // catch errors here
        console.log(rejectMsg);
    });
    */