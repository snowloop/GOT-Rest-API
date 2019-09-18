const router = require('express').Router();
const CharacterController = require('../controllers/characters');
const checkAuthUser = require('../middleware/check-auth').checkAuthUser;
const checkAuthAdmin = require('../middleware/check-auth').checkAuthAdmin;

// GET Request
// '/characters'
// retrieve all characters
// No auth
router.get('/',CharacterController.getAllCharacters);

// GET Request
// '/characters/:id'
// retrieve a character
// No auth
router.get('/:id',CharacterController.getCharacter);

// POST Request
// '/characters'
// create a character
// User auth
router.post('/', checkAuthUser,CharacterController.createCharater);

// DELETE Request
// '/characters/:id'
// delete a character
// Admin auth
router.delete('/:id',checkAuthAdmin,CharacterController.deleteCharacter);

module.exports = router;
