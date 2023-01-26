const router = require('express').Router();
const ControllerUser = require('../controllers/userController');

router.post('/user', ControllerUser.create)
router.get('/user', ControllerUser.getUsers)
router.get('/user/:id', ControllerUser.getUserById)
router.delete('/user/:id', ControllerUser.deleteUser)

module.exports = router;