const express = require('express');
const router = express.Router();
const fs = require('fs');

// GET Request
// '/characters'
// retrieve all characters
router.get('/',
  (req, res) => {
    // Fake database import
    var database = JSON.parse(
      fs.readFileSync(__dirname + '/characters.json')
      .toString()
    );
    res.status(200)
      .json(database);
  })

router.get('/:id',
(req,res)=> {
  var database = JSON.parse(
    fs.readFileSync(__dirname + '/characters.json')
    .toString()
  );
  var id = req.params.id;

  if (Object.keys(database).indexOf(id) !== -1){
    res.status(200)
    .json({
      id : database[id]
    })
  } else {
res.status(400).json(
  {
    message:"no item with this id"
  }
)
  }
})
module.exports = router;
