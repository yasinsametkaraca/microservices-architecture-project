const express = require('express');
const cors  = require('cors');
const { customer, appEvents } = require('./api');
const { CreateChannel, SubscribeMessage } = require('./utils')
const HandleErrors = require('./utils/error-handler')

module.exports = async (app) => {

    app.use(express.json());
    app.use(cors());
    app.use(express.static(__dirname + '/public'))

    app.use((req, res, next) => {
        console.log(`Request received on ${req.url} with method ${req.method}`);
        next();
    });

    // Listen to events
    appEvents(app);

    const channel = await CreateChannel()

    customer(app, channel);

    // error handling
    app.use(HandleErrors);
}
