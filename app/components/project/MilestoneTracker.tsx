
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";

interface Milestone {
  id: number;
  name: string;
  description: string;
  amount: string;
  status: 'pending-approval' | 'in-progress' | 'upcoming' | 'completed';
  dueDate: string;
  deliverables: string[];
}

interface MilestoneTrackerProps {
  milestones: Milestone[];
  onMilestoneAction: (milestoneId: number, action: 'approve' | 'request-changes') => void;
}

const MilestoneTracker = ({ milestones, onMilestoneAction }: MilestoneTrackerProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-energy-green';
      case 'pending-approval': return 'bg-amber-500';
      case 'in-progress': return 'bg-blue-500';
      case 'upcoming': return 'bg-neutral-400';
      default: return 'bg-neutral-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'pending-approval': return AlertCircle;
      case 'in-progress': return Clock;
      case 'upcoming': return Clock;
      default: return Clock;
    }
  };

  return (
    <div className="space-y-4">
      {milestones.map((milestone) => {
        const StatusIcon = getStatusIcon(milestone.status);
        
        return (
          <Card key={milestone.id} className="relative">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(milestone.status)}`}>
                  <StatusIcon className="h-4 w-4 text-white" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{milestone.name}</h3>
                    <Badge 
                      variant={milestone.status === 'pending-approval' ? 'default' : 'secondary'}
                      className={milestone.status === 'pending-approval' ? 'bg-amber-500' : ''}
                    >
                      {milestone.status.replace('-', ' ')}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {milestone.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Amount: </span>
                      <span className="font-medium text-energy-green">{milestone.amount}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Due: </span>
                      <span className="font-medium">{milestone.dueDate}</span>
                    </div>
                  </div>
                  
                  <div className="text-sm">
                    <span className="text-muted-foreground mb-2 block">Deliverables:</span>
                    <ul className="space-y-1">
                      {milestone.deliverables.map((deliverable, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-trust-blue rounded-full"></div>
                          {deliverable}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {milestone.status === 'pending-approval' && (
                    <div className="flex gap-2 mt-4">
                      <Button 
                        className="bg-energy-green hover:bg-energy-green-light" 
                        size="sm"
                        onClick={() => onMilestoneAction(milestone.id, 'approve')}
                      >
                        Approve & Pay
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onMilestoneAction(milestone.id, 'request-changes')}
                      >
                        Request Changes
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default MilestoneTracker;
