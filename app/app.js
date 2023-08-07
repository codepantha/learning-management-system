const express = require('express');
const morgan = require('morgan');
require('express-async-errors');
const adminRouter = require('../routes/staff/adminRouter');
const academicYearRouter = require('../routes/academics/academicYearRouter');
const academicTermRouter = require('../routes/academics/academicTermRouter');
const classLevelRouter = require('../routes/academics/classLevelRouter');
const programRouter = require('../routes/academics/programRouter');
const { globalErrorHandler, notFoundError } = require('../middleware/globalErrorHandler');
const isLoggedIn = require('../middleware/isLoggedIn');

const app = express();

//=======Middleware=========//
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/v1/admins', adminRouter);
app.use('/api/v1/academic-years', isLoggedIn, academicYearRouter);
app.use('/api/v1/academic-terms', isLoggedIn, academicTermRouter);
app.use('/api/v1/class-levels', isLoggedIn, classLevelRouter);
app.use('/api/v1/programs', isLoggedIn, programRouter);

// Error middleware
app.use(notFoundError)
app.use(globalErrorHandler);

module.exports = app;
