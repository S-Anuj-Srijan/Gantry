import { io } from "socket.io-client";

const SOCKET_URL = "http://127.0.0.1:8000"; // Replace with your server URL
const socket = io(SOCKET_URL);

export default socket;