const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const tagSchema = Schema({

    name: {
        type: String,
        minlength: [3, 'Panjang nama tag minimal 3 karakter'],
        maxlength: [255, 'Panjang nama tag maksimal 255 karakter'],
        required: [true, 'Nama tag harus diisi']
    },

    image_url: {
        type: String
    },
})

module.exports = model('Tag', tagSchema)