const mongoose = require('mongoose');
const chalk = require('chalk');
const bcrypt = require('bcryptjs');
let Schema = mongoose.Schema;

var userSchema = new Schema({
    "user": {
        "type": String,
        "unique": true
    },
    "password": String
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
            if (userData.password !== userData.password2) {
                reject('Passwords do not match');
            }
            try {
                // passwords match, create user
                let newUser = new User(userData);
                bcrypt.genSalt(10, function (err, salt) { // Generate a "salt" using 10 rounds
                    if (err) throw err;
                    bcrypt.hash(userData.password, salt, function (err, hash) { // encrypt password
                       if (err) throw err;
                       newUser.password = hash;
                        newUser.save((err) => {
                            if (err) {
                                // duplicate key 
                                if (err.code == 11000) {
                                    reject('User Name already taken');
                                } else {
                                    reject('There was an error creating the user: ', err);
                                }
                                // no error
                            } else {
                                console.log(chalk.yellow(newUser));
                                resolve();
                            }
                        })  
                    });
                });
        } catch (err) {
            reject( "There was an error encrypting the password");
        }
    });
};

//  checkUser(userData)
checkUser = (userData) => {
    return new Promise(function (resolve, reject) {
        User.find({
                user: userData.user
            })
            .exec()
            .then((users) => {
                if (users == 0) {
                    reject('Unable to find user: ' + userData.user);
                }
                else{
                    bcrypt.genSalt(10, function (err, salt) { 
                        if (err) throw err;
                        bcrypt.hash(userData.password, salt, function (err, hash) { // encrypt password
                        if (err) throw err;
                            bcrypt.compare(userData.password, hash).then((res) => {
                                resolve(); 
                                });
                        })
                    })
                }
            })
            .catch((err) => {
                reject("Unable to find user: " + userData.user);
            });
    })
};

updatePassword = (userData) => {
    User.update({ user: userData.user },
    { $set: { password: hash } },
    { multi: false })
    .exec()
    .then( resolve() )
    .catch( reject( "There was an error updating the password for " + userData.user ) );
}
module.exports = {
    initialize: initialize,
    checkUser: checkUser,
    registerUser: registerUser,
    updatePassword: updatePassword
}