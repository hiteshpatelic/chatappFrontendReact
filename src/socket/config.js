import { io } from "socket.io-client";
const socket = io('http://localhost:5000');


socket.on('connect_error', err => console.log(err,1));
// socket.on('res', data=>console.log(data))
export default socket;