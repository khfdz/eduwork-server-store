const User = require('../user/model');
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');
const {getToken} = require ('../../utils');

const register = async (req, res, next) => {
    try {
        const payload = req.body;
        
        let user = new User(payload);
        await user.save();
        return res.json(user);
    } catch (err) {
        if(err && err.name === 'ValidationError') {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            });
        }
        next(err);
    }
}

const localStrategy = async (email, password, done) => {
    try {
        let user = 
        await User
        .findOne({email})
        .select('-createdAt -updatedAt -cart_items -token');
    if(!user) return done();
    if(bcrypt.compareSync(password, user.password)){
        ( {password, ...userWithoutPassword} = user.toJSON() );
        return done(null, userWithoutPassword);
    }
} catch (err) {
    done(err, null);
}
    done();
}

const login = async (req, res, next) => {
    passport.authenticate('local', async function (err, user) {
        if (err) {
            console.error('Error during authentication:', err); // Console log jika terjadi error selama proses otentikasi
            return next(err);
        }

        if (!user) {
            console.log('Login failed: email / password not found'); // Console log jika email atau password tidak ditemukan
            return res.json({ error: 1, message: 'email / password not found' });
        }

        try {
            let signed = jwt.sign(user, config.secretKey);

            // Simpan token ke dalam basis data
            await User.findByIdAndUpdate(user._id, { $push: { token: signed } });

            console.log('Login success:', user); // Console log jika login berhasil
            return res.json({
                message: 'login success',
                user,
                token: signed
            });
        } catch (error) {
            console.error('Failed to generate token:', error); // Console log jika gagal menghasilkan token
            return next(error);
        }
    })(req, res, next);
};




const logout = (req, res, next) => {
    let token = getToken(req);

    let user = User.findOneAndUpdate({token: {$in: [token]}}, {$pull: {token: token}}, {useFindAndModify: false});

    if (!token || !user) {
         res.json({
            error: 1,
            message: 'No User Found'
        });
    }

    return res.json({
        error: 0,
        message: 'Logout Success'
    });
}

const me = (req, res, next) => {
    if(!req.user) {
        res.json({
            error: 1,
            message: `You're not login or token expired`
        })
    }
    res.json(req.user)
}

module.exports = {
    register,
    localStrategy,
    login,
    logout,
    me
}