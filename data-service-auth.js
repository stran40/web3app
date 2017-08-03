const mongoose = require('mongoose');
let Schema = mongoose.Schema;

var userSchema = new Schema({
    "user":  {
        "type" : String,
        "unique" : true
    }, "password": String
    }]
});

let User; // to be defined on new connection

// initialize();
module.exports.initialize = function () {
    return new Promise(function (resolve, reject) {
        let db = mongoose.createConnection("mongodb://web322:senecalab7@ds137749.mlab.com:37749/web322_a7");
        db.on('error', (err) => {
            reject(err); // reject the promise with the provided error
        });
        db.once('open', () => {
            User = db.model("users", userSchema);
            resolve();
        });
    });
};
// registerUser(userData); 
module.exports.registerUser(userData) = function () {
    return new Promise(function (resolve, reject) {
        
    });
};