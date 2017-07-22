const mongoose = require('mongoose');
let Schema = mongoose.Schema;

var commentSchema = new Schema({
    "authorName": String,
    "authorEmail": String,
    "subject": String,
    "postedDate": Data,
    "replies": [{
        "comment_id": String,
        "authorName:": String,
        "authorEmail": String,
        "commentText": String,
        "repliedDate": Date
    }]
});

let Comment; // to be defined on new connection

module.exports.initalize = function () {
    return new Promise(function (resolve, reject) {
        let db = mongoose.createConnection("mongodb://<web322>:<dbsWEB322>@ds141960.mlab.com:41960/web322_a6");
        db.on('error', (err) => {
            reject(err); // reject the promise with the provided error
        });
        db.once('open', () => {
            Comment = db.model("comments", commentSchema);
            resolve();
        });
    });
};
