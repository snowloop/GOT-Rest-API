const express = require('express');
const router = express.Router();
const fs = require('fs');
const Character = require('../models/character')


// GET Request
// '/characters'
// retrieve all characters
router.get('/', (req, res, next) => {
  Character.find({})
    .exec((err, characters) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json(characters)
      };
    });
});

// GET Request
// '/characters/:id'
// retrieve a character
router.get('/:id',
  (req, res, next) => {
    var id = req.params.id;
    Character.findById(id)
      .exec((err, character) => {
        if (err) {
          var error = new Error("No character with this id");
          error.status = 400,
          next(error);
        } else {
            res.status(200).json(character);
        }
      });
  });

// POST Request
// '/characters'
// create a character
router.post('/', (req, res, next) => {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var deathSeason = req.body.deathSeason;

  if (!firstName || !lastName) {
    res.status(422).json({
      message: 'missing parameters'
    })
  } else {
    var query = Character.findOne({
      firstName: firstName,
      lastName: lastName
    });

    query.exec((err, character) => {
      if (err) {
        next(err);
      } else if (character) {
        res.status(300).json({
          message: 'Character already exists'
        })
      } else {
        if (!deathSeason) {
          let deathSeason = null;
        }
        let character = new Character({
          firstName: firstName,
          lastName: lastName,
          deathSeason: deathSeason
        });

        character.save((err, character) => {
          if (err) {
            next(err);
          } else {
            res.status(201).json({
              message: 'Character created',
              characterId: character
            })
          }
        })
      }
    });
  }
});
module.exports = router;
