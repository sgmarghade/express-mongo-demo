const express = require('express');
const router = express.Router();
const Course = require('../models/course');
const Joi = require("joi");
router.get('/', async (req, res) => {
    const courses = await Course.find().populate('author');
    res.send(courses);
});

router.post('/', async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        author: Joi.string().required()
    });

    const { body } = req;

    const result = schema.validate(body);
    if (result.error) {
        return res.status(400).send(result.error);
    }
    const course = new Course({name: body.name, author: body.author});
    await course.save();
    res.send(course);
});

router.get('/:id', async (req, res) => {
    const course = await Course.findById(req.params.id);
    return course ? res.send(course) : res.status(404).send({message: 'course not found'});
});

router.put('/:id', (req, res) => {
    res.send('ok')
});

module.exports = router;