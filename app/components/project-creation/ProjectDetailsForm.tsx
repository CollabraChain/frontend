
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useProjectCreation } from '@/contexts/ProjectCreationContext';
import BasicInfoForm from './forms/BasicInfoForm';
import RequirementsForm from './forms/RequirementsForm';

const ProjectDetailsForm = () => {
  const { projectData } = useProjectCreation();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Project Details</h2>
        <p className="text-muted-foreground">
          Provide detailed information about your project requirements and goals.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BasicInfoForm />
        <RequirementsForm />
      </div>

      {projectData.template && (
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">Template: {projectData.template}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              This template will provide suggested milestones and budget estimates in the next steps.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProjectDetailsForm;
