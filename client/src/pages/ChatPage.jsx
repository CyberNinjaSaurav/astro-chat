import React, { useState, useEffect } from 'react';

const ChatPage = () => {
    const [messages, setMessages] = useState([
        { text: "Hello! How can I help you today?", sender: "bot" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async () => {
        if (input.trim() === '') return;

        const userMessage = { text: input, sender: "user" };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            // This is where you'll call your backend API
            // const response = await sendMessageToBot(input);
            // const botMessage = { text: response.data.reply, sender: "bot" };
            
            // For now, we'll just simulate a bot response
            setTimeout(() => {
                const botMessage = { text: `This is a simulated response to: "${input}"`, sender: "bot" };
                setMessages(prev => [...prev, botMessage]);
                setIsLoading(false);
            }, 1500);

        } catch (error) {
            console.error("Failed to send message:", error);
            const errorMessage = { text: "Sorry, I couldn't get a response. Please try again.", sender: "bot" };
            setMessages(prev => [...prev, errorMessage]);
            setIsLoading(false);
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-window">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        <p>{msg.text}</p>
                    </div>
                ))}
                {isLoading && <div className="message bot"><p>Thinking...</p></div>}
            </div>
            <div className="chat-input-area">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type your message here..."
                />
                <button onClick={handleSend} disabled={isLoading}>Send</button>
            </div>
        </div>
    );
};

export default ChatPage;