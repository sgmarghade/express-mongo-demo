const config = require('config');
const morgan = require("morgan");
const express = require("express");
module.exports = function (app) {
    if(!config.get('jwtPrivateKey')) {
        throw new Error('Config jwtPrivateKey missing');
    }
    if(app.get('env') !== 'production') {
        app.use(morgan('tiny'));
        console.log('Enabled morgan '+app.get('env'));
    }
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(express.static('public'));
}