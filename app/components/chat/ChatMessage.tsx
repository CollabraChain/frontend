
import React from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot } from "lucide-react";

interface ChatMessageProps {
  id: string;
  type: 'user' | 'ai';
  sender?: string;
  content: string;
  timestamp: string;
}

const ChatMessage = ({ type, sender, content, timestamp }: ChatMessageProps) => {
  if (type === 'ai') {
    return (
      <div className="flex gap-3 mb-4 mx-4">
        <div className="w-7 h-7 rounded-full bg-gradient-brand flex items-center justify-center flex-shrink-0">
          <Bot className="h-4 w-4 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-sm">AI Agent</span>
            <span className="text-xs text-muted-foreground">{timestamp}</span>
          </div>
          <div className="bg-neutral-50 rounded-lg rounded-tl-none p-3 max-w-sm">
            <p className="text-sm">{content}</p>
          </div>
        </div>
      </div>
    );
  }

  const isOwnMessage = sender === 'ben.base';
  
  return (
    <div className={`flex gap-3 mb-4 mx-4 ${isOwnMessage ? 'flex-row-reverse' : ''}`}>
      <Avatar className="w-7 h-7 flex-shrink-0">
        <AvatarFallback className="bg-trust-blue text-white text-xs">
          {sender?.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className={`flex-1 min-w-0 ${isOwnMessage ? 'text-right' : ''}`}>
        <div className={`flex items-center gap-2 mb-1 ${isOwnMessage ? 'flex-row-reverse' : ''}`}>
          <span className="font-medium text-sm">{sender}</span>
          <span className="text-xs text-muted-foreground">{timestamp}</span>
        </div>
        <div className={`rounded-lg p-3 max-w-sm inline-block ${
          isOwnMessage 
            ? 'bg-trust-blue text-white rounded-tr-none' 
            : 'bg-neutral-100 rounded-tl-none'
        }`}>
          <p className="text-sm">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
