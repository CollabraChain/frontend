
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MessageSquare, HelpCircle } from "lucide-react";
import { useHelp } from '@/contexts/HelpContext';

const contextualFAQs = {
  'chat': [
    { question: 'How do I approve a milestone?', answer: 'Click the "Approve & Pay" button when reviewing milestone deliverables.' },
    { question: 'How do I start a thread?', answer: 'Long press on any message to start a thread or discussion.' },
    { question: 'How do I share files?', answer: 'Use the attachment icon in the chat input to upload and share files.' },
    { question: 'How do I request changes?', answer: 'Click "Request Changes" on milestone submissions to provide feedback.' }
  ],
  'details': [
    { question: 'How do I edit project details?', answer: 'Click the edit icon next to the project description to make changes.' },
    { question: 'What are smart contracts?', answer: 'Smart contracts automatically handle payments and milestone approvals on the blockchain.' },
    { question: 'How do payments work?', answer: 'Payments are held in escrow and released automatically when milestones are approved.' },
    { question: 'How do I add team members?', answer: 'Go to project settings and invite collaborators via their wallet address or username.' }
  ],
  'list': [
    { question: 'How do I create a new project?', answer: 'Click the "+" button to start a new project and set up milestones.' },
    { question: 'How do I filter conversations?', answer: 'Use the search bar or filter options to find specific projects or messages.' },
    { question: 'What are the different chat types?', answer: 'Projects have structured milestones, while DMs are for direct communication.' },
    { question: 'How do I archive old projects?', answer: 'Swipe left on completed projects to archive them from your main list.' }
  ]
};

const HelpSheet = () => {
  const { isHelpOpen, currentScreen, closeHelp } = useHelp();
  
  const faqs = contextualFAQs[currentScreen as keyof typeof contextualFAQs] || contextualFAQs.chat;

  const handleChatWithAI = () => {
    // TODO: Navigate to AI assistant chat
    console.log('Opening AI assistant chat...');
    closeHelp();
  };

  return (
    <Sheet open={isHelpOpen} onOpenChange={closeHelp}>
      <SheetContent side="bottom" className="h-[70vh]">
        <SheetHeader className="pb-4">
          <SheetTitle className="flex items-center gap-2 text-left">
            <HelpCircle className="h-5 w-5 text-trust-blue" />
            Help & Support
          </SheetTitle>
        </SheetHeader>
        
        <div className="space-y-6">
          {/* Contextual FAQs */}
          <div>
            <h3 className="font-medium mb-3 text-sm">Frequently Asked Questions</h3>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div key={index} className="p-3 bg-neutral-50 rounded-lg">
                  <h4 className="font-medium text-sm mb-1">{faq.question}</h4>
                  <p className="text-xs text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Assistant */}
          <div className="border-t pt-4">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-trust-blue/10 rounded-full">
                <MessageSquare className="h-6 w-6 text-trust-blue" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Need More Help?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Chat with our AI assistant for personalized support
                </p>
              </div>
              <Button 
                onClick={handleChatWithAI}
                className="bg-trust-blue hover:bg-trust-blue/90 w-full"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat with AI Assistant
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default HelpSheet;
