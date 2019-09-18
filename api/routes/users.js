const router = require('express').Router();

const checkAuthUser = require('../middleware/check-auth').checkAuthUser;
const checkAuthAdmin = require('../middleware/check-auth').checkAuthAdmin;

const UserController = require('../controllers/users');
// POST Request
// '/users/signup'
// Signup the user
router.post('/signup',UserController.signup);

// GET Request
// '/users/login'
// login URL
router.post("/login", UserController.login);

// DELETE Request
// '/users/:userId'
// Delete a user
router.delete("/:userId", checkAuthAdmin ,UserController.deleteUser);

// GET Request
// '/users'
// retrieve all users email
router.get("/", checkAuthAdmin ,UserController.getAllUsers);

module.exports = router;
