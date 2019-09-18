const express = require('express');
const Router = express.Router();

const SeasonController = require('../controllers/seasons')
const checkAuthUser = require('../middleware/check-auth').checkAuthUser;

// GET Request
// '/seasons'
// retrieve all seasons
// No auth
Router.get('/', SeasonController.getAllSeasons);

// GET Request
// '/seasons/:nb'
// retrieve a season
// No auth
Router.get('/:nb',SeasonController.getSeason);

// PUT Request
// '/seasons/:nb'
// Add dead characters to the season
// User auth
Router.put('/:nb', checkAuthUser,SeasonController.addCharacters);

module.exports = Router;
