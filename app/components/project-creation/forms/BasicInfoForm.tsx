
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useProjectCreation } from '@/contexts/ProjectCreationContext';

const BasicInfoForm = () => {
  const { projectData, updateProjectData, errors } = useProjectCreation();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Basic Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="projectName">Project Name *</Label>
          <Input
            id="projectName"
            value={projectData.name || ''}
            onChange={(e) => updateProjectData({ name: e.target.value })}
            placeholder="Enter project name"
            className={`mt-1 ${errors.name ? 'border-destructive' : ''}`}
          />
          {errors.name && (
            <p className="text-sm text-destructive mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <Label htmlFor="description">Project Description *</Label>
          <Textarea
            id="description"
            value={projectData.description || ''}
            onChange={(e) => updateProjectData({ description: e.target.value })}
            placeholder="Describe your project goals and vision..."
            className={`mt-1 min-h-[100px] ${errors.description ? 'border-destructive' : ''}`}
          />
          {errors.description && (
            <p className="text-sm text-destructive mt-1">{errors.description}</p>
          )}
        </div>

        <div>
          <Label htmlFor="timeline">Timeline Preference</Label>
          <select
            id="timeline"
            value={projectData.timeline || 'standard'}
            onChange={(e) => updateProjectData({ timeline: e.target.value as 'urgent' | 'standard' | 'flexible' })}
            className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background"
          >
            <option value="urgent">Urgent (Rush job)</option>
            <option value="standard">Standard timeline</option>
            <option value="flexible">Flexible timeline</option>
          </select>
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicInfoForm;
