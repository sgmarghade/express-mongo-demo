const express = require('express');
const router = express.Router();
const Author = require('../models/author');

router.post('/', async (req, res) => {
    const author = new Author({name: req.body.name});
    await author.save();
    res.send(author);
})

router.get('/', async (req, res) => {
    const authors = await Author.find();
    res.send(authors);
})

module.exports = router;