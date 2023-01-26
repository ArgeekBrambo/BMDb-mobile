const express = require('express');
const router = express.Router();
const ControllerUser = require('../controllers/controllerUser');

router.get('/', ControllerUser.getAll);
router.post('/', ControllerUser.addUser);
router.get('/:_id', ControllerUser.populateForm);
// router.put('/:id', ControllerUser.editUser);
router.delete('/:_id', ControllerUser.deleteUser);

module.exports = router;