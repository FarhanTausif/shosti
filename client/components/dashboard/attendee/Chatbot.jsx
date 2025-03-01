"use client";

import React, { useState } from "react";

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [userMessage, setUserMessage] = useState("");

    const sendMessage = async () => {
        if (userMessage.trim() === "") return;

        // Add user message to chat
        setMessages([...messages, { text: userMessage, isUser: true }]);
        setUserMessage("");

        try {
            // Call the backend API to send the message to Gemini API
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chatbot/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: userMessage }),
            });

            const data = await response.json();
            const botResponse = data.response;

            // Add bot response to chat
            setMessages([
                ...messages,
                { text: userMessage, isUser: true },
                { text: botResponse, isUser: false },
            ]);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 bg-white rounded-lg shadow-2xl p-4 w-80 max-w-xs">
            <div className="h-80 overflow-y-auto space-y-4 mb-4">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`p-2 rounded-lg ${
                            msg.isUser ? "bg-indigo-500 text-white" : "bg-gray-200 text-black"
                        }`}
                    >
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="flex">
                <input
                    type="text"
                    className="flex-1 p-2 border border-slate-300 rounded-l-lg focus:ring-2 focus:ring-indigo-300"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    placeholder="Ask something..."
                />
                <button
                    onClick={sendMessage}
                    className="px-4 py-2 bg-indigo-500 text-white rounded-r-lg hover:bg-indigo-600"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chatbot;
