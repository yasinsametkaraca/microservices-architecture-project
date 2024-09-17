const express = require("express");
const cors = require("cors");
const path = require("path");
const { products, appEvents } = require("./api");
const HandleErrors = require("./utils/error-handler");

const { CreateChannel } = require("./utils");

module.exports = async (app) => {
  app.use(express.json());
  app.use(cors());
  app.use(express.static(__dirname + "/public"));

  // Listen for app events
  // appEvents(app);

  const channel = await CreateChannel();

  // products routes
  products(app, channel);

  // error handling
  app.use(HandleErrors);
};
