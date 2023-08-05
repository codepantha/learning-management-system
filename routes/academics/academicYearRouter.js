const { create, index, show, update } = require('../../controllers/academics/AcademicYearController');
const isAdmin = require('../../middleware/isAdmin');

const router = require('express').Router();

router.route('/').get(isAdmin, index).post(isAdmin, create);
router.route('/:id').get(isAdmin, show).put(isAdmin, update);

module.exports = router;
