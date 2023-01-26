const express = require('express');
const router = express.Router();
const ControllerMovie = require('../controllers/controllerMovie');

router.get('/', ControllerMovie.getAll);
router.post('/', ControllerMovie.addMovie);
router.get('/:id', ControllerMovie.populateForm);
router.put('/:id', ControllerMovie.editMovie);
router.delete('/:id', ControllerMovie.deleteMovie);

module.exports = router;