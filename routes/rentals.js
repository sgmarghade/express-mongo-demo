const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');
const Movie = require('../models/movie');
router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
});

router.post('/', async (req, res) => {
    const {customerId, movieId} = req.body;
    const movie = await Movie.findById(movieId);
    if (!movie) {
        return res.status(404).send('Movie not found');
    }
    if (movie.numberInStock <= 0) {
        return res.status(404).send('Not in stock');
    }
    const rental = new Rental({
        customer: customerId,
        movie: movieId,
        rentalFee: 50
    });
    try {
        await rental.save();
        movie.numberInStock--;
        await movie.save();
        res.send(rental);
    }catch(err) {
        console.log(err);
        res.status(400).send(err.message);
    }
});

module.exports = router;