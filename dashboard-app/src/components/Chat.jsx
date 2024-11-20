import React, { useState, useEffect } from 'react';
import ChatService from '../services/ChatService';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    ChatService.receiveMessage((message) => {
      setMessages((prev) => [...prev, message]);
    });
  }, []);

  const handleSend = () => {
    if (input.trim()) {
      ChatService.sendMessage(input);
      setInput('');
    }
  };

  return (
    <div>
      <div style={{ border: '1px solid #ccc', padding: '10px', maxHeight: '300px', overflowY: 'scroll' }}>
        {messages.map((msg, idx) => (
          <p key={idx}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default Chat;
