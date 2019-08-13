const Schema = require('mongoose').Schema;
const model = require('mongoose').model;

const seasonSchema = new Schema(
  {
    number : Number
  }
);
module.exports = model('Season',seasonSchema);
