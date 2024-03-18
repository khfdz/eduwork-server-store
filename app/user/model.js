const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const bcrypt = require('bcrypt');

let userSchema = Schema({

    full_name: {
        type: String,
        required: [true, 'Nama harus diisi'],
        maxlength: [255, 'Panjang nama haurs antara 3 - 255 karakter'],
        minlength: [3, 'Panjang nama harus antara 3 - 255 karakter']
    },

    customer_id: {
        type: Number,
    },

    email: {
        type: String,
        required: [true, 'Email harus diisi'],
        maxlength: [255, 'Panjang email maksimal 255 karakter'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'Password harus diisi'],
        maxlength: [255, 'Panjang password maksimal 255 karakter']
    },

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },

    token: [String]

    }, {
        timestamps: true
    })

    userSchema.path('email').validate(function(value) {
        const EMAIL_RE = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return EMAIL_RE.test(value);
        }, attr => `${attr.value} Harus merupakan email yang valid !`
        )
        
        userSchema.path('email').validate(async function(value) {
            try {
                const count = await this.model('User').countDocuments({ email: value });
                return count === 0;
            } catch (err) {
                throw err;
            }
        }, attr => `${attr.value} Sudah terdaftar !`);
        

const HASH_ROUNDS = 10;
userSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, HASH_ROUNDS);
    next();
    })

    userSchema.plugin(AutoIncrement, { inc_field: 'customer_id' })

    module.exports = model('User', userSchema)