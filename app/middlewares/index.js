const { getToken } = require("../../utils")
const jwt = require("jsonwebtoken")
const config = require("../config")
const User = require("../user/model")

function decodeToken() {
    return async function (req, res, next) {
        try {
            let token = getToken(req)
            if(!token) return next();

            req.user = jwt.verify(token, config.secretkey)

            let user = await User.findOne({token: {$in: [token]}})
            if(!user) {
                res.json({
                    error: 1,
                    message: 'Token Expired'
                })
                return;
            }
        } catch (err) {
            if(err && err.name === 'JsonWebTokenError') {
                return res.json({
                    error: 1,
                    message: err.message
                })
            }
            next(err);
        }
            return next();
    }
}

module.exports = {
    decodeToken
}