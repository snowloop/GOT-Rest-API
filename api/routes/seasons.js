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
        seasons = seasons.map((season) => {
          return {
            number: season.number,
            numberOfDeadCharacters: season.deadCharacters.length
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
        number: season.number,
        deadCharacters: season.deadCharacters
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

Router.put('/:nb', (req, res, next) => {
  var nb = req.params.nb;

  Season.findOne({
      number: nb
    })
    .exec((err, season) => {
      if (err) {
        console.log(err)
      } else if (!season) {
        res.status(404).json({
          message: "No season with this number."
        })
      } else {
        var deadCharacterIds = JSON.parse(req.body.deadCharacters);

        if (!Array.isArray(deadCharacterIds)) {
          res.status(422).json({
            message: "deadCharacters parameters is not a list"
          })
        } else if (deadCharacterIds.length === 0) {
          res.status(422).json({
            message: "deadCharacters list if empty"
          })
        } else {
          Character.find({})
            .exec((err, characters) => {
              if (err) {
                next(err);
              } else {
                var characterIds = characters.map((character) => {
                  return character._id
                });

                var unfoundIds = []
                var foundIds = []
                for (var i = 0; i < deadCharacterIds.length; i++) {
                  let id = deadCharacterIds[i]
                  if (characterIds.index(id) !== -1) {
                    unfoundIds.push(id);
                  } else {
                    foundIds.push(id);
                  }
                }
                
              }
            })
        }
      }
    })
})


module.exports = Router;
