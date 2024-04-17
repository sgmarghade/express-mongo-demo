const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 2096,
    }
});
userSchema.methods.generateToken = function () {
    return jwt.sign({_id: this.id, name: this.name}, config.get('jwtPrivateKey'));
}
const User = mongoose.model('User', userSchema);

module.exports = User;