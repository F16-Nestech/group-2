const jwt = require('jsonwebtoken');

const authJwt = {
    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        if (token) {
            const Access_Token = token.split(" ")[1];
            jwt.verify(Access_Token, process.env.JWT_ACCESS_KEY, (err, user) => {
                if (err) {
                    res.status(403).json("Token is not valid");
                }
                req.user = user;
                next();
            });
        }
        else {
            res.status(401).json("You are not authenticated")
        }
    }

}

module.exports = authJwt;
