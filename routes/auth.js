const express = require('express');
const User = require('../models/user');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

router.post('/logins', async (req, res) => {
    const { email, password} = req.body;
    const user = await User.findOne({email});
    if (!user) {
        return res.status(400).send('User: Invalid credentials');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(400).send('Match: Invalid credentials');
    }
    const token = jwt.sign({_id: user.id}, config.get('jwtPrivateKey'));
    return res.header('x-auth-token',token).send({
        user: _.pick(user,['name', 'email'])
    });
});

module.exports = router;