import { io } from "socket.io-client";
const socket = io('https://chatappic.herokuapp.com');


socket.on('connect_error', err => console.log(err,1));
export default socket;