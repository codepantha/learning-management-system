const adminRouter = require('express').Router();

// All admins
adminRouter.get('/', (req, res) => {
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
})

// register
adminRouter.post('/register', (req, res) => {
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
})

// login
adminRouter.post('/login', (req, res) => {
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
})

// Get single admin

adminRouter.get('/:id', (req, res) => {
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
}) 

// Update admin
adminRouter.put('/:id', (req, res) => {
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
}) 

// Delete admin
adminRouter.delete('/:id', (req, res) => {
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
}) 

// Suspend teacher
adminRouter.put('/suspend/teacher/:id', (req, res) => {
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
}) 

// Unsuspend teacher
adminRouter.put('/unsuspend/teacher/:id', (req, res) => {
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
}) 

// Withdraw teacher
adminRouter.put('/withdraw/teacher/:id', (req, res) => {
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
}) 

// Unwithdraw teacher
adminRouter.put('/unwithdraw/teacher/:id', (req, res) => {
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
}) 

// publish exam result
adminRouter.put('/publish/exam/:id', (req, res) => {
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
});

// publish exam result
adminRouter.put('/unpublish/exam/:id', (req, res) => {
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
});

module.exports = adminRouter;
