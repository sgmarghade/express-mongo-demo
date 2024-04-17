const mongoose = require("mongoose");
module.exports = function () {
    mongoose.connect('mongodb://localhost:27017/playground')
        .then(() => {
            console.log('Connected to Mongodb');
        })
        .catch((err) => {
            console.log(err);
        });
    mongoose.set('debug', true);
}