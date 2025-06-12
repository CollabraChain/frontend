
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  Plus,
  Target,
  DollarSign,
  Paperclip,
  AlertTriangle
} from "lucide-react";

interface ContextualActionMenuProps {
  onActionSelect: (action: string) => void;
}

const ContextualActionMenu = ({ onActionSelect }: ContextualActionMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      id: 'update-milestone',
      label: 'Update Milestone',
      icon: Target,
      description: 'Report progress or submit deliverables'
    },
    {
      id: 'request-payment',
      label: 'Request Payment',
      icon: DollarSign,
      description: 'Request payment for completed work'
    },
    {
      id: 'share-file',
      label: 'Share File',
      icon: Paperclip,
      description: 'Upload and share project files'
    },
    {
      id: 'raise-dispute',
      label: 'Raise Dispute',
      icon: AlertTriangle,
      description: 'Report an issue or disagreement'
    }
  ];

  const handleActionClick = (actionId: string) => {
    onActionSelect(actionId);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="h-10 w-10 rounded-full bg-neutral-100 hover:bg-neutral-200"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end" side="top">
        <div className="p-2">
          <div className="pb-2 mb-2 border-b border-border">
            <h4 className="text-sm font-semibold text-foreground">Quick Actions</h4>
            <p className="text-xs text-muted-foreground">Choose an action for this project</p>
          </div>
          <div className="space-y-1">
            {actions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={() => handleActionClick(action.id)}
                  className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-trust-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="h-4 w-4 text-trust-blue" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-foreground">{action.label}</div>
                    <div className="text-xs text-muted-foreground">{action.description}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ContextualActionMenu;
