const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user');

router.post('/signup', (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;

  if (!email) {
    res.status(422).json({
      message: "Email parameter is missing"
    })
  } else if (!password) {
    res.status(422).json({
      message: "Password parameter is missing"
    })
  } else {
    User.findOne({
        email: email
      })
      .exec()
      .then(user => {
        if (user) {
          res.status(409).json({
            message: "Email is already registered"
          })
        } else {
          bcrypt.hash(password, 10)
            .then(hash => {
              const user = new User({
                email: email,
                password: hash
              });
              user.save()
                .then(user => {
                  res.status(201).json({
                    message: "User created"
                  })
                })
                .catch(err => next(err))
            })
            .catch(err => next(err))
        }
      })
      .catch(err => next(err))
  }
})


router.delete("/:userId",(req,res,next)=>{
  var userId = req.params.userId;
User.findOneAndRemove({
  _id :userId
})
.select("id email")
.exec()
.then(user=>{
  if(!user){
    res.status(404).json({
      message :"No user with this id"
    });
  } else {
  res.status(200).json({
    message : "User deleted",
    user : user
  });
}
})
.catch(err=>{
  next(err)
})
})

router.get("/",(req,res,next)=>{
  User.find()
  .exec()
  .then(users=>{
    res.status(200).json(users)
  })
})
module.exports = router;
