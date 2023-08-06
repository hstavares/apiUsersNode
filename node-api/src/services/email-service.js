'use strict';

var appsettings = require('../appsettings');
var sendgrid = require('sendgrid')(appsettings.sendgridKey);

exports.send = async (to, subject, body) => [
    sendgrid.send({
        to: to,
        from: 'hugodesouzatavares@gmail.com',
        subject: subject,
        html: body
    })
]