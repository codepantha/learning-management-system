const { register, login, show, profile, update } = require('../../controllers/staff/teacherController');
const isAdmin = require('../../middleware/isAdmin');
const isLoggedIn = require('../../middleware/isLoggedIn');
const isTeacher = require('../../middleware/isTeacher');

const router = require('express').Router();

router.post('/register', isLoggedIn, isAdmin, register);
router.post('/login', login)
router.get('/profile', isLoggedIn, isTeacher, profile);
router.route('/:id').get(isLoggedIn, show).put(isLoggedIn, isTeacher, update);

module.exports = router;
