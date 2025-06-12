import React from 'react';
import { Button } from "@/components/ui/button";
import { Info, ArrowLeft } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import ActivityFeed from "@/components/ActivityFeed";

interface ChatHeaderProps {
  onBackToList?: () => void;
  projectName: string;
  projectStatus: string;
  projectBudget: string;
}

const ChatHeader = ({ onBackToList, projectName, projectStatus, projectBudget }: ChatHeaderProps) => {
  // Placeholder project details
  // const projectName = "Website Redesign";
  // const projectStatus = "In Progress";
  // const projectBudget = "1,000 USDC";

  return (
    <div className="p-4 border-b border-border bg-card">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onBackToList}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>

        <div className="flex-1">
          <h2 className="font-semibold text-lg">{projectName}</h2>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-2 h-2 bg-energy-green rounded-full"></div>
            <span className="text-sm text-muted-foreground">with anya.base</span>
          </div>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon">
              <Info className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-96 max-w-[90vw] p-0">
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold text-base mb-1">{projectName}</h3>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                <span>Status:</span>
                <span className="font-medium text-foreground">{projectStatus}</span>
                <span className="ml-4">Budget:</span>
                <span className="font-medium text-emerald-600">{projectBudget}</span>
              </div>
            </div>
            <div className="max-h-64 overflow-y-auto border-b border-border">
              <ActivityFeed />
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default ChatHeader;
