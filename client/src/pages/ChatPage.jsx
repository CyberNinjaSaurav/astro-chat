import React, {useState, useEffect} from 'react';
const ChatPage = () => {
    const[messages, setMessages] = useState([
        {text: "Hello! How can I help you today?", sender: "bot"}

    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async () => {
        if (input.trim() == '') return;

        const handleSend = async () => {
            if (input.trim() == '') return;

            const userMessage = {text: input, sender: "user"};
            setMessages(prev => [prev, userMessage]);
            setInput('');
            setIsLoading(true);

            try{
                setTimeout(() => {
                    const botMessage = {text: 'This is a simulated response to: "${input}"', sender: "bot" };
                    setMessages(prev => [prev, botMessage]);
                    setIsLoading(false);
                }, 1500);
            } catch (error){
                console.error("Failed to send message:", error);
                const errorMessage = {text: "Sorry, I couldn't get a response. Please try again.", sender: "bot"};
                setMessages(prev => [prev, errorMessage]);
                setIsLoading(false);
            }
        };

        return (
            <div className="Chat-container">
                <div className="chat-window">
                    {messages.map(msg, index) => (
                        <
                    )}
                </div>
            </div>
        )
    }
}