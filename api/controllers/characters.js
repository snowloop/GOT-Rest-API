const Character = require('../models/character');
const Season = require('../models/season');

exports.getAllCharacters = (req, res, next) => {
  Character.find({})
    .select("firstName lastName")
    .exec((err, charactersArray) => {
      if (err) {
        next(err);
      } else {
        var charactersObject = {};
        charactersArray.forEach((character) => {
          charactersObject[character.id] = character.firstName + " " + character.lastName
        });
        res.status(200).json(charactersObject);
      };
    });
};

exports.getCharacter = (req, res, next) => {
    var id = req.params.id;
    Character.findById(id)
      .exec((err, character) => {
        if (err && err.name === "CastError") {
          res.status(422).json({
            message: "Id parameter has not the right format"
          })
        } else if (err) {
          next(err);
        } else if (!character) {
          res.status(404).json({
            message: "No character with this id."
          })
        } else {
          Season.findOne({
              'deadCharacters': id
            })
            .select("number")
            .exec((err, season) => {
              if (err) {
                next(err);
              } else if (season) {
                res.status(200).json({
                  id: character.id,
                  firstName: character.firstName,
                  lastName: character.lastName,
                  deathSeason: season.number
                });
              } else {
                res.status(200).json({
                  id: character.id,
                  firstName: character.firstName,
                  lastName: character.lastName,
                  deathSeason: undefined
                });
              }
            })
        }
      });
  };

exports.createCharater = (req, res, next) => {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;

  if (!firstName || !lastName) {
    res.status(422).json({
      message: 'missing parameters'
    });
  } else {
    Character.findOne({
        firstName: firstName,
        lastName: lastName
      })
      .exec((err, character) => {
        if (err) {
          next(err);
        } else if (character) {
          res.status(409).json({
            message: 'Character already exists'
          })
        } else {
          let character = new Character({
            firstName: firstName,
            lastName: lastName
          });

          character.save((err, character) => {
            if (err) {
              next(err);
            } else {
              res.status(201).json({
                message: 'Character created',
                characterId: character.id
              })
            }
          })
        }
      });
  }
};

exports.deleteCharacter = (req, res, next) => {
  var id = req.params.id;
  Character.findByIdAndRemove(id)
    .exec((err, character) => {
      if (err && err.name === 'CastError') {
        res.status(422).json({
          message: "Id parameter has not the right format"
        });
      } else if (err) {
        next(err);
      } else if (!season) {
        res.status(404).json({
          message: "No season with this id."
        })
      } else {
        res.status(200).json({
          'message': 'Character deleted',
          'character': character
        });
      }
    });
};
