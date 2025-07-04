// src/pages/Chat.jsx
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5001"); // your backend chat server

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const user = JSON.parse(localStorage.getItem("user")) || { name: "Guest" };
  const chatEndRef = useRef(null);

  useEffect(() => {
  const handleHistory = (msgs) => setMessages(msgs);
  const handleNewMessage = (msg) => {
    setMessages(prev => [...prev, msg]);
    scrollToBottom();
  };

  socket.on("chatHistory", handleHistory);
  socket.on("receiveMessage", handleNewMessage);

  return () => {
    socket.off("chatHistory", handleHistory);
    socket.off("receiveMessage", handleNewMessage);
  };
}, []);


  const sendMessage = () => {
    if (text.trim()) {
      socket.emit("sendMessage", { sender: user.name, text });
      setText("");
    }
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded shadow min-h-screen flex flex-col">
      <h2 className="text-xl font-bold text-center mb-4">💬 Group Chat</h2>

      <div className="flex-1 overflow-y-auto text-black mb-4 p-2 border rounded">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.sender === user.name ? 'text-right' : 'text-left'}`}>
            <p className="text-sm text-black font-semibold text-blue-600">{msg.sender}</p>
            <div className="inline-block bg-gray-200 rounded px-4 py-2">
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className=" text-blackflex gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 border p-2 rounded"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
