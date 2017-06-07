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
