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