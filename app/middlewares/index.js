const { getToken } = require("../../utils")
const jwt = require("jsonwebtoken")
const config = require("../config")
const User = require("../user/model")
const { policyFor } = require("../../utils")


function decodeToken() {
    return async function (req, res, next) {
        try {
            let token = getToken(req)

            if(!token) return next();

            req.user = jwt.verify(token, config.secretKey)

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

// middleware untuk cek hak akses
function police_check(action, subject) {
    return function(req, res, next) {
        let policy = policyFor(req.user);
        if(!policy.can(action, subject)) {
            return res.json({
                error: 1,
                message: `You are not allowed to ${action} ${subject}`
            });
        }
        next();
    }
}

module.exports = {
    decodeToken,
    police_check
}