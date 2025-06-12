
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useProjectCreation } from '@/contexts/ProjectCreationContext';
import DeliverablesManager from './DeliverablesManager';

const RequirementsForm = () => {
  const { projectData, updateProjectData } = useProjectCreation();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Requirements & Deliverables</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="requirements">Detailed Requirements</Label>
          <Textarea
            id="requirements"
            value={projectData.requirements || ''}
            onChange={(e) => updateProjectData({ requirements: e.target.value })}
            placeholder="List specific requirements, features, and constraints..."
            className="mt-1 min-h-[100px]"
          />
        </div>

        <DeliverablesManager />
      </CardContent>
    </Card>
  );
};

export default RequirementsForm;
