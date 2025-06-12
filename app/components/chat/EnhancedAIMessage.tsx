
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, CheckCircle, AlertTriangle, Info, DollarSign, Target } from "lucide-react";

interface EnhancedAIMessageProps {
  content: string;
  timestamp: string;
  messageType?: 'info' | 'success' | 'warning' | 'status' | 'budget';
  data?: any;
}

const EnhancedAIMessage = ({ content, timestamp, messageType = 'info', data }: EnhancedAIMessageProps) => {
  const getMessageConfig = () => {
    switch (messageType) {
      case 'success':
        return {
          icon: CheckCircle,
          bgColor: 'bg-gradient-to-r from-energy-green/10 to-energy-green/5',
          borderColor: 'border-energy-green/30',
          iconColor: 'text-energy-green'
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          bgColor: 'bg-gradient-to-r from-amber-500/10 to-amber-500/5',
          borderColor: 'border-amber-500/30',
          iconColor: 'text-amber-600'
        };
      case 'status':
        return {
          icon: Target,
          bgColor: 'bg-gradient-to-r from-trust-blue/10 to-trust-blue/5',
          borderColor: 'border-trust-blue/30',
          iconColor: 'text-trust-blue'
        };
      case 'budget':
        return {
          icon: DollarSign,
          bgColor: 'bg-gradient-to-r from-emerald-500/10 to-emerald-500/5',
          borderColor: 'border-emerald-500/30',
          iconColor: 'text-emerald-600'
        };
      default:
        return {
          icon: Info,
          bgColor: 'bg-gradient-to-r from-neutral-100 to-neutral-50',
          borderColor: 'border-neutral-200',
          iconColor: 'text-neutral-600'
        };
    }
  };

  const config = getMessageConfig();
  const Icon = config.icon;

  return (
    <div className="mx-4 mb-4">
      <div className="flex gap-3 mb-2">
        <div className="w-7 h-7 rounded-full bg-gradient-brand flex items-center justify-center flex-shrink-0">
          <Bot className="h-4 w-4 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-sm">AI Agent</span>
            <Badge variant="secondary" className="text-xs">
              {messageType}
            </Badge>
            <span className="text-xs text-muted-foreground">{timestamp}</span>
          </div>
        </div>
      </div>

      <Card className={`${config.bgColor} ${config.borderColor} border-2 ml-10`}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Icon className={`h-5 w-5 ${config.iconColor} flex-shrink-0 mt-0.5`} />
            <div className="flex-1">
              <p className="text-sm leading-relaxed">{content}</p>
              
              {/* Render additional data based on message type */}
              {messageType === 'status' && data && (
                <div className="mt-3 p-3 bg-white/50 rounded-lg">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-muted-foreground block">Progress</span>
                      <span className="font-semibold">{data.progress || '0%'}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block">Next Milestone</span>
                      <span className="font-semibold">{data.nextMilestone || 'None'}</span>
                    </div>
                  </div>
                </div>
              )}

              {messageType === 'budget' && data && (
                <div className="mt-3 p-3 bg-white/50 rounded-lg">
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="text-muted-foreground block">Total Budget</span>
                      <span className="font-semibold text-emerald-600">{data.total || '0 USDC'}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block">Released</span>
                      <span className="font-semibold">{data.released || '0 USDC'}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block">Remaining</span>
                      <span className="font-semibold">{data.remaining || '0 USDC'}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedAIMessage;
