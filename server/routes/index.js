const UserRoutes = require('./UserRouter')
const routes = (app) => {
    app.use('/api/user', (req, res) => {
        res.send('User page')
    })
}

module.exports = routes;
