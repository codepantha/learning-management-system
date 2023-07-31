const http = require('http');
const app = require("./app/app");

const PORT = process.env.PORT || 8000;

// server
const server = http.createServer(app);
server.listen(PORT, console.log(`server started on port ${PORT}`));
