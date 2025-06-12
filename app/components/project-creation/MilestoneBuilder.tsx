import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, GripVertical, Trash2 } from 'lucide-react';
import { Milestone } from '@/contexts/ProjectCreationContext';

interface MilestoneBuilderProps {
  milestones: Milestone[];
  onUpdate: (milestones: Milestone[]) => void;
}

const MilestoneBuilder = ({ milestones, onUpdate }: MilestoneBuilderProps) => {
  const addMilestone = () => {
    const newMilestone: Milestone = {
      id: Date.now().toString(),
      title: '',
      description: '',
      deliverables: [''],
      budget: 0,
      timeline: 7
    };
    onUpdate([...milestones, newMilestone]);
  };

  const updateMilestone = (id: string, updates: Partial<Milestone>) => {
    const updated = milestones.map(m => m.id === id ? { ...m, ...updates } : m);
    onUpdate(updated);
  };

  const removeMilestone = (id: string) => {
    onUpdate(milestones.filter(m => m.id !== id));
  };

  const addDeliverable = (milestoneId: string) => {
    const milestone = milestones.find(m => m.id === milestoneId);
    if (milestone) {
      updateMilestone(milestoneId, {
        deliverables: [...milestone.deliverables, '']
      });
    }
  };

  const updateDeliverable = (milestoneId: string, index: number, value: string) => {
    const milestone = milestones.find(m => m.id === milestoneId);
    if (milestone) {
      const newDeliverables = [...milestone.deliverables];
      newDeliverables[index] = value;
      updateMilestone(milestoneId, { deliverables: newDeliverables });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Project Milestones</h2>
        <p className="text-muted-foreground">
          Break down your project into manageable milestones with clear deliverables and payment schedules.
        </p>
      </div>

      <div className="space-y-4">
        {milestones.map((milestone, index) => (
          <Card key={milestone.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <GripVertical className="h-4 w-4 text-muted-foreground" />
                <Badge variant="outline">Milestone {index + 1}</Badge>
                <div className="flex-1" />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeMilestone(milestone.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Title *</label>
                  <Input
                    value={milestone.title}
                    onChange={(e) => updateMilestone(milestone.id, { title: e.target.value })}
                    placeholder="Milestone title"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Budget (USDC)</label>
                    <Input
                      type="number"
                      value={milestone.budget}
                      onChange={(e) => updateMilestone(milestone.id, { budget: Number(e.target.value) })}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Timeline (days)</label>
                    <Input
                      type="number"
                      value={milestone.timeline}
                      onChange={(e) => updateMilestone(milestone.id, { timeline: Number(e.target.value) })}
                      placeholder="7"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Description</label>
                <Textarea
                  value={milestone.description}
                  onChange={(e) => updateMilestone(milestone.id, { description: e.target.value })}
                  placeholder="Describe what will be accomplished in this milestone..."
                  className="min-h-[80px]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Deliverables</label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addDeliverable(milestone.id)}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {milestone.deliverables.map((deliverable, delIndex) => (
                    <Input
                      key={delIndex}
                      value={deliverable}
                      onChange={(e) => updateDeliverable(milestone.id, delIndex, e.target.value)}
                      placeholder="Deliverable item"
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button onClick={addMilestone} variant="outline" className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Milestone
        </Button>
      </div>

      {milestones.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">No milestones created yet.</p>
            <p className="text-sm text-muted-foreground mt-1">
              Add your first milestone to get started.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MilestoneBuilder;
