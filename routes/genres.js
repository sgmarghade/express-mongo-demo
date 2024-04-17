const express = require('express');
const Genre = require('../models/genre');
const router = express.Router();
const Joi = require("joi");
const authMiddleware = require('../middleware/auth');
router.get('/', async (req, res) => {
    const genres = await Genre.find();
    res.send(genres);
});

router.post('/', authMiddleware, async (req, res) => {
    try {
        const genre = new Genre({
            name: req.body.name
        });
        await genre.save();
        res.send(genre);
    }catch(err) {
        return res.status(400).send(err);
    }
});

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    return genre ? res.send(genre) : res.status(404).send({message: 'Genre not found'});
});

router.put('/:id', async (req, res) => {
    const {name} = req.body;
    const {id } = req.params;
    const genre = await Genre.findById(id);
    if (!genre) {
        return res.status(404).send({message: 'Genre not found'});
    }

    genre.name = name;
    await genre.save();
    return res.send(genre);
});

module.exports = router;