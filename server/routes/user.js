const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**user Routes */

router.get('/', userController.homepage);
router.get('/add_users', userController.addUser);
router.post('/add_users', userController.postUser);


module.exports = router;
