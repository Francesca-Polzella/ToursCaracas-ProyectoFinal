const mongoose = require('mongoose');

const sitioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: true
    },
    numero: {
        type: Number,
        required: true
    },
    coords: {
        type: Object,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Sitio', sitioSchema);