const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const HASH_ROUNDS = 10;

const userSchema = new mongoose.Schema({
  us_id: {
    type: Number,
    unique: true,
  },
  us_name: {
    type: String,
    required: true,
  },
  us_password: {
    type: String,
    required: true,
  },
  us_email: {
    type: String,
    required: true,
    unique: true,
  },
  us_phone_number: {
    type: String,
    required: true,
    unique: true,
  },
  us_address: {
    type: String,
    required: true,
  },
  us_created_at: {
    type: Date,
    default: Date.now,
  },
  us_updated_at: {
    type: Date,
    default: Date.now,
  },
}, { collection: 'Users' });

userSchema.plugin(AutoIncrement, { inc_field: 'us_id' });

userSchema.pre('save', function(next) {
  this.us_password = bcrypt.hashSync(this.us_password, HASH_ROUNDS);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.us_password);
};

userSchema.path('us_email').validate(function(value) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
}, 'Invalid email address');

userSchema.path('us_email').validate(async function (value) {
  const user = await mongoose.models.Users.findOne({ us_email: value });
  return !user;
}, 'Email already exists');

const User = mongoose.model('Users', userSchema);

module.exports = User;
