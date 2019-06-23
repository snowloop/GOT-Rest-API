require('dotenv').config();
const express = require('express');

const bodyParser = require('body-parser');
const morgan = require('morgan');
const charactersRoutes = require('./api/routes/characters');
const uri = require('./config/keys').uri;
const app = express();
const mongoose = require('mongoose');

console.log(process.env.DB_PASSWORD)
console.log(typeof process.env.DB_PASSWORD)
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
  res.set('ETag', '12345');
  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.status(200).json({});
  }
})
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
