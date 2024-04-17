const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/user');
module.exports = async function auth(req, res, next) {
    const authToken = req.header('x-auth-token');
    if (!authToken) {
        return res.status(401).send('Token missing');
    }
    try {
        const payload = jwt.verify(authToken, config.get('jwtPrivateKey'));
        req.user = await User.findById(payload._id);
        next();
    } catch (err) {
        console.log(err);
        res.status(400).send('Invalid token');
    }
}

