const User = require('../models/userModel');
const mongoose = require('mongoose');

// *GET * HomepageAdmin
exports.homepage = async (req, res) => {

    const locals = {
        title: 'OSM SHOP',
        description: ' Free NodeJS User Management System'
    }
    res.render('index', locals);

}

/**
 * Get /
 * Customer Form
 */
exports.addCustomer = async (req, res) => {

    const locals = {
        title: 'Add New Customer OSM',
        description: ' Free NodeJS User Management System'
    }
    res.render('customer/add_users', locals);

}

/**
 * POST /
 * Create new Customer Form
 */
exports.postCustomer = async (req, res) => {
    const newUser = new User({
        name: req.body.indexName,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        gender: req.body.gender,
        role: req.body.role,
    });

    try {
        await User.create(newUser);
        res.redirect('/')
    } catch (error) {
        console.log(error);
    }
}


