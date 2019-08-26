const express = require('express');
const Router = express.Router();
const Season = require('../models/season')
const Character = require('../models/character');

Router.get('/', (req, res, next) => {
  Season.find({})
    .exec((err, seasons) => {
      if (err) {
        next(err);
      } else {
        seasons = seasons.map((season)=>{
          return {
            number : season.number,
            numberOfDeadCharacters : season.deadCharacters.length
          }
        });
        res.status(200).json(seasons)
      }
    })
});

Router.get('/:nb', (req, res, next) => {
  var nb = req.params.nb;

  Season.findOne({
    number: nb
  }).exec((err, season) => {
    if (err) {
      var error = new Error("No season with this number.");
      error.status = 400;
      next(error);
    } else {
      res.status(200).json({
        number : season.number,
        deadCharacters : season.deadCharacters
      })
    }

  })
});

Router.post('/', (req, res, next) => {
  var number = req.body.number

  if (!number) {
    res.status(422).json({
      message: 'missing parameters'
    })
  } else {
    var query = Season.findOne({
      number: number
    });
    query.exec((err, season) => {
      if (err) {
        next(err);
      } else if (season) {
        res.status(300).json({
          message: "Season already exists"
        });
      } else {
        let season = new Season({
          number: number
        });
        season.save((err, season) => {
          if (err) {
            next(err);
          } else {
            res.status(200).json({
              message: "Season created",
              seasonId: season._id
            });
          }
        })
      }
    })
  }
});

Router.put('/id')

module.exports = Router;
