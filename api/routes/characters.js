const express = require('express');
const router = express.Router();
const fs = require('fs');

// GET Request
// '/characters'
// retrieve all characters
router.get('/',
  (req, res) => {
    fs.readFile(__dirname + '/characters.json', (err, data) => {
      if (err) {
        next(err)
      } else {
        res.status(200)
          .json(JSON.parse(data));
      }

    });
  });

// GET Request
// '/characters/:id'
// retrieve a character
router.get('/:id',
  (req, res, next) => {
    fs.readFile(__dirname + '/characters.json', (err, data) => {
      if (err) {
        next(error);
      } else {
        var id = req.params.id;
        var charactersDB = JSON.parse(data);
        if (Object.keys(charactersDB).indexOf(id.toString()) === -1) {
          var error = new Error("no item with this id");
          error.status = 404;
          next(error);
        } else {
          res.status(200)
            .json(charactersDB[id.toString()]);
        }
      }
    });
  });

// POST Request
// '/characters/:id'
// create a character
router.post('/', (req, res, next) => {
  console.log(req.body)
  if (req.body.firstName && req.body.lastName) {
    console.log("begin")
    fs.readFile(__dirname + '/characters.json', (err, data) => {
      if (err) {
        console.log("not OK")
        next(err);
      } else {
        console.log("OK")
        var charactersDB = JSON.parse(data);
        var idArray = Object.keys(charactersDB)
          .map((id) => {
            return Number(id);
          });
        var maxId = null;
        idArray.forEach((id) => {
          if (id > maxId) {
            maxId = id;
          }
        })
        var newId = maxId + 1;
        charactersDB[newId] = {
          "firstName": req.body.firstName,
          "lastName": req.body.lastName
        };

        fs.writeFile(__dirname + '/characters.json', JSON.stringify(charactersDB), (err) => {
          if (err) {
            next(err);
          } else {
            res.status(200).json({
              message: "character created",
              [newId]: charactersDB[newId]
            })
          }
        })
      }
    })
  } else {
    res.status(422).json({
      message: 'missing parameters'
    })
  }
})

module.exports = router;
