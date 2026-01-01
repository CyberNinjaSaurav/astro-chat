import React, { useState, useEffect, useRef} from "react";
import { sendChatMessage } from "../api/apiService";
import "./chat.css";

const ChatPage = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });

  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: "user", text: input }]);
    
    try{
    const res = await sendChatMessage(input);

    setMessages((prev) => [
      ...prev,
      { role: "assistant", text: res.data.reply },
    ]);
} catch {
    setMessages((prev) => [
        ...prev,
        {role: "assistant", text: "AI failed to respond" },
    ]);
}
    setInput("");
  };

  return (
   <div className="chat-container">
      <header className="chat-header"> AstroChat</header>

      <div className="chat-messages">
        {messages.map((m, i) => (
          <div key={i} className={`bubble ${m.role}`}>
            {m.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AstroChat anything..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>➤</button>
      </div>
    </div>
  );
};

export default ChatPage;
