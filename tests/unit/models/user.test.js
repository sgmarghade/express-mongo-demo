const User = require('../../../models/user');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

describe('User model', () => {
    test('should generate auth token', () => {
        const payload = {_id: new mongoose.Types.ObjectId().toHexString(), name: 'Swapnil'}
        const token = new User(payload).generateToken();
        const decodedObj = jwt.decode(token, config.get('jwtPrivateKey'));
        expect(decodedObj).toMatchObject(payload);
    });
});