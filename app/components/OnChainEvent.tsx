
import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ExternalLink, Shield } from "lucide-react";

interface OnChainEventProps {
  type: 'escrow-funded' | 'payment-sent' | 'contract-deployed';
  title: string;
  amount?: string;
  details: string;
  timestamp: string;
  transactionHash?: string;
}

const OnChainEvent = ({ type, title, amount, details, timestamp, transactionHash }: OnChainEventProps) => {
  const getEventIcon = () => {
    switch (type) {
      case 'escrow-funded':
        return Shield;
      case 'payment-sent':
        return CheckCircle;
      case 'contract-deployed':
        return CheckCircle;
      default:
        return CheckCircle;
    }
  };

  const getEventColor = () => {
    switch (type) {
      case 'escrow-funded':
        return 'bg-trust-blue/10 border-trust-blue/20';
      case 'payment-sent':
        return 'bg-energy-green/10 border-energy-green/20';
      case 'contract-deployed':
        return 'bg-trust-blue/10 border-trust-blue/20';
      default:
        return 'bg-neutral-100 border-neutral-200';
    }
  };

  const Icon = getEventIcon();

  return (
    <div className="flex justify-center my-6">
      <Card className={`max-w-sm w-full border-2 ${getEventColor()}`}>
        <div className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-trust-blue flex items-center justify-center">
              <Icon className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-sm text-trust-blue">{title}</h4>
              <span className="text-xs text-muted-foreground">{timestamp}</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              On-Chain
            </Badge>
          </div>
          
          {amount && (
            <div className="mb-3 p-3 bg-white rounded-lg border">
              <div className="text-center">
                <div className="text-lg font-bold text-energy-green">{amount}</div>
                <div className="text-xs text-muted-foreground">Secured in escrow</div>
              </div>
            </div>
          )}
          
          <p className="text-sm text-foreground mb-3">{details}</p>
          
          {transactionHash && (
            <div className="flex items-center justify-center">
              <button className="flex items-center gap-2 text-xs text-trust-blue hover:text-trust-blue-light transition-colors">
                <ExternalLink className="h-3 w-3" />
                View on Base
              </button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default OnChainEvent;
