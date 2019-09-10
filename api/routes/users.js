const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Router = express.Router();
const User = require('../models/user');

Router.post('/signup',(req,res,next)=>{
var email = req.body.email;
var password = req.body.password ;

if(!email || !password){
  res.status(422).json({
    message : "missing parameters"
  })
} else {
  const user = new User({
    email :email,
    password :password
  })
}
})

module.exports = Router;
