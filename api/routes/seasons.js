const express = require('express');
const Router = express.Router();
const Character = require('../models/character');

Router.get('/', (req, res, next) => {
  Character.find({})
    .exec((err, characters) => {
      if (err) {
        next(err);
      } else {


        res.status(200).json()
      }
    })
});

Router.get('/:nb', (req, res, next) => {
  var nb = req.params.nb;

  Character.find({
      deathSeason: nb
    })
    .exec((err, characters) => {
      if (err) {
        next(err);
      } else {


        res.status(200).json()
      }
    })
});



module.exports = Router;
