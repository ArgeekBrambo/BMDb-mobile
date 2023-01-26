const express = require('express');
const router = express.Router();
const ControllerMovie = require('../controllers/ControllerMovie');

router.get('/movies', ControllerMovie.getAll);
router.get('/movies/:id', ControllerMovie.populateForm);

module.exports = router;