const express = require('express');
const User = require('../models/user');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const authMiddleware = require('../middleware/auth');
router.get('/me', authMiddleware, (req, res) => {
    const {user } = req;
    res.send({user: _.pick(user,['email', 'name', 'id'])});
});
router.post('/', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).send('User already exists');
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashPassword
        });
        await user.save();
        res.send(_.pick(user,['email', 'name']));
    }catch(err) {
        return res.status(400).send(err);
    }
});

module.exports = router;