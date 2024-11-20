import { io } from 'socket.io-client';

const socket = io('https://dashboardchatapp-backend.vercel.app');

const ChatService = {
  sendMessage: (message) => {
    socket.emit('message', message);
  },
  receiveMessage: (callback) => {
    socket.on('message', callback);
  },
};

export default ChatService;
