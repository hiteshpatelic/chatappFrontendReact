import { io } from "socket.io-client";
const socket = io('http://localhost:5000');

export default socket;

socket.on('connect_error', err => console.log(err,1));
