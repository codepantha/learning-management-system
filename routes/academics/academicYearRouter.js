const { create, index, show } = require('../../controllers/academics/AcademicYearController');
const isAdmin = require('../../middleware/isAdmin');

const router = require('express').Router();

router.route('/').get(isAdmin, index).post(isAdmin, create);
router.route('/:id').get(isAdmin, show);

module.exports = router;
