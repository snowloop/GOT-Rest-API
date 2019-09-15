const Schema = require('mongoose').Schema;
const model = require('mongoose').model;

const userSchema = new Schema({
  email : String,
  hash : String,
  isAdmin : Boolean
});

module.exports = model('User',userSchema);
