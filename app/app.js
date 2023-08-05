const express = require('express');
const morgan = require('morgan');
require('express-async-errors');
const adminRouter = require('../routes/staff/adminRouter');
const academicYearRouter = require('../routes/academics/academicYearRouter');
const { globalErrorHandler, notFoundError } = require('../middleware/globalErrorHandler');

const app = express();

//=======Middleware=========//
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/v1/admins', adminRouter);
app.use('/api/v1/academic-years', academicYearRouter)

// Error middleware
app.use(notFoundError)
app.use(globalErrorHandler);

module.exports = app;
