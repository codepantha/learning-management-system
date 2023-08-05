const {
  create,
  index,
  show,
  update,
  destroy
} = require('../../controllers/academics/AcademicYearController');
const isAdmin = require('../../middleware/isAdmin');

const router = require('express').Router();

router.route('/').get(isAdmin, index).post(isAdmin, create);
router
  .route('/:id')
  .get(isAdmin, show)
  .put(isAdmin, update)
  .delete(isAdmin, destroy);

module.exports = router;
