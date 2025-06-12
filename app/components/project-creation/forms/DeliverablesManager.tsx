
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X } from 'lucide-react';
import { useProjectCreation } from '@/contexts/ProjectCreationContext';

const DeliverablesManager = () => {
  const { projectData, updateProjectData } = useProjectCreation();

  const addDeliverable = () => {
    const newDeliverables = [...(projectData.deliverables || []), ''];
    updateProjectData({ deliverables: newDeliverables });
  };

  const updateDeliverable = (index: number, value: string) => {
    const newDeliverables = [...(projectData.deliverables || [])];
    newDeliverables[index] = value;
    updateProjectData({ deliverables: newDeliverables });
  };

  const removeDeliverable = (index: number) => {
    const newDeliverables = projectData.deliverables.filter((_: any, i: number) => i !== index);
    updateProjectData({ deliverables: newDeliverables });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <Label>Expected Deliverables</Label>
        <Button variant="outline" size="sm" onClick={addDeliverable}>
          <Plus className="h-3 w-3 mr-1" />
          Add
        </Button>
      </div>
      
      <div className="space-y-2">
        {(projectData.deliverables || []).map((deliverable: string, index: number) => (
          <div key={index} className="flex gap-2">
            <Input
              value={deliverable}
              onChange={(e) => updateDeliverable(index, e.target.value)}
              placeholder="Deliverable description"
              className="flex-1"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeDeliverable(index)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}
      </div>
      
      {(!projectData.deliverables || projectData.deliverables.length === 0) && (
        <div className="text-sm text-muted-foreground py-4 text-center border-2 border-dashed rounded-md">
          No deliverables added yet. Click "Add" to start.
        </div>
      )}
    </div>
  );
};

export default DeliverablesManager;
