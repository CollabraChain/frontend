import { useState, useEffect } from "react";
import { useXMTP } from "./useXMTP";

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

export const useChatMessages = (options?: { peerAddress?: string }) => {
  const { peerAddress } = options || {};

  // XMTP integration
  const xmtp = useXMTP(peerAddress);

  // If using XMTP, start with empty messages and rely on XMTP for history
  // Otherwise, also start with empty messages (no mock/AI messages)
  const initialMessages: ChatMessage[] = [];

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);

  // Listen for new XMTP messages
  useEffect(() => {
    if (!peerAddress || !xmtp || !xmtp.messages) return;
    // Map XMTP messages to ChatMessage format
    const mapped = xmtp.messages.map((msg) => ({
      id: msg.id,
      type: msg.senderAddress === xmtp.myAddress ? ("user" as const) : ("ai" as const),
      sender: msg.senderAddress,
      content: msg.content,
      timestamp: msg.sent.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));
    setMessages((prev) => {
      // Avoid duplicates
      const existingIds = new Set(prev.map((m) => m.id));
      const newMsgs = mapped.filter((m) => !existingIds.has(m.id));
      return [...prev, ...newMsgs] as ChatMessage[];
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xmtp?.messages, peerAddress]);

  const addMessage = async (content: string, type: "user" | "ai" = "user") => {
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

    // If using XMTP, send the message
    if (peerAddress && xmtp && xmtp.sendMessage) {
      try {
        await xmtp.sendMessage(content);
      } catch {
        // Optionally handle error
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString() + "-err",
            type: "ai",
            content: "Failed to send message via XMTP.",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          } as ChatMessage,
        ]);
      }
      return;
    }

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
