const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

/**Customer Routes */

router.get('/', customerController.homepage);
router.get('/add_users', customerController.addCustomer);
router.post('/add_users', customerController.postCustomer);


module.exports = router;