import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch chat history on page load
  useEffect(() => {
    axios.get('http://localhost:5000/api/chat').then((response) => {
      setMessages(response.data);
    });
  }, []);

  // Handle message submission
  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      axios
        .post('http://localhost:5000/api/chat', { message })
        .then((response) => {
          const botReply = response.data.reply;
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: message, sender: 'user' },
            { text: botReply, sender: 'bot' },
          ]);
          setMessage('');
        });
    }
  };

  return (
    <div className="app bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold my-4">React Chatbot</h1>
      <div className="chat-window bg-white p-4 rounded shadow w-96 h-96 overflow-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-2 p-2 rounded ${
              msg.sender === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-100 text-left'
            }`}
          >
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <form className="mt-4 flex w-96" onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          className="flex-1 p-2 border rounded"
        />
        <button type="submit" className="ml-2 bg-blue-500 text-white p-2 rounded">
          Send
        </button>
      </form>
    </div>
  );
}

export default App;
