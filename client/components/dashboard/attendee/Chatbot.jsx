"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, SendHorizonal, MessageCircle } from "lucide-react";
import { marked } from "marked"; 

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [userMessage, setUserMessage] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const sendMessage = async () => {
        if (userMessage.trim() === "") return;

        // Add temporary loading state
        setMessages(prev => [...prev, 
            { text: userMessage, isUser: true },
            { text: "...", isUser: false, loading: true }
        ]);
        
        const currentMessage = userMessage;
        setUserMessage("");

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chatbot/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: currentMessage }),
            });

            const data = await response.json();
            
            // Sanitize the raw markdown response from Gemini and convert to HTML
            const polishedResponse = marked(data.response);

            setMessages(prev => [
                ...prev.filter(msg => !msg.loading),
                { text: polishedResponse, isUser: false }
            ]);
        } catch (error) {
            setMessages(prev => [
                ...prev.filter(msg => !msg.loading),
                { text: "Sorry, I'm having trouble connecting. Please try again later.", isUser: false }
            ]);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div className="relative">
            {/* Floating Chat Button */}
            {!isOpen && (
                <Button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 rounded-full p-6 shadow-2xl hover:shadow-3xl 
                    bg-gradient-to-br from-indigo-600 to-teal-500 text-white hover:from-indigo-700 hover:to-teal-600
                    transition-all duration-300"
                >
                    <MessageCircle className="w-16 h-16" />
                </Button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 w-96 max-w-[95vw] max-h-[90vh] bg-white/90 backdrop-blur-lg 
                rounded-2xl shadow-2xl border border-slate-200/60 overflow-hidden flex flex-col">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-indigo-600 to-teal-500 p-4 flex justify-between items-center">
                        <h3 className="text-white font-semibold text-lg">Shosti Assistant</h3>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsOpen(false)}
                            className="text-white/80 hover:bg-white/10 rounded-full"
                        >
                            <X className="w-5 h-5" />
                        </Button>
                    </div>

                    {/* Messages Container */}
                    <div className="flex-1 p-4 space-y-4 h-96 overflow-y-auto">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
                            >
                                <div className={`max-w-[85%] p-3 rounded-2xl break-words ${msg.isUser 
                                    ? "bg-gradient-to-br from-indigo-600 to-teal-500 text-white"
                                    : "bg-slate-100/80 backdrop-blur-sm text-slate-800"} 
                                    ${msg.loading ? "animate-pulse" : ""}`}
                                >
                                    {/* Render HTML content if it's not a user message */}
                                    <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className="p-4 border-t border-slate-200/60 bg-white/50">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={userMessage}
                                onChange={(e) => setUserMessage(e.target.value)}
                                onKeyDown={handleKeyDown}  
                                placeholder="Ask something..."
                                className="flex-1 px-4 py-3 rounded-xl border border-slate-200/60 
                                focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 
                                backdrop-blur-sm bg-white/50"
                            />
                            <Button
                                onClick={sendMessage}
                                className="px-4 py-3 bg-gradient-to-br from-indigo-600 to-teal-500 
                                hover:from-indigo-700 hover:to-teal-600 text-white rounded-xl"
                            >
                                <SendHorizonal className="w-6 h-6" />
                            </Button>
                        </div>
                        <p className="text-xs text-slate-500 mt-2 text-center">
                            AI-powered mental health support
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;

