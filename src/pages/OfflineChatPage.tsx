import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send } from "lucide-react";

const OfflineChatPage = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: "You", text: "Hey, anyone nearby?", timestamp: "2:00 PM" },
    { id: 2, sender: "Nearby User", text: "Yeah! I can hear you.", timestamp: "2:01 PM" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage = {
      id: messages.length + 1,
      sender: "You",
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([...messages, newMessage]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="p-4 shadow-md border-b">
        <h2 className="text-xl font-semibold">Offline Bluetooth Chat</h2>
        <p className="text-sm text-muted-foreground">Nearby communication (Bluetooth/Mesh)</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3 bg-muted">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "You" ? "justify-end" : "justify-start"
            }`}
          >
            <Card className="max-w-xs rounded-2xl">
              <CardContent
                className={`px-4 py-2 ${
                  msg.sender === "You" ? "bg-blue-600 text-white" : "bg-white text-black"
                } rounded-2xl`}
              >
                <div className="text-sm">{msg.text}</div>
                <div className="text-xs mt-1 opacity-70 text-right">{msg.timestamp}</div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Input box */}
      <div className="p-4 border-t flex items-center gap-2 bg-white">
        <Avatar>
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <Input
          placeholder="Send a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1"
        />
        <Button onClick={sendMessage}>
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default OfflineChatPage;
