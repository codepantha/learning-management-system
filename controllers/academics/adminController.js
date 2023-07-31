//@desc Register admin
//@route POST /api/v1/admins/register
//@access Private

exports.register = (req, res) => {
  try {
    res.status(201).json({
      status: 'success',
      data: 'Admin has been registered',
    });
  } catch (error) {
    res.json({
      status: 'failed',
      error: error.message
    });
  }
}

//@desc Login admin
//@route POST /api/v1/admins/login
//@access Private

exports.login = (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: 'Login successful'
    })
  } catch (error) {
    res.json({
      status: 'failed',
      error: error.message,
    })
  }
}

//@desc Get all admins
//@route GET /api/v1/admins
//@access Private

exports.index = (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: 'All admins'
    })
  } catch (error) {
    res.json({
      status: 'failed',
      error: error.message,
    })
  }
}

//@desc Get single admin
//@route GET /api/v1/admins/:id
//@access Private

exports.show = (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: 'Single admin'
    })
  } catch (error) {
    res.json({
      status: 'failed',
      error: error.message,
    })
  }
}

//@desc Update single admin
//@route PUT /api/v1/admins/:id
//@access Private

exports.update = (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: 'Updated admin'
    })
  } catch (error) {
    res.json({
      status: 'failed',
      error: error.message,
    })
  }
}

//@desc Delete single admin
//@route DELETE /api/v1/admins/:id
//@access Private

exports.destroy = (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: 'Deleted admin'
    })
  } catch (error) {
    res.json({
      status: 'failed',
      error: error.message,
    })
  }
}

//@desc Suspend a teacher
//@route PUT /api/v1/admins/suspend/teacher/:id
//@access Private

exports.suspendTeacher = (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: 'Suspended teacher'
    })
  } catch (error) {
    res.json({
      status: 'failed',
      error: error.message,
    })
  }
}

//@desc Unsuspend a teacher
//@route PUT /api/v1/admins/unsuspend/teacher/:id
//@access Private

exports.unsuspendTeacher = (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: 'teacher suspension lifted'
    })
  } catch (error) {
    res.json({
      status: 'failed',
      error: error.message,
    })
  }
}

//@desc Withdraw a teacher
//@route PUT /api/v1/admins/withdraw/teacher/:id
//@access Private

exports.withdrawTeacher = (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: 'Withdrawn teacher'
    })
  } catch (error) {
    res.json({
      status: 'failed',
      error: error.message,
    })
  }
}

//@desc unWithdraw a teacher
//@route PUT /api/v1/admins/unwithdraw/teacher/:id
//@access Private

exports.unWithdrawTeacher = (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: 'teacher withdrawal reversed'
    })
  } catch (error) {
    res.json({
      status: 'failed',
      error: error.message,
    })
  }
}

//@desc publish exam result
//@route PUT /api/v1/admins/publish/exam/:id
//@access Private

exports.publishExamResult = (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: 'exam results published'
    })
  } catch (error) {
    res.json({
      status: 'failed',
      error: error.message,
    })
  }
};

//@desc unpublish exam result
//@route PUT /api/v1/admins/unpublish/exam/:id
//@access Private

exports.unPublishExamResult = (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: 'exam results unpublished'
    })
  } catch (error) {
    res.json({
      status: 'failed',
      error: error.message,
    })
  }
}
