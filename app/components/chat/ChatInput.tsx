
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Paperclip } from "lucide-react";
import ContextualActionMenu from '@/components/ContextualActionMenu';
import SlashCommandMenu from '@/components/chat/SlashCommandMenu';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onActionSelect: (action: string) => void;
  onSlashCommand: (command: string, args?: string) => void;
}

const ChatInput = ({ onSendMessage, onActionSelect, onSlashCommand }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [slashMenuPosition, setSlashMenuPosition] = useState({ x: 0, y: 0 });
  const inputRef = useRef<HTMLInputElement>(null);

  const slashCommands = [
    { command: '/newproject', description: 'Create a new project', example: '/newproject Website Redesign' },
    { command: '/status', description: 'Show project status', example: '/status' },
    { command: '/budget', description: 'Display budget breakdown', example: '/budget' },
    { command: '/help', description: 'Show available commands', example: '/help' },
    { command: '/milestone', description: 'Update milestone progress', example: '/milestone' },
    { command: '/payment', description: 'Request payment', example: '/payment' },
  ];

  useEffect(() => {
    const handleClickOutside = () => setShowSlashMenu(false);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMessage(value);

    // Show slash menu when user types '/' at the beginning
    if (value === '/' || (value.startsWith('/') && !value.includes(' '))) {
      if (inputRef.current) {
        const rect = inputRef.current.getBoundingClientRect();
        setSlashMenuPosition({ x: rect.left, y: rect.top - 10 });
        setShowSlashMenu(true);
      }
    } else {
      setShowSlashMenu(false);
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // Check if it's a slash command
      if (message.startsWith('/')) {
        const parts = message.split(' ');
        const command = parts[0];
        const args = parts.slice(1).join(' ');
        onSlashCommand(command, args);
      } else {
        onSendMessage(message);
      }
      setMessage('');
      setShowSlashMenu(false);
    }
  };

  const handleSlashCommandSelect = (command: string) => {
    setMessage(command + ' ');
    setShowSlashMenu(false);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !showSlashMenu) {
      handleSendMessage();
    } else if (e.key === 'Escape') {
      setShowSlashMenu(false);
    }
  };

  return (
    <div className="relative">
      {showSlashMenu && (
        <SlashCommandMenu
          commands={slashCommands}
          position={slashMenuPosition}
          onSelect={handleSlashCommandSelect}
          onClose={() => setShowSlashMenu(false)}
        />
      )}
      
      <div className="p-4 border-t border-border bg-card">
        <div className="flex gap-2 items-end">
          <ContextualActionMenu onActionSelect={onActionSelect} />
          <Button variant="ghost" size="icon">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Input
            ref={inputRef}
            value={message}
            onChange={handleInputChange}
            placeholder="Type a message or use / for commands..."
            className="flex-1"
            onKeyPress={handleKeyPress}
          />
          <Button 
            onClick={handleSendMessage}
            className="bg-trust-blue hover:bg-trust-blue-light"
            disabled={!message.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
