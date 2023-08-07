
const { index, show, update, destroy } = require('../../controllers/academics/SubjectController');
const isAdmin = require('../../middleware/isAdmin');

const router = require('express').Router();

router.route('/').get(isAdmin, index)
router
  .route('/:id')
  .get(isAdmin, show)
  .put(isAdmin, update)
  .delete(isAdmin, destroy);

module.exports = router;
