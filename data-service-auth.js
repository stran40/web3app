const mongoose = require('mongoose');
const chalk = require('chalk');
let Schema = mongoose.Schema;

var userSchema = new Schema({
    "user":  {
        "type" : String,
        "unique" : true
    }, "password": String
});

let User; // to be defined on new connection

// initialize();
initialize = () => {
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
registerUser = (userData) => {
    return new Promise(function (resolve, reject) {
        // compare passwords
        if ( userData.password !== userData.password2 ){
            reject('Passwords do not match');
        } else if ( userData.password == userData.password2 ){
            // passwords match, create user
            let newUser = new User(userData);
            newUser.save((err) => {
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
            })
        }
    });
};

//  checkUser(userData)
checkUser = (userData) => {
    return new Promise(function (resolve, reject) {
        User.find({ user: userData.user})
        .then(()=>{
            if (users == 0) {
                reject('Unable to find user: ' + userData.user);
            }
            else if (users[0].password !== userData.password){
                reject("Incorrect Password for user: " + user);
            }
            else if (users[0].password == userData.password){
                resolve();
            }
        })
        .catch( (err) => {
            reject("Unable to find user: " + user);
        });
    })
};

module.exports = {
    initialize: initialize,
    checkUser: checkUser,
    registerUser: registerUser
}