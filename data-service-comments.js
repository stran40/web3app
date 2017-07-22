const mongoose = require('mongoose');
let Schema = mongoose.Schema;

var commentSchema = new Schema({
    "authorName": String,
    "authorEmail": String,
    "subject": String,
    "postedDate": Date,
    "replies": [{
        "comment_id": String,
        "authorName:": String,
        "authorEmail": String,
        "commentText": String,
        "repliedDate": Date
    }]
});

let Comment; // to be defined on new connection

module.exports.initialize = function () {
    return new Promise(function (resolve, reject) {
        let db = mongoose.createConnection("mongodb://stran40:mongodb@ds141960.mlab.com:41960/web322_a6");
        db.on('error', (err) => {
            reject(err); // reject the promise with the provided error
        });
        db.once('open', () => {
            Comment = db.model("comments", commentSchema);
            resolve();
        });
    });
};

module.exports.addComment = function (data) {
    return new Promise( function (resolve, reject) {
        data.postedData = Data.now();
        let newComment = new Comment(data);
        newComment.save( (err) => {
            if (err) {
                reject("There was an error saving the comment", err);
            } else {
                console.log(chalk.yellow(newComment + " saved."));
                resolve(newComment._id);
            }
        })
    });
};

module.exports.getAllComments = function () {
    return new Promise( function (resolve, reject) {
       Comment.find({
           sort: {
                postedDate : 1
           }
       })
        .exec()
        .then((comments) => {
            resolve(comments)
        })
        .catch((err) =>{
            reject(err);
        })
    });
};
module.exports.addReply = function (data) {
    return new Promise( function (resolve, reject) {
       data.repliedData = Date.now();
       Comment.update({ _id : data.commentId },
        { $addToSet: { replies: data } },
        { multi: false })
        .exec()
        .then((data) => {
            resolve(data)
        })
        .catch((err) => {
            reject(err)
        })
    });
};