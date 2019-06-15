const express = require('express');
const charactersRoutes = require('./api/routes/characters');
const app = express();


app.use('/characters',charactersRoutes);

module.exports = app;
