const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const expressRoutes = require('./expressRoutes');
const dbConnect = require('./db/dbConnect');
const cookieParser = require("cookie-parser");


const app = express();
const expressServer = http.createServer(app);
const io = socketIO(expressServer, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Execute database connection
dbConnect();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(
  {
    origin: 'http://localhost:5173',
    credentials: true
  }
));
app.use(cookieParser());


// Your Express routes
app.use(expressRoutes);


// Start the server
const PORT = process.env.PORT || 9000;
expressServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});


module.exports = { io, expressServer, app };