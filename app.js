const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const charactersRoutes = require('./api/routes/characters');
const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Characters Routes
app.use('/characters', charactersRoutes);

// Main error
app.use((req, res, next) => {
  var error = new Error('Not Found');
  error.status = 404;
  next(error);
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
    .json({
      error: {
        message: error.message
      }
    });

});

module.exports = app;
