const express = require("express");
const sectionsRouter = require("./sections");

const app = express();

app.use("/sections/", sectionsRouter);

module.exports = app;
