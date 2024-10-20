// src/App.js

import React, { useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([
    { type: 'ai', text: 'Hello! How can I assist you today?', image: null }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setFileName(file ? file.name : '');
  };

  const sendMessage = () => {
    if (!inputMessage && !imageFile) return;

    const newMessages = [
      ...messages,
      { type: 'user', text: inputMessage, image: imageFile ? URL.createObjectURL(imageFile) : null }
    ];
    setMessages(newMessages);

    // Simulating an AI response after sending the user's message
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'ai', text: `AI response to: ${inputMessage}`, image: null }
      ]);
    }, 1000);

    // Clear the input fields
    setInputMessage('');
    setImageFile(null);
    setFileName('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="App">
      <Navbar />
      <Header />
      <ChatWindow messages={messages} />
      <ChatInput
        inputMessage={inputMessage}
        handleInputChange={handleInputChange}
        handleFileChange={handleFileChange}
        fileName={fileName}
        sendMessage={sendMessage}
        handleKeyPress={handleKeyPress}
      />
    </div>
  );
}

function Navbar() {
  return (
    <div className="navbar">
      <a href="#" className="active">
        <img src="https://via.placeholder.com/24" alt="Home" />
        <div>Home</div>
      </a>
      <a href="#">
        <img src="https://via.placeholder.com/24" alt="Chat" />
        <div>Chat</div>
      </a>
      <a href="#">
        <img src="https://via.placeholder.com/24" alt="Records" />
        <div>Records</div>
      </a>
      <a href="#">
        <img src="https://via.placeholder.com/24" alt="Settings" />
        <div>Settings</div>
      </a>
    </div>
  );
}

function Header() {
  return (
    <div className="header">
      <h1>Medical Chat</h1>
    </div>
  );
}

function ChatWindow({ messages }) {
  return (
    <div className="chat-window">
      {messages.map((message, index) => (
        <div key={index} className={`message ${message.type}`}>
          <img className="profile-pic" src="https://via.placeholder.com/40" alt="Profile" />
          <div className="text">{message.text}</div>
          {message.image && <img src={message.image} alt="Uploaded" className="uploaded-image" />}
        </div>
      ))}
    </div>
  );
}

function ChatInput({ inputMessage, handleInputChange, handleFileChange, fileName, sendMessage, handleKeyPress }) {
  return (
    <div className="chat-input">
      <input
        type="text"
        placeholder="Type a message..."
        value={inputMessage}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <label className="custom-upload-button">
        Upload Image
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </label>
      <span className="file-name">{fileName}</span>
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
