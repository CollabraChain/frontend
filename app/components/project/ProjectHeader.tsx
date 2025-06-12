
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, CheckCircle, DollarSign } from "lucide-react";

interface ProjectHeaderProps {
  projectName: string;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onBack?: () => void;
}

const ProjectHeader = ({ projectName, activeTab, onTabChange, onBack }: ProjectHeaderProps) => {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'milestones', label: 'Milestones', icon: CheckCircle },
    { id: 'contract', label: 'Contract', icon: DollarSign }
  ];

  return (
    <div className="p-4 border-b border-border bg-card">
      <div className="flex items-center gap-3 mb-4">
        {onBack && (
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}
        <div className="flex-1">
          <h1 className="text-xl font-semibold">{projectName}</h1>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex gap-1 bg-neutral-100 rounded-lg p-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-trust-blue shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectHeader;
