require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const charactersRouter = require('./api/routes/characters');
const seasonsRouter = require('./api/routes/seasons');
const usersRouter = require('./api/routes/users');
const uri = require('./config/keys').uri;
const app = express();
const mongoose = require('mongoose');

mongoose.connect(uri.replace('<password>', process.env.DB_PASSWORD), {
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("Connection with the database : OK")
  }).catch((err) => {
    console.log('Error during connection :' + err)
  });

// Logging Tool
app.use(morgan('dev'));

// URL and Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use((req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, Authorization',

  });
  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    res.status(200).json({});
  }
  next();
})
// Characters Routes
app.use('/characters', charactersRouter);
// Seasons Routes
app.use('/seasons',seasonsRouter);
// Users Routes
app.use('/users',usersRouter);

// Error for no found route
app.use((req, res, next) => {
  var error = new Error('URL Not Found');
  error.status = 404;
  next(error);
})

// if error
app.use((error, req, res, next) => {
  res.status(error.status || 500)
    .json({
      error: {
        message: error.message
      }
    });

});

module.exports = app;
