import React from 'react';
import ChatMessage from './ChatMessage';
import InteractiveMessage from './InteractiveMessage';
import EnhancedAIMessage from './EnhancedAIMessage';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import { useChatMessages, ChatMessage as ChatMessageType } from '@/hooks/useChatMessages';

export default function AIAgentChatRoom() {
  const { messages, isTyping, addMessage, handleAction, handleSlashCommand } = useChatMessages();

  const handleSendMessage = (message: string) => {
    addMessage(message);
  };

  const handleSlashCommandInput = (command: string, args?: string) => {
    handleSlashCommand(command, args);
  };

  const handleActionSelect = (action: string) => {
    handleAction(action);
  };

  const renderMessage = (msg: ChatMessageType): React.ReactNode => {
    switch (msg.type) {
      case 'ai-enhanced':
        return (
          <EnhancedAIMessage
            key={msg.id}
            content={msg.content}
            timestamp={msg.timestamp}
            messageType={msg.messageType as 'status' | 'budget' | 'info' | 'success' | 'warning'}
            data={msg.data}
          />
        );
      case 'ai':
        if (msg.isInteractive) {
          return (
            <InteractiveMessage
              key={msg.id}
              id={msg.id}
              content={msg.content}
              timestamp={msg.timestamp}
              actionType={msg.actionType as 'milestone-approval' | 'milestone-form' | 'payment-confirmation' | 'file-upload'}
              actionData={msg.actionData}
              onMilestoneApprove={() => addMessage('Milestone approved! Payment released.', 'user')}
              onMilestoneSubmit={(milestone, progress, notes) =>
                addMessage(`Milestone update: ${milestone} - ${progress}% complete. ${notes}`)
              }
              onPaymentConfirm={() =>
                addMessage('Payment request submitted for review.', 'user')
              }
              onFileUpload={(files) =>
                addMessage(`Shared ${files.length} file(s): ${files.join(', ')}`, 'user')
              }
            />
          );
        }
        return (
          <ChatMessage
            key={msg.id}
            id={msg.id}
            type="ai"
            content={msg.content}
            timestamp={msg.timestamp}
          />
        );
      case 'user':
        return (
          <ChatMessage
            key={msg.id}
            id={msg.id}
            type="user"
            sender={msg.sender}
            content={msg.content}
            timestamp={msg.timestamp}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <ChatHeader projectName="AI Agent (CollabraChain)" projectStatus="Assistant" projectBudget="" />
      <div className="flex-1 overflow-y-auto py-4">
        {messages.map(renderMessage)}
        {isTyping && <TypingIndicator />}
      </div>
      <ChatInput
        onSendMessage={handleSendMessage}
        onActionSelect={handleActionSelect}
        onSlashCommand={handleSlashCommandInput}
      />
    </div>
  );
} 