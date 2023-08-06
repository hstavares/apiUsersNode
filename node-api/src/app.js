'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const appsettings = require('./appsettings');

//swagger
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../swagger');
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const app = express();
const router = express.Router();

//conexão com banco nosql
mongoose.connect(appsettings.connectionString);

//carrega models
const User = require('./models/user');

//rotas
const indexRoute = require('./routes/index-route');
const userRoute = require('./routes/user-route');
const loginRoute = require('./routes/login-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


app.use('/', indexRoute);
app.use('/users', userRoute);
app.use('/login', loginRoute);

module.exports = app;