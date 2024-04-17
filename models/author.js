const mongoose = require('mongoose');
const Author = mongoose.model('Author', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    bio: {
        type: String
    },
    website: {
        type: String
    }
}));

module.exports = Author;