const express = require('express');
const Movie = require('../models/movie');
const Genre = require('../models/genre');
const router = express.Router();
router.get('/', async (req, res) => {
    const movies = await Movie.find();
    res.send(movies);
});

router.post('/', async (req, res) => {
    try {
        const { title, genreId, numberInStock = 0, dailyRentalRate = 0} = req.body;
        const genre = await Genre.findById(genreId);
        const movie = new Movie({
            title,
            genre: {
                _id: genre.id,
                name: genre.name
            },
            numberInStock,
            dailyRentalRate
        });
        await movie.save();
        res.send(movie);
    }catch(err) {
        return res.status(400).send(err);
    }
});

router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    return movie ? res.send(movie) : res.status(404).send({message: 'Movie not found'});
});

router.put('/:id', async (req, res) => {
    const {title} = req.body;
    const {id } = req.params;
    const movie = await Movie.findById(id);
    if (!movie) {
        return res.status(404).send({message: 'Movie not found'});
    }

    movie.title = title;
    await movie.save();
    return res.send(movie);
});

module.exports = router;