
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Calendar, Users } from "lucide-react";
import CollapsibleText from '@/components/CollapsibleText';
import BasenameDisplay from '@/components/identity/BasenameDisplay';

interface ProjectOverviewProps {
  projectData: any;
  isProjectOwner: boolean;
  onDescriptionSave: (description: string) => void;
}

const ProjectOverview = ({ projectData, isProjectOwner, onDescriptionSave }: ProjectOverviewProps) => {
  return (
    <div className="space-y-6">
      {/* Project Description */}
      <Card>
        <CardContent className="p-4">
          <CollapsibleText
            text={projectData.description}
            title="Project Description"
            maxLines={3}
            isEditable={isProjectOwner}
            onSave={onDescriptionSave}
          />
        </CardContent>
      </Card>

      {/* Project Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4 text-trust-blue" />
              <span className="text-sm font-medium">Budget</span>
            </div>
            <div className="text-lg font-semibold">{projectData.budget}</div>
            <div className="text-sm text-muted-foreground">
              {projectData.spent} spent
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-trust-blue" />
              <span className="text-sm font-medium">Timeline</span>
            </div>
            <div className="text-lg font-semibold">31 days</div>
            <div className="text-sm text-muted-foreground">
              15 days remaining
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="font-medium">Project Progress</span>
            <span className="text-sm text-muted-foreground">{projectData.progress}%</span>
          </div>
          <Progress value={projectData.progress} className="mb-2" />
          <div className="text-sm text-muted-foreground">
            1 of 3 milestones completed
          </div>
        </CardContent>
      </Card>

      {/* Participants */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Users className="h-4 w-4" />
            Team Members
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="space-y-3">
            {projectData.participants.map((participant: any, index: number) => (
              <div key={index} className="flex items-center justify-between">
                <BasenameDisplay
                  address={participant.address}
                />
                <Badge variant="secondary" className="text-xs">
                  {participant.role}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectOverview;
