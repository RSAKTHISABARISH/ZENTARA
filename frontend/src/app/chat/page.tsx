"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User, FileText, CornerDownLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Message {
  role: "system" | "user" | "ai";
  content: string;
}

const initialMessages: Message[] = [
  { role: "system", content: "I am ContractSense AI. I can analyze your uploaded FedEx and UPS contracts. Ask me about deadlines, liability limits, or specific clauses." },
  { role: "user", content: "What is the damage claim deadline for the Q3 FedEx SLA?" },
  { role: "ai", content: "Based on Section 4.2 of the Q3 FedEx SLA:\n\nAll formal claims for damage or shortage must be filed within **21 calendar days** of the delivery date. Supporting documentation including product invoices and repair estimates must be submitted within 30 days of the initial claim." }
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");

    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "ai", content: data.response }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [...prev, { role: "system", content: "Error connecting to the ContractSense API." }]);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-5xl mx-auto">
      <div className="mb-4">
        <h1 className="text-3xl font-bold tracking-tight">Contract Assistant</h1>
        <p className="text-muted-foreground">Ask questions about your uploaded agreements and get instant answers.</p>
      </div>

      <div className="flex flex-1 gap-6 overflow-hidden">
        {/* Main Chat Area */}
        <Card className="glass flex flex-1 flex-col h-full border-muted/50">
          <CardHeader className="border-b py-3 px-4 bg-muted/20">
            <CardTitle className="flex items-center text-sm font-medium">
              <Bot className="mr-2 h-4 w-4 text-primary" />
              ContractSense AI
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 max-w-[85%] ${message.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
              >
                <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                  {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div className={`rounded-xl px-4 py-2 ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted/50 border whitespace-pre-wrap"}`}>
                  {message.content}
                </div>
              </motion.div>
            ))}
          </CardContent>
          <div className="p-4 border-t bg-background/50">
            <form onSubmit={handleSend} className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about claim deadlines, liability caps..."
                className="min-h-[60px] w-full resize-none bg-transparent px-4 py-3 placeholder:text-muted-foreground focus-visible:outline-none"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(e);
                  }
                }}
              />
              <div className="absolute bottom-2 right-2">
                <Button type="submit" size="sm" className="h-8 w-8 rounded-full">
                  <span className="sr-only">Send</span>
                  <CornerDownLeft className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        </Card>

        {/* Sidebar Context Area */}
        <div className="hidden md:flex flex-col w-80 space-y-4">
          <Card className="glass flex-1">
            <CardHeader>
              <CardTitle className="text-sm">Active Knowledge Base</CardTitle>
              <CardDescription>Documents being used for answers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "FedEx SLA Q3 2023.pdf", type: "Master Agreement", status: "Indexed" },
                { name: "UPS Multi-year Rate Addendum.pdf", type: "Rate Sheet", status: "Indexed" }
              ].map((doc, i) => (
                <div key={i} className="flex flex-col gap-1 p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium truncate">{doc.name}</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{doc.type}</span>
                    <span className="text-green-500">{doc.status}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
