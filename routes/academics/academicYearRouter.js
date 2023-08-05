const { create } = require('../../controllers/academics/AcademicYearController');
const isAdmin = require('../../middleware/isAdmin');
const isLoggedIn = require('../../middleware/isLoggedIn');

const router = require('express').Router();

router.route('/').post(isLoggedIn, isAdmin, create);

module.exports = router;
