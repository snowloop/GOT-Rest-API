const Schema = require('mongoose').Schema;
const model = require('mongoose').model;

const userSchema = new Schema({
  email : String,
  password : String
});

module.exports = model('User',userSchema);
