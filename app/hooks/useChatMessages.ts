import { useState } from "react";

export type MilestoneActionData = {
  milestone: string;
  amount: string;
  deliverables: string[];
};

export type PaymentActionData = {
  amount: string;
  description: string;
  recipient: string;
};

export type MilestoneFormActionData = {
  milestones: string[];
};

export type FileUploadActionData = Record<string, never>;

export type ChatMessage = {
  id: string;
  type: "user" | "ai" | "on-chain-event" | "ai-enhanced" | "action-select";
  content: string;
  timestamp: string;
  sender?: string;
  isInteractive?: boolean;
  actionType?: string;
  actionData?: MilestoneActionData | PaymentActionData | MilestoneFormActionData | FileUploadActionData;
  messageType?: string;
  data?: Record<string, unknown>;
  eventData?: Record<string, unknown>;
};

export const useChatMessages = (options?: { chatType?: string; projectName?: string }) => {
  const { chatType, projectName } = options || {};

  let initialMessages: ChatMessage[];
  if (chatType === 'project' || (projectName && projectName === 'Dapps Development')) {
    initialMessages = [
      {
        id: "1",
        type: "ai",
        content: `Welcome to the project chat for Dapps Development! Here you can discuss milestones, payments, and share updates with your team.`,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
      {
        id: "2",
        type: "user",
        sender: "dev.base",
        content: "Hi team, the smart contract has been deployed.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
      {
        id: "3",
        type: "ai",
        content: "Great work! Next, let's review the initial wireframes milestone.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
      {
        id: "4",
        type: "user",
        sender: "client.base",
        content: "Can you share the latest wireframes?",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
      {
        id: "5",
        type: "ai",
        content: "Uploading the latest wireframes now.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ];
  } else {
    initialMessages = [
      {
        id: "1",
        type: "ai",
        content:
          "👋 Hi! I'm your CollabraChain AI Agent. Ask me anything about your projects, milestones, payments, or how to get started. Try commands like /newproject, /milestone, or just say hello!",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
      {
        id: "2",
        type: "user",
        sender: "you",
        content: "What can you do?",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
      {
        id: "3",
        type: "ai",
        content: "I can help you create new projects, track milestones, manage payments, and share files. You can use slash commands or just type your request in natural language!",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
      {
        id: "4",
        type: "user",
        sender: "you",
        content: "How do I start a new project?",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
      {
        id: "5",
        type: "ai",
        content: "Just type /newproject followed by your project name, or tell me what you want to build!",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ];
  }

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);

  const addMessage = (content: string, type: "user" | "ai" = "user") => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sender: type === "user" ? "demo.base" : undefined,
    };

    setMessages((prev) => [...prev, newMessage]);

    if (type === "user") {
      generateAIResponse(content);
    }
  };

  const generateAIResponse = (userMessage: string) => {
    setIsTyping(true);

    setTimeout(() => {
      let response: ChatMessage;

      if (userMessage.trim().startsWith('/newproject')) {
        // Extract project name if provided
        const parts = userMessage.trim().split(' ');
        const projectName = parts.length > 1 ? parts.slice(1).join(' ') : 'Your project';
        response = {
          id: Date.now().toString(),
          type: "ai",
          content: `${projectName} project deployed on https://basescan.org/tx/0xe054ef662ca97c215a3883872ffb1e0a1610f183ed352bf32b1f8f8f46182991 with 0.01 usdc`,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
      } else if (
        userMessage.includes("milestone") ||
        userMessage.includes("progress")
      ) {
        response = {
          id: Date.now().toString(),
          type: "ai",
          content:
            "I can help you track milestone progress. Would you like to update a milestone or request milestone approval?",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isInteractive: true,
          actionType: "milestone-form",
          actionData: {
            milestones: ["Initial Wireframes", "Visual Design", "Final Assets"],
          },
        };
      } else if (
        userMessage.includes("payment") ||
        userMessage.includes("pay")
      ) {
        response = {
          id: Date.now().toString(),
          type: "ai",
          content:
            "Ready to process a payment request. Please confirm the details below:",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isInteractive: true,
          actionType: "payment-confirmation",
          actionData: {
            amount: "300 USDC",
            description: "Initial wireframes completion",
            recipient: "anya.base",
          },
        };
      } else if (
        userMessage.includes("file") ||
        userMessage.includes("upload") ||
        userMessage.includes("share")
      ) {
        response = {
          id: Date.now().toString(),
          type: "ai",
          content:
            "I can help you share project files and deliverables with your team:",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isInteractive: true,
          actionType: "file-upload",
          actionData: {},
        };
      } else if (userMessage.includes("approve")) {
        response = {
          id: Date.now().toString(),
          type: "ai",
          content:
            "The Initial Wireframes milestone is ready for your review and approval:",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isInteractive: true,
          actionType: "milestone-approval",
          actionData: {
            milestone: "Initial Wireframes",
            amount: "300 USDC",
            deliverables: [
              "Mobile wireframes completed",
              "Desktop wireframes delivered",
              "User flow diagram finalized",
            ],
          },
        };
      } else {
        response = {
          id: Date.now().toString(),
          type: "ai",
          content:
            "I understand you want to work on your project. I can help with milestone tracking, payments, file sharing, and more. What would you like to do?",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
      }

      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 1500);
  };

  const handleAction = (action: string) => {
    switch (action) {
      case "update-milestone":
        addMessage("I want to update milestone progress", "user");
        break;
      case "request-payment":
        addMessage("I want to request payment for completed work", "user");
        break;
      case "share-files":
        addMessage("I want to share project files", "user");
        break;
      case "add-note":
        addMessage("I want to add a project note", "user");
        break;
      default:
        addMessage(action, "user");
    }
  };

  const handleSlashCommand = (command: string, args?: string) => {
    const fullCommand = args ? `${command} ${args}` : command;
    addMessage(fullCommand, "user");
  };

  return {
    messages,
    isTyping,
    addMessage,
    handleAction,
    handleSlashCommand,
  };
};
