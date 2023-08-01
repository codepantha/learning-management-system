const express = require('express');
const morgan = require('morgan');
require('express-async-errors');
const adminRouter = require('../routes/staff/adminRouter');

const app = express();

//=======Middleware=========//
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/v1/admins', adminRouter);

// Error middleware
app.use((err, req, res, next) => {
  if (err) {
    const stack = err.stack;
    const message = err.message;
    const status = err.status ? err.status : 'failed';
    const statusCode = err.statusCode ? err.statusCode : 500;

    return res.status(statusCode).json({ status, message, stack });
  }
  next();
});

module.exports = app;
