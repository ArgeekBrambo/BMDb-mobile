const express = require('express');
const router = express.Router();
const ControllerGenre = require('../controllers/ControllerGenre');

router.get('/', ControllerGenre.getAll);
router.post('/', ControllerGenre.addGenre);
router.delete('/:id', ControllerGenre.deleteGenre);

module.exports = router;