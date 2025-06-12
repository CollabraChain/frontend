
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Send, Clock } from "lucide-react";

interface PaymentFormProps {
  amount: string;
  description: string;
  recipient: string;
  onConfirm: () => void;
}

const PaymentForm = ({ amount, description, recipient, onConfirm }: PaymentFormProps) => {
  return (
    <Card className="border-2 border-energy-green/30 bg-gradient-to-br from-energy-green/5 to-energy-green/10">
      <div className="p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-energy-green flex items-center justify-center">
            <DollarSign className="h-5 w-5 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-lg text-energy-green">Payment Request</h4>
            <p className="text-sm text-muted-foreground">Request payment for completed work</p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 mb-4 border border-energy-green/20">
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <span className="text-xs text-muted-foreground block mb-1">Amount</span>
              <span className="font-bold text-lg text-energy-green">{amount}</span>
            </div>
            <div>
              <span className="text-xs text-muted-foreground block mb-1">Recipient</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">{recipient}</span>
                <Badge variant="secondary" className="text-xs">Verified</Badge>
              </div>
            </div>
          </div>
          
          <div>
            <span className="text-xs text-muted-foreground block mb-1">Description</span>
            <span className="text-sm">{description}</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Payment will be processed within 1-2 business days</span>
          </div>
          
          <div className="flex gap-3">
            <Button onClick={onConfirm} className="bg-energy-green hover:bg-energy-green-light text-white flex-1">
              <Send className="h-4 w-4 mr-2" />
              Send Payment Request
            </Button>
            <Button variant="outline" className="px-6 border-energy-green/30 text-energy-green hover:bg-energy-green/5">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PaymentForm;
