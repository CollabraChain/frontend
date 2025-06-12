
import React from 'react';
import ProjectCard from './ProjectCard';
import { Project } from './useMarketplace';

interface ProjectGridProps {
  projects: Project[];
  isLoading: boolean;
  onApplyToProject: (projectId: string) => Promise<void>;
}

const ProjectGrid = ({ projects, isLoading, onApplyToProject }: ProjectGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="h-64 bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium mb-2">No projects found</h3>
        <p className="text-muted-foreground">
          Try adjusting your filters or search criteria to find more projects.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onApply={() => onApplyToProject(project.id)}
        />
      ))}
    </div>
  );
};

export default ProjectGrid;
