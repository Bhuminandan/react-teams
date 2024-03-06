import { io } from 'socket.io-client';

let socket;
const socketConnection = () => {

    if (socket && socket.connected) {
        return socket;
    } else {
        socket = io.connect('http://localhost:9000', {
            withCredentials: true
        });

        return socket;
    }
}

export default socketConnection;