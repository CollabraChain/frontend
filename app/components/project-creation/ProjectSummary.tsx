
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProjectSummaryProps {
  projectData: any;
  onUpdate: (updates: any) => void;
}

const ProjectSummary = ({ projectData, onUpdate }: ProjectSummaryProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Review & Launch</h2>
        <p className="text-muted-foreground">
          Review your project details before deploying to the blockchain.
        </p>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground text-center">
            Project summary coming in next iteration...
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectSummary;
