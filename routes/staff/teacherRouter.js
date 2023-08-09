const { register } = require('../../controllers/staff/teacherController');
const isAdmin = require('../../middleware/isAdmin');

const router = require('express').Router();

router.post('/register', isAdmin, register);

module.exports = router;
