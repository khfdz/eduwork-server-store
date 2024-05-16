// cartItem.js
const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const cartItemSchema = Schema({
    name : {
        type: String,
        minlength: [5, 'Panjang nama makanan minimal 50 karakter'],
        required: [true, 'Nama makanan harus diisi'],
    },

    qty: {
        type: Number,
        required: [true, 'Kuantitas harus diisi'],
        min: [1, 'Kuantitas minimal 1'],
    },

    price: {
        type: Number,
        default: 0
    },

    image_url: {
        type: String
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },

    notes: {
        type: String,
        default: ''
    }

});

module.exports = model('CartItem', cartItemSchema);
