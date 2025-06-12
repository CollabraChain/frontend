
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Upload } from "lucide-react";

interface MilestoneFormProps {
  milestones: string[];
  onSubmit: (milestone: string, progress: number, notes: string) => void;
}

const MilestoneForm = ({ milestones, onSubmit }: MilestoneFormProps) => {
  const [selectedMilestone, setSelectedMilestone] = useState('');
  const [progress, setProgress] = useState(0);
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    if (selectedMilestone) {
      onSubmit(selectedMilestone, progress, notes);
    }
  };

  return (
    <Card className="border-2 border-trust-blue/30 bg-gradient-to-br from-trust-blue/5 to-trust-blue/10">
      <div className="p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-trust-blue flex items-center justify-center">
            <Clock className="h-5 w-5 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-lg text-trust-blue">Update Milestone</h4>
            <p className="text-sm text-muted-foreground">Track your progress and submit deliverables</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Select Milestone</label>
            <div className="grid grid-cols-2 gap-2">
              {milestones.map((milestone) => (
                <button
                  key={milestone}
                  onClick={() => setSelectedMilestone(milestone)}
                  className={`p-3 rounded-lg border text-left transition-colors ${
                    selectedMilestone === milestone
                      ? 'border-trust-blue bg-trust-blue/10 text-trust-blue'
                      : 'border-border hover:bg-accent'
                  }`}
                >
                  <div className="text-sm font-medium">{milestone}</div>
                  <Badge variant="secondary" className="mt-1 text-xs">
                    {milestone === 'Initial Wireframes' ? 'Completed' : 'In Progress'}
                  </Badge>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Progress: {progress}%</label>
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Progress Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Describe what you've completed and any blockers..."
              className="w-full p-3 border border-border rounded-lg resize-none h-20 text-sm"
            />
          </div>

          <div className="flex gap-3">
            <Button onClick={handleSubmit} className="bg-trust-blue hover:bg-trust-blue-light flex-1">
              <Upload className="h-4 w-4 mr-2" />
              Update Milestone
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MilestoneForm;
