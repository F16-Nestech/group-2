exports.homeRoutes = (req, res) => {
    res.render('index');
}

exports.list_user = (req, res) => {
    res.render('list_user');
}

exports.add_user = (req, res) => {
    res.render('add_user');
}

exports.update_user = (req, res) => {
    res.render('update_user');
}
