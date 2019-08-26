const Schema = require('mongoose').Schema;
const model = require('mongoose').model;

const characterSchema = new Schema({
  firstName: String,
  lastName: String,
  rank: String,
  deathSeason: [{
    type: Schema.Types.ObjectId,
    ref: 'Season'
  }]
});

module.exports = model('Character', characterSchema);
