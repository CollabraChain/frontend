
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, DollarSign, MessageSquare, CheckCircle } from "lucide-react";

interface CollaborationActionsProps {
  onActionSelect: (action: string) => void;
}

const CollaborationActions = ({ onActionSelect }: CollaborationActionsProps) => {
  const actions = [
    {
      id: 'update-milestone',
      label: 'Update Milestone',
      description: 'Track progress and submit deliverables',
      icon: CheckCircle,
      color: 'bg-trust-blue'
    },
    {
      id: 'request-payment',
      label: 'Request Payment',
      description: 'Submit payment request for completed work',
      icon: DollarSign,
      color: 'bg-energy-green'
    },
    {
      id: 'share-files',
      label: 'Share Files',
      description: 'Upload deliverables and project files',
      icon: Upload,
      color: 'bg-trust-blue'
    },
    {
      id: 'add-note',
      label: 'Add Note',
      description: 'Share updates with the team',
      icon: MessageSquare,
      color: 'bg-neutral-500'
    }
  ];

  return (
    <Card className="border-2 border-trust-blue/20">
      <CardContent className="p-4">
        <h4 className="font-medium mb-3">Quick Actions</h4>
        <div className="grid grid-cols-2 gap-2">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.id}
                variant="outline"
                className="h-auto p-3 flex flex-col items-center gap-2 hover:bg-accent"
                onClick={() => onActionSelect(action.id)}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${action.color}`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <div className="text-center">
                  <div className="text-xs font-medium">{action.label}</div>
                  <div className="text-xs text-muted-foreground">{action.description}</div>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default CollaborationActions;
