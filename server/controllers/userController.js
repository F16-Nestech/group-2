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
 *  Form
 */
exports.addUser = async (req, res) => {

    const locals = {
        title: 'Add New user OSM',
        description: ' Free NodeJS User Management System'
    }
    res.render('user/add_users', locals);

}

/**
 * POST /
 * Create new user Form
 */
exports.postUser = async (req, res) => {
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
