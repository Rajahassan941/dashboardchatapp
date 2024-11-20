import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

const ChatService = {
  sendMessage: (message) => {
    socket.emit('message', message);
  },
  receiveMessage: (callback) => {
    socket.on('message', callback);
  },
};

export default ChatService;
