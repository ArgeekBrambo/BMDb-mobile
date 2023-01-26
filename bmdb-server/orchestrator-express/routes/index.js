const express = require('express');
const router = express.Router();
const userRoute = require('./userRoutes');
const movieRoute = require('./movieRoutes');
const genreRoute = require('./genreRoutes');

router.use('/movies', movieRoute);
// router.use('/genres', genreRoute);
router.use('/users', userRoute);

module.exports = router;