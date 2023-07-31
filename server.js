require('dotenv').config();
const http = require('http');
require('./config/dbConnect');
const app = require("./app/app");


const PORT = process.env.PORT || 8000;

// server
const server = http.createServer(app);
server.listen(PORT, console.log(`server started on port ${PORT}`));

// DolrK9z2Qd35QyNI
