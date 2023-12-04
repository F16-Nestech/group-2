// const axios = require('axios');

// exports.homepageAdminRoutes = (req, res) => {
//     res.render('index');  //this is HomePage cho admin
// }

// exports.list_user = (req, res) => {
//     //Make a get request to/ api/user
//     axios.get('http://localhost:3000/api/users')
//         .then(function (response) {
//             res.render('list_user', { users: response.data });
//         })
//         .catch(err => {
//             res.send(err);
//         })

// }

// exports.add_user = (req, res) => {
//     res.render('add_user');
// }

// exports.update_user = (req, res) => {
//     axios.get('http://localhost:3000/api/users', { params: { id: req.query.id } })
//         .then(function (userdata) {
//             res.render("update_user", { user: userdata.data })
//         })
//         .catch(err => {
//             res.send(err);
//         })
//     res.render('update_user');
// }
