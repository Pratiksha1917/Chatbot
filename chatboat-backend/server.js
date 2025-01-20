const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');
const Chat = require('./models/chat');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// API endpoint to send and receive messages
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  // Save user message to the database
  await Chat.create({ text: message, sender: 'user' });

  // Generate a bot reply
  const botReply = `Bot received: ${message}`;
  await Chat.create({ text: botReply, sender: 'bot' });

  res.json({ reply: botReply });
});

// Fetch chat history
app.get('/api/chat', async (req, res) => {
  const messages = await Chat.findAll();
  res.json(messages);
});

// Start the server
const PORT = 5000;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  console.log(`server is running on port ${PORT}`)
});
