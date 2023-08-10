const { register, login } = require('../../controllers/staff/teacherController');
const isAdmin = require('../../middleware/isAdmin');
const isLoggedIn = require('../../middleware/isLoggedIn');

const router = require('express').Router();

router.post('/register', isLoggedIn, isAdmin, register);
router.post('/login', login)

module.exports = router;
