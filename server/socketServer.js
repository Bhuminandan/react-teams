const io = require('./server').io;
const app = require('./server').app;

const jwt = require('jsonwebtoken');

const connectedUsers = {};

io.on('connection', (socket) => {

    const authToken = (socket.handshake.headers.cookie).split('=')[1];

    if (!authToken) {
        socket.disconnect();
    }

    const decodedToken = jwt.verify(authToken, 'RANDOM-TOKEN');

    if (!decodedToken) {
        socket.disconnect();
    }

    const isUserExists = connectedUsers[socket.id];

    if (isUserExists) {
        connectedUsers[socket.id].socketId = socket.id;
    } else {
        connectedUsers[socket.id] = decodedToken
    }

    console.log(connectedUsers);

})