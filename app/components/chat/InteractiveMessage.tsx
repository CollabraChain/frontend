
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, CheckCircle, AlertCircle } from "lucide-react";
import MilestoneForm from './MilestoneForm';
import PaymentForm from './PaymentForm';
import FileUpload from './FileUpload';

interface InteractiveMessageProps {
  id: string;
  content: string;
  timestamp: string;
  actionType: 'milestone-approval' | 'milestone-form' | 'payment-confirmation' | 'file-upload';
  actionData: any;
  onMilestoneApprove: () => void;
  onMilestoneSubmit: (milestone: string, progress: number, notes: string) => void;
  onPaymentConfirm: () => void;
  onFileUpload: (files: string[]) => void;
}

const InteractiveMessage = ({
  content,
  timestamp,
  actionType,
  actionData,
  onMilestoneApprove,
  onMilestoneSubmit,
  onPaymentConfirm,
  onFileUpload
}: InteractiveMessageProps) => {
  return (
    <div className="mx-4 mb-6">
      <div className="flex gap-3 mb-3">
        <div className="w-7 h-7 rounded-full bg-gradient-brand flex items-center justify-center flex-shrink-0">
          <Bot className="h-4 w-4 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-sm">AI Agent</span>
            <span className="text-xs text-muted-foreground">{timestamp}</span>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{content}</p>
        </div>
      </div>
      
      {actionType === 'milestone-approval' && (
        <Card className="border-2 border-energy-green/30 bg-gradient-to-br from-energy-green/5 to-energy-green/10 shadow-lg">
          <div className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-energy-green flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-lg text-energy-green">Milestone Ready for Approval</h4>
                <p className="text-sm text-muted-foreground">Review deliverables and approve payment</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 mb-4 border border-energy-green/20">
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <span className="text-xs text-muted-foreground block mb-1">Milestone</span>
                  <span className="font-semibold text-sm">{actionData.milestone}</span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block mb-1">Payment Amount</span>
                  <span className="font-semibold text-sm text-energy-green">{actionData.amount}</span>
                </div>
              </div>
              
              <div>
                <span className="text-xs text-muted-foreground block mb-2">Deliverables Completed</span>
                <div className="space-y-2">
                  {actionData.deliverables.map((item: string, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-energy-green flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button 
                onClick={onMilestoneApprove}
                className="bg-energy-green hover:bg-energy-green-light text-white flex-1 h-12 text-base font-semibold"
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                Approve & Pay {actionData.amount}
              </Button>
              <Button variant="outline" className="px-6 h-12 border-energy-green/30 text-energy-green hover:bg-energy-green/5">
                Request Changes
              </Button>
            </div>
          </div>
        </Card>
      )}

      {actionType === 'milestone-form' && (
        <MilestoneForm 
          milestones={actionData.milestones}
          onSubmit={onMilestoneSubmit}
        />
      )}

      {actionType === 'payment-confirmation' && (
        <PaymentForm 
          amount={actionData.amount}
          description={actionData.description}
          recipient={actionData.recipient}
          onConfirm={onPaymentConfirm}
        />
      )}

      {actionType === 'file-upload' && (
        <FileUpload onUpload={onFileUpload} />
      )}
    </div>
  );
};

export default InteractiveMessage;
