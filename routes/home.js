const express = require('express');
const router = express.Router();

router.get('/health', (req, res) => {
    res.status(200).send({message: 'Healthy'});
});
router.get('/',(req, res, next) => {
    res.redirect('/health');
});

module.exports = router;