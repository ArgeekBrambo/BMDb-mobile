const jwt = require('jsonwebtoken');
const { User } = require("../models");

async function authentication(req, res, next) {
    try {
        const access_token = req.headers.access_token;
        // console.log(req.headers);
        if(!access_token) {
            throw { name: "AuthenticationFailed" };
        }
        let payload = jwt.verify(access_token, process.env.JWT_SECRET);
        let user = await User.findByPk(payload.id);
        if(!user) {
            throw { name: "AuthenticationFailed" };
        }
        req.user = { id: user.id, email: user.email, username: user.username };
        next();
    } catch(error) {
        next(error);
    }
}

module.exports = authentication;