'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    //_id
    nomeCompleto: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique:true,
        index: true
    },
    senha: {
        type: String,
        required: true,
        trim: true
    },
    ativo: {
        type: Boolean,
        required: true,
        default: true
    }
});

module.exports = mongoose.model('User', schema);