const express = require('express');
const Router = express.Router();
const Season = require('../models/season')
const Character = require('../models/character');

// GET Request
// '/seasons'
// retrieve all seasons
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
        res.status(200).json(seasons);
      }
    })
});

// GET Request
// '/seasons/:nb'
// retrieve a season
Router.get('/:nb', (req, res, next) => {
  var nb = req.params.nb;

  Season.findOne({
    number: nb
  }).exec((err, season) => {
    if (err) {
      res.status(404).json({
        message : "No season with this number."
      })
    } else {
      res.status(200).json({
        number: season.number,
        deadCharacters: season.deadCharacters
      });
    }

  })
});

// POST Request
// '/seasons'
// Create a season
Router.post('/', (req, res, next) => {
  var number = req.body.number;

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
              seasonId: season.id
            });
          }
        })
      }
    })
  }
});

// PUT Request
// '/seasons/:nb'
// Add dead characters to the season
Router.put('/:nb', (req, res, next) => {
  var nb = req.params.nb;
  Season.findOne({
      number: nb
    })
    .exec((err, season) => {
      if (err) {
        next(err);
      } else if (!season) {
        res.status(404).json({
          message: "No season with this number."
        });
      } else {
        if (!req.body.deadCharacterIds) {
          res.status(422).json({
            message: "No ids where specified"
          });
        } else {
          var deadCharacterIds = JSON.parse(req.body.deadCharacterIds);

          if (!Array.isArray(deadCharacterIds)) {
            res.status(422).json({
              message: "deadCharacters parameters is not a list"
            });
          } else if (deadCharacterIds.length === 0) {
            res.status(422).json({
              message: "deadCharacters list if empty"
            });
          } else {
            Character.find({})
              .exec((err, characters) => {
                if (err) {
                  next(err);
                } else {
                  var characterIds = characters.map((character) => {
                    return character.id
                  });
                  var unfoundIds = [];
                  var foundIds = [];
                  for (var i = 0; i < deadCharacterIds.length; i++) {
                    var id = deadCharacterIds[i];
                    if (characterIds.indexOf(id) === -1) {
                      unfoundIds.push(id);
                    } else {
                      foundIds.push(id);
                      season.deadCharacters.push(id);
                    }
                  }
                  if (foundIds.length === 0) {
                    res.status(422).json({
                      message: "None of the ids could be found."
                    });
                  } else {
                    season.save((err, season) => {
                      if (err) {
                        next(err)
                      } else if (unfoundIds.length !== 0) {
                        res.status(207).json({
                          message: "Season number " + nb + " has been updated but somes character ids could not be found",
                          unfoundIds: unfoundIds
                        });
                      } else {
                        res.status(202).json({
                          message: "Season number " + nb + " has been updated."
                        });
                      }
                    })
                  }
                }
              })
          }
        }
      }
    })
})


module.exports = Router;
