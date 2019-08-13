const express = require('express');
const Router = express.Router();
const Season = require('../models/season')
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
          number :number
        });
        season.save((err,season)=>{
          if(err){
            next(err);
          } else {
            res.status(200).json({
              message : "Season created",
              seasonId : season._id
            });
          }
        })
      }
    })
  }
});


module.exports = Router;
