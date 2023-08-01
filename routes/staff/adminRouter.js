const {
  index,
  register,
  login,
  show,
  update,
  destroy,
  suspendTeacher,
  unsuspendTeacher,
  withdrawTeacher,
  unWithdrawTeacher,
  publishExamResult,
  unPublishExamResult
} = require('../../controllers/staff/adminController');

const adminRouter = require('express').Router();

// All admins
adminRouter.get('/', index);

// register
adminRouter.post('/register', register);

// login
adminRouter.post('/login', login);

// Get single admin
adminRouter.get('/:id', show);

// Update admin
adminRouter.put('/:id', update);

// Delete admin
adminRouter.delete('/:id', destroy);

// Suspend teacher
adminRouter.put('/suspend/teacher/:id', suspendTeacher);

// Unsuspend teacher
adminRouter.put('/unsuspend/teacher/:id', unsuspendTeacher);

// Withdraw teacher
adminRouter.put('/withdraw/teacher/:id', withdrawTeacher);

// Unwithdraw teacher
adminRouter.put('/unwithdraw/teacher/:id', unWithdrawTeacher);

// publish exam result
adminRouter.put('/publish/exam/:id', publishExamResult);

// publish exam result
adminRouter.put('/unpublish/exam/:id', unPublishExamResult);

module.exports = adminRouter;
