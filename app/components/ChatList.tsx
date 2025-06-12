
import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Clock, CheckCircle, AlertCircle } from "lucide-react";
import StatusDot from '@/components/StatusDot';
import FloatingActionButton from '@/components/FloatingActionButton';

interface ChatItem {
  id: string;
  type: 'project' | 'dm';
  name: string;
  lastMessage: string;
  timestamp: string;
  isActive: boolean;
  status?: 'approval-needed' | 'in-progress' | 'payment-sent' | 'completed';
  avatar?: string;
  unreadCount?: number;
  participants?: string[];
  basename?: string;
  budget?: string;
}

interface ChatListProps {
  selectedChatId?: string | null;
  onChatSelect?: (chatId: string) => void;
}

export const mockChats: ChatItem[] = [
  // {
  //   id: '1',
  //   type: 'project',
  //   name: 'Website Redesign',
  //   lastMessage: 'AI Agent: Milestone ready for approval',
  //   timestamp: '2m ago',
  //   isActive: true,
  //   status: 'approval-needed',
  //   unreadCount: 1,
  //   participants: ['anya.base', 'ben.base']
  // },
  // {
  //   id: '2',
  //   type: 'project',
  //   name: 'Logo Design',
  //   lastMessage: 'Payment of 200 USDC sent',
  //   timestamp: '1h ago',
  //   isActive: false,
  //   status: 'payment-sent',
  //   participants: ['sarah.base', 'mike.base']
  // },
  // {
  //   id: '3',
  //   type: 'dm',
  //   name: 'alex.base',
  //   basename: 'alex.base',
  //   lastMessage: 'Hey, interested in collaborating?',
  //   timestamp: '3h ago',
  //   isActive: true,
  //   unreadCount: 1
  // },
  {
    id: '4',
    type: 'project',
    name: 'Dapps Development',
    lastMessage: 'Contract deployed successfully',
    timestamp: '1d ago',
    isActive: false,
    status: 'in-progress',
    participants: ['dev.base', 'client.base'],
    budget: '1000 USDC',
  }
];

const ChatList = ({ selectedChatId, onChatSelect }: ChatListProps) => {
  const getStatusInfo = (status?: string) => {
    switch (status) {
      case 'approval-needed':
        return { label: 'Approval Needed', color: 'bg-amber-500', icon: AlertCircle, statusDot: 'pending-approval' as const };
      case 'payment-sent':
        return { label: 'Payment Sent', color: 'bg-energy-green', icon: CheckCircle, statusDot: 'completed' as const };
      case 'in-progress':
        return { label: 'In Progress', color: 'bg-trust-blue', icon: Clock, statusDot: 'active' as const };
      case 'completed':
        return { label: 'Completed', color: 'bg-energy-green', icon: CheckCircle, statusDot: 'completed' as const };
      default:
        return { label: '', color: 'bg-neutral-400', icon: MessageSquare, statusDot: 'active' as const };
    }
  };

  const getBasenameInitial = (basename: string) => {
    return basename.split('.')[0].charAt(0).toUpperCase();
  };

  return (
    <div className="flex flex-col h-full bg-background relative">
      {/* Chat List with improved visual design */}
      <div className="flex-1 overflow-y-auto">
        {mockChats.map((chat) => {
          const statusInfo = getStatusInfo(chat.status);
          const StatusIcon = statusInfo.icon;
          const isSelected = selectedChatId === chat.id;

          return (
            <Card
              key={chat.id}
              className={`m-3 p-4 cursor-pointer transition-all duration-200 border-l-4 ${isSelected
                ? 'bg-trust-blue/10 border-l-trust-blue shadow-sm'
                : 'border-l-transparent hover:bg-accent/50 hover:border-l-trust-blue/50'
                }`}
              onClick={() => onChatSelect?.(chat.id)}
            >
              <div className="flex items-start gap-3">
                {/* Enhanced Avatar or Project Icon */}
                <div className="relative flex-shrink-0">
                  {chat.type === 'project' ? (
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${isSelected ? 'bg-trust-blue/20' : 'bg-trust-blue/10'
                      }`}>
                      <StatusIcon className={`h-4 w-4 ${isSelected ? 'text-trust-blue' : 'text-trust-blue'}`} />
                    </div>
                  ) : (
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={chat.avatar} />
                      <AvatarFallback className="bg-energy-green/10 text-energy-green text-sm font-medium">
                        {chat.basename ? getBasenameInitial(chat.basename) : chat.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  )}

                  {/* Status indicator with enhanced styling */}
                  {chat.isActive && (
                    <div className="absolute -top-1 -right-1">
                      <StatusDot
                        status={statusInfo.statusDot}
                        size="md"
                        className="border-2 border-background"
                      />
                    </div>
                  )}
                </div>

                {/* Chat Info with improved typography */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className={`font-medium text-sm truncate pr-2 transition-colors ${isSelected ? 'text-trust-blue' : 'text-foreground'
                      }`}>
                      {chat.basename || chat.name}
                    </h3>
                    <span className="text-xs text-muted-foreground flex-shrink-0">{chat.timestamp}</span>
                  </div>

                  {/* Status Badge for Projects */}
                  {chat.status && statusInfo.label && (
                    <Badge
                      className={`text-xs mb-2 text-white border-0 ${statusInfo.color === 'bg-amber-500' ? 'bg-amber-500' :
                        statusInfo.color === 'bg-energy-green' ? 'bg-energy-green' :
                          statusInfo.color === 'bg-trust-blue' ? 'bg-trust-blue' : statusInfo.color
                        }`}
                    >
                      {statusInfo.label}
                    </Badge>
                  )}

                  <p className="text-sm text-muted-foreground truncate mb-2">{chat.lastMessage}</p>

                  {/* Participants for projects with Basename styling */}
                  {chat.participants && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <span>with</span>
                      {chat.participants.slice(0, 2).map((participant, index) => (
                        <span key={index} className="font-medium text-trust-blue">
                          {participant}{index < Math.min(chat.participants!.length, 2) - 1 ? ', ' : ''}
                        </span>
                      ))}
                      {chat.participants.length > 2 && (
                        <span> +{chat.participants.length - 2} more</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Enhanced Unread indicator */}
                {chat.unreadCount && chat.unreadCount > 0 && (
                  <div className="bg-energy-green text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium flex-shrink-0 shadow-sm">
                    {chat.unreadCount}
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton />
    </div>
  );
};

export default ChatList;
