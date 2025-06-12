
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Briefcase, Zap } from "lucide-react";

interface Milestone {
  title: string;
  budget: string;
}

interface ProjectInitiationCardProps {
  projectName: string;
  onDeploy: (projectData: any) => void;
  onCancel: () => void;
}

const ProjectInitiationCard = ({ projectName, onDeploy, onCancel }: ProjectInitiationCardProps) => {
  const [description, setDescription] = useState('');
  const [totalBudget, setTotalBudget] = useState('');
  const [milestones, setMilestones] = useState<Milestone[]>([
    { title: 'Initial Planning & Setup', budget: '' },
    { title: 'Development Phase', budget: '' },
    { title: 'Testing & Delivery', budget: '' }
  ]);

  const addMilestone = () => {
    setMilestones([...milestones, { title: '', budget: '' }]);
  };

  const removeMilestone = (index: number) => {
    if (milestones.length > 1) {
      setMilestones(milestones.filter((_, i) => i !== index));
    }
  };

  const updateMilestone = (index: number, field: 'title' | 'budget', value: string) => {
    const updated = milestones.map((milestone, i) => 
      i === index ? { ...milestone, [field]: value } : milestone
    );
    setMilestones(updated);
  };

  const handleDeploy = () => {
    const projectData = {
      name: projectName,
      description,
      totalBudget,
      milestones: milestones.filter(m => m.title.trim() && m.budget.trim())
    };
    onDeploy(projectData);
  };

  const isValid = description.trim() && totalBudget.trim() && 
    milestones.some(m => m.title.trim() && m.budget.trim());

  return (
    <Card className="mx-4 mb-4 border-2 border-trust-blue/30 bg-gradient-to-br from-trust-blue/5 to-trust-blue/10">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-trust-blue flex items-center justify-center">
              <Briefcase className="h-4 w-4 text-white" />
            </div>
            <CardTitle className="text-lg">Create New Project</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Project Name</label>
          <Input 
            value={projectName} 
            disabled 
            className="bg-neutral-50"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-1 block">Description</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the project scope and objectives..."
            className="min-h-[80px]"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-1 block">Total Budget (USDC)</label>
          <Input
            value={totalBudget}
            onChange={(e) => setTotalBudget(e.target.value)}
            placeholder="1000"
            type="number"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Milestones</label>
            <Button variant="outline" size="sm" onClick={addMilestone}>
              <Plus className="h-3 w-3 mr-1" />
              Add
            </Button>
          </div>
          
          <div className="space-y-2">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Input
                  value={milestone.title}
                  onChange={(e) => updateMilestone(index, 'title', e.target.value)}
                  placeholder="Milestone title"
                  className="flex-1"
                />
                <Input
                  value={milestone.budget}
                  onChange={(e) => updateMilestone(index, 'budget', e.target.value)}
                  placeholder="Budget"
                  type="number"
                  className="w-24"
                />
                {milestones.length > 1 && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => removeMilestone(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button 
            onClick={handleDeploy}
            disabled={!isValid}
            className="flex-1 bg-trust-blue hover:bg-trust-blue-light"
          >
            <Zap className="h-4 w-4 mr-2" />
            Deploy to Base
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectInitiationCard;
