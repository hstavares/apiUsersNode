'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

//conexão com banco nosql
mongoose.connect('mongodb+srv://hstavares:uXWmNltDsaBu8fRR@usersapi.jtp28dh.mongodb.net/?retryWrites=true&w=majority');

//carrega models
const User = require('./models/user');

//rotas
const indexRoute = require('./routes/index-route');
const userRoute = require('./routes/user-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


app.use('/', indexRoute);
app.use('/users', userRoute); 

module.exports = app;