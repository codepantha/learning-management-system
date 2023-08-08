const {
  index,
  create,
  show,
  update,
  destroy,
  getProgramSubjects,
  createProjectSubject
} = require('../../controllers/academics/ProgramController');
const isAdmin = require('../../middleware/isAdmin');

const router = require('express').Router();

router.route('/').get(isAdmin, index).post(isAdmin, create);
router
  .route('/:programId/subjects')
  .get(isAdmin, getProgramSubjects)
  .post(isAdmin, createProjectSubject);
router
  .route('/:id')
  .get(isAdmin, show)
  .put(isAdmin, update)
  .delete(isAdmin, destroy);

module.exports = router;
