const express = require('express');
const cors  = require('cors');
const { customer, appEvents } = require('./api');
const { CreateChannel, SubscribeMessage } = require('./utils')
const HandleErrors = require('./utils/error-handler');

module.exports = async (app) => {

    app.use(express.json());
    app.use(cors());
    app.use(express.static(__dirname + '/public'))

    // Listen for events from other
    appEvents(app);

    const channel = await CreateChannel()
    // API routes
    customer(app, channel);

    // Handle errors
    app.use(HandleErrors);
}
