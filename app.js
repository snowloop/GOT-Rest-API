require('dotenv').config();
const express = require('express');

const bodyParser = require('body-parser');
const morgan = require('morgan');
const charactersRouter = require('./api/routes/characters');
const seasonsRouter = require('./api/routes/seasons');
const uri = require('./config/keys').uri;
const app = express();
const mongoose = require('mongoose');


mongoose.connect(uri.replace('<password>', process.env.DB_PASSWORD), {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Connection with the database : OK")
  }).catch((err) => {
    console.log('Error during connection :' + err)
  });


app.use(morgan('dev'));
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
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.status(200).json({});
  }
  next();
})
// Characters Routes
app.use('/characters', charactersRouter);
// Seasons Routes
app.use('/seasons',seasonsRouter);
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
