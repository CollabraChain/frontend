
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Command, Hash, DollarSign, HelpCircle, Target, CreditCard } from "lucide-react";

interface SlashCommand {
  command: string;
  description: string;
  example: string;
}

interface SlashCommandMenuProps {
  commands: SlashCommand[];
  position: { x: number; y: number };
  onSelect: (command: string) => void;
  onClose: () => void;
}

const SlashCommandMenu = ({ commands, position, onSelect, onClose }: SlashCommandMenuProps) => {
  const getCommandIcon = (command: string) => {
    switch (command) {
      case '/newproject':
        return <Hash className="h-4 w-4" />;
      case '/status':
        return <Target className="h-4 w-4" />;
      case '/budget':
        return <DollarSign className="h-4 w-4" />;
      case '/help':
        return <HelpCircle className="h-4 w-4" />;
      case '/milestone':
        return <Target className="h-4 w-4" />;
      case '/payment':
        return <CreditCard className="h-4 w-4" />;
      default:
        return <Command className="h-4 w-4" />;
    }
  };

  return (
    <div 
      className="fixed z-50"
      style={{ 
        left: position.x, 
        top: position.y - 280,
        maxWidth: '320px'
      }}
    >
      <Card className="shadow-lg border-2 border-trust-blue/20">
        <CardContent className="p-2">
          <div className="text-xs text-muted-foreground mb-2 px-2 py-1">Available Commands</div>
          {commands.map((cmd, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-accent cursor-pointer transition-colors"
              onClick={() => onSelect(cmd.command)}
            >
              <div className="text-trust-blue">
                {getCommandIcon(cmd.command)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm">{cmd.command}</div>
                <div className="text-xs text-muted-foreground truncate">{cmd.description}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default SlashCommandMenu;
