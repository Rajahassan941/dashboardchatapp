const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { Server } = require('socket.io');

const app = express();
const PORT = 5000;
const SECRET = 'your-secret-key';

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mock User Data
const users = [
  { id: 1, email: 'admin@example.com', password: 'admin123', role: 'admin' },
  { id: 2, email: 'user@example.com', password: 'user123', role: 'user' },
];

// JWT Authentication
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: '1h' });
    return res.json({ token });
  }

  res.status(401).json({ message: 'Invalid credentials' });
});

// Middleware to Verify Token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
};

// Protected Route Example
app.get('/protected', verifyToken, (req, res) => {
  res.json({ message: `Hello ${req.user.role}, you have access to this route!` });
});

// Start HTTP Server
const httpServer = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// WebSocket Server for Real-Time Chat
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('A user connected.');

  // Listen for messages from clients
  socket.on('message', (message) => {
    console.log('Received message:', message);
    io.emit('message', message); // Broadcast message to all connected clients
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected.');
  });
});
