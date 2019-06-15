const express = require('express');
const router = express.Router();
const fs = require('fs');

// Fake database import
var database = JSON.parse(
  fs.readFileSync( __dirname + '/characters.json')
  .toString()
);

// GET Request
// '/characters'
// retrieve all characters
router.get('/',
  (req,res,next)=>{

res.status(200)
.json(database);
})

module.exports = router;
