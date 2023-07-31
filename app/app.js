const express = require('express')
const morgan = require('morgan')

const app = express();

//=======Middleware=========//
app.use(morgan('dev'))

// Routes

// admin register
app.post('/api/v1/admins/register', (req, res) => {
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

// admin login
app.post('/api/v1/admins/login', (req, res) => {
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

// get all admins
app.get('/api/v1/admins', (req, res) => {
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

// /admin/:id
app.get('/api/v1/admins/:id', (req, res) => {
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
});

// update admin
app.put('/api/v1/admins/:id', (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: 'deleted admin'
    });
  } catch (error) {
    res.json({
      status: 'failed',
      error: error.message,
    })
  }
})

// delete admin
app.delete('/api/v1/admins/:id', (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: 'update admin'
    });
  } catch (error) {
    res.json({
      status: 'failed',
      error: error.message,
    })
  }
})

// suspend teacher
app.put('/api/v1/admins/suspend/teacher/:id', (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: 'teacher suspended'
    });
  } catch (error) {
    res.json({
      status: 'failed',
      error: error.message,
    })
  }
})

// unsuspend teacher
app.put('/api/v1/admins/unsuspend/teacher/:id', (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: 'teacher suspension lifted'
    });
  } catch (error) {
    res.json({
      status: 'failed',
      error: error.message,
    })
  }
})

// withdraw teacher
app.put('/api/v1/admins/withdraw/teacher/:id', (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: 'teacher withdrawn'
    });
  } catch (error) {
    res.json({
      status: 'failed',
      error: error.message,
    })
  }
})
// unwithdraw teacher
app.put('/api/v1/admins/unwithdraw/teacher/:id', (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: 'teacher withdrawal reversed'
    });
  } catch (error) {
    res.json({
      status: 'failed',
      error: error.message,
    })
  }
})

// admin publishing exam results
app.put('/api/v1/admins/publish/exam/:id', (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: 'admin publish result'
    });
  } catch (error) {
    res.json({
      status: 'failed',
      error: error.message,
    });
  }
})

// admin unpublishing exam results
app.put('/api/v1/admins/unpublish/exam/:id', (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: 'admin unpublish result'
    });
  } catch (error) {
    res.json({
      status: 'failed',
      error: error.message,
    });
  }
})



module.exports = app;
