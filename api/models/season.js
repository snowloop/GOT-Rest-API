const Schema = require('mongoose').Schema;
const model = require('mongoose').model;

const seasonSchema = new Schema({
  number: Number,
  deadCharacters: [{
    type: Schema.Types.ObjectId,
    ref: 'Character'
  }]
});
module.exports = model('Season', seasonSchema);
