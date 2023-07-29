const express = require('express');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 8000;

//=======Middleware=========//
app.use(morgan('dev'))

// server
app.listen(PORT, console.log(`server started on port ${PORT}`));
