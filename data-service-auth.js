const mongoose = require('mongoose');
const chalk = require('chalk');
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
        // compare passwords
        if !( userData.password == userData.password2 ){
            reject('Passwords do not match');
        } else if ( userData.password == userData.password2 ){
            // passwords match, create user
            let newUser = new User(userData);
            newUser.save((err)) => {
                if(err){
                    // duplicate key 
                    if (err.code == 11000) {
                        reject('User Name already taken');
                    } else  {
                        reject('There was an error creating the user: ', err );
                    }
                    // no error
                } else {
                    console.log(chalk.yellow(newUser));
                    resolve();
                }
            }
        }
    });
};

//  checkUser(userData)
module.exports.checkUser(userData) = function () {
    return new Promise(function (resolve, reject) {
        User.find({ user: userData.user})
        .then(()=>{
            if (users == 0) {
                reject('Unable to find user: ' + userData.user);
            }
        })
        
    });
};
