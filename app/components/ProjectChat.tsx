import React, { useEffect, useState } from 'react';
import OnChainEvent from '@/components/OnChainEvent';
import ChatMessage from '@/components/chat/ChatMessage';
import InteractiveMessage from '@/components/chat/InteractiveMessage';
import EnhancedAIMessage from '@/components/chat/EnhancedAIMessage';
import ProjectInitiationCard from '@/components/chat/ProjectInitiationCard';
import CollaborationActions from '@/components/chat/CollaborationActions';
import ChatHeader from '@/components/chat/ChatHeader';
import ChatInput from '@/components/chat/ChatInput';
import TypingIndicator from '@/components/chat/TypingIndicator';
import ChatSkeleton from '@/components/chat/ChatSkeleton';
import { ChatMessage as ChatMessageType, useChatMessages } from '@/hooks/useChatMessages';
import { ProjectData } from '@/contexts/ProjectCreationContext';
import { mockChats } from '@/components/ChatList';
import MilestoneForm from './chat/MilestoneForm';
import PaymentForm from './chat/PaymentForm';
import { useAccount } from 'wagmi';

interface ProjectChatProps {
  selectedChatId?: string | null;
  onBackToList?: () => void;
  isTransitioning?: boolean;
}

export default function ProjectChat({ selectedChatId, onBackToList, isTransitioning }: ProjectChatProps) {
  const [projectName, setProjectName] = useState('');
  const [projectStatus, setProjectStatus] = useState('');
  const [projectBudget, setProjectBudget] = useState('');
  const [showProjectInit, setShowProjectInit] = useState(false);
  const [projectInitName, setProjectInitName] = useState('');
  const [showQuickActions, setShowQuickActions] = useState(false);
  const { address: myAddress } = useAccount();
  useEffect(() => {
    if (selectedChatId) {
      const chat = mockChats.find(chat => chat.id === selectedChatId);
      if (chat) {
        setProjectName(chat.name);
        setProjectStatus(chat.status || '');
        setProjectBudget(chat.budget || '');
      }
    }
  }, [selectedChatId]);

  // Find the selected chat object
  const selectedChat = mockChats.find(chat => chat.id === selectedChatId);
  // Determine the peer address for XMTP:
  // - For DMs, use chat.basename
  // - For projects, use the first participant (if available)
  let peerAddress: string | undefined = undefined;
  if (selectedChat) {
    if (selectedChat.type === 'dm' && selectedChat.basename) {
      peerAddress = selectedChat.basename;
    } else if (selectedChat.type === 'project' && selectedChat.participants && selectedChat.participants.length > 0) {
      peerAddress = selectedChat.participants.find(p => p !== myAddress) || selectedChat.participants[0];
    }
  }

  const { messages, isTyping, addMessage, handleAction, handleSlashCommand } = useChatMessages({
    peerAddress
  });

  // Show skeleton during transition or when no chat is selected
  if (isTransitioning || !selectedChatId) {
    return <ChatSkeleton />;
  }

  const handleSendMessage = (message: string) => {
    addMessage(message);
  };

  const handleSlashCommandInput = (command: string, args?: string) => {
    if (command === '/newproject' && args) {
      setProjectInitName(args);
      setShowProjectInit(true);
      addMessage(`${command} ${args}`);
    } else if (command === '/actions') {
      setShowQuickActions(true);
      addMessage(command);
    } else {
      handleSlashCommand(command, args);
    }
  };

  const handleProjectDeploy = (projectData: ProjectData) => {
    console.log('Deploying project:', projectData);
    setShowProjectInit(false);
    setProjectInitName('');

    addMessage(`Project "${projectData.name}" has been deployed to Base blockchain! 🎉`);
  };

  const handleProjectCancel = () => {
    setShowProjectInit(false);
    setProjectInitName('');
  };

  const handleApproveMilestone = () => {
    console.log('Milestone approved');
    addMessage('Milestone approved! Payment of 300 USDC has been processed. 💰');
  };

  const handleActionSelect = (action: string) => {
    console.log('Action selected:', action);
    setShowQuickActions(false);
    handleAction(action);
  };


  const renderMessage = (msg: ChatMessageType): React.ReactNode => {
    switch (msg.type) {
      case 'on-chain-event':
        if (msg.eventData) {
          return (
            <OnChainEvent
              key={msg.id}
              type={msg.eventData.type as "payment-sent" | "escrow-funded" | "contract-deployed"}
              title={msg.eventData.title as string}
              amount={msg.eventData.amount as string}
              details={msg.eventData.details as string}
              timestamp={msg.timestamp}
              transactionHash={msg.eventData.transactionHash as string}
            />
          );
        }
        return null;

      case 'ai-enhanced':
        return (
          <EnhancedAIMessage
            key={msg.id}
            content={msg.content}
            timestamp={msg.timestamp}
            messageType={msg.messageType as "status" | "budget" | "info" | "success" | "warning"}
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
              actionType={msg.actionType as "milestone-approval" | "milestone-form" | "payment-confirmation" | "file-upload"}
              actionData={msg.actionData}
              onMilestoneApprove={handleApproveMilestone}
              onMilestoneSubmit={(milestone, progress, notes) =>
                addMessage(`Milestone update: ${milestone} - ${progress}% complete. ${notes}`)
              }
              onPaymentConfirm={() =>
                addMessage('Payment request submitted for review.')
              }
              onFileUpload={(files) =>
                addMessage(`Shared ${files.length} file(s): ${files.join(', ')}`)
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
      <ChatHeader onBackToList={onBackToList} projectName={projectName} projectStatus={projectStatus} projectBudget={projectBudget} />

      <div className="flex-1 overflow-y-auto py-4">
        {messages.map(renderMessage)}
        {showProjectInit && (
          <ProjectInitiationCard
            projectName={projectInitName}
            onDeploy={handleProjectDeploy}
            onCancel={handleProjectCancel}
          />
        )}
        {showQuickActions && (
          <div className="mx-4 mb-6">
            <CollaborationActions onActionSelect={handleActionSelect} />
          </div>
        )}
        {/* Milestone and Payment Forms for Dapps Development */}
        {projectName === 'Dapps Development' && (
          <div className="mx-4 mb-6 space-y-6">
            <MilestoneForm
              milestones={["Initial Wireframes", "Visual Design", "Final Assets"]}
              onSubmit={(milestone, progress, notes) =>
                addMessage(`Milestone update: ${milestone} - ${progress}% complete. ${notes}`, 'user')
              }
            />
            <PaymentForm
              amount="300 USDC"
              description="Initial wireframes completion"
              recipient="anya.base"
              onConfirm={() =>
                addMessage('Payment request submitted for 300 USDC to anya.base.', 'user')
              }
            />
          </div>
        )}
        {isTyping && <TypingIndicator />}
      </div>

      <ChatInput
        onSendMessage={handleSendMessage}
        onActionSelect={handleActionSelect}
        onSlashCommand={handleSlashCommandInput}
      />
    </div>
  );
};
