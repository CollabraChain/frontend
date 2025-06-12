
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Calendar, DollarSign, ExternalLink, Briefcase } from "lucide-react";
import { useReputation, CompletedProject } from '@/hooks/useReputation';

export default function PortfolioView() {
  const { portfolio } = useReputation();
  const [selectedProject, setSelectedProject] = useState<CompletedProject | null>(null);

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'web development':
        return 'bg-trust-blue/10 text-trust-blue';
      case 'design':
        return 'bg-purple-600/10 text-purple-600';
      case 'blockchain':
        return 'bg-energy-green/10 text-energy-green';
      case 'content':
        return 'bg-amber-500/10 text-amber-500';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-trust-blue" />
            Project Portfolio ({portfolio.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {portfolio.map((project) => (
              <div
                key={project.id}
                className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-1">{project.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className={getCategoryColor(project.category)}
                  >
                    {project.category}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(project.completedDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      ${project.budget.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-amber-500" />
                      {project.clientRating}/5
                    </div>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    by {project.clientName}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mt-3">
                  {project.skills.slice(0, 4).map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {project.skills.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.skills.length - 4} more
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Project Modal */}
      {selectedProject && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-trust-blue" />
              Project Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-xl mb-2">{selectedProject.title}</h3>
              <p className="text-muted-foreground mb-4">{selectedProject.description}</p>
              
              <div className="flex items-center gap-4 mb-4">
                <Badge 
                  variant="secondary" 
                  className={getCategoryColor(selectedProject.category)}
                >
                  {selectedProject.category}
                </Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-amber-500" />
                  <span className="font-medium">{selectedProject.clientRating}/5</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-medium">Client:</span>
                <div className="text-muted-foreground">{selectedProject.clientName}</div>
              </div>
              <div>
                <span className="font-medium">Budget:</span>
                <div className="text-muted-foreground">${selectedProject.budget.toLocaleString()}</div>
              </div>
              <div>
                <span className="font-medium">Completed:</span>
                <div className="text-muted-foreground">
                  {new Date(selectedProject.completedDate).toLocaleDateString()}
                </div>
              </div>
              <div>
                <span className="font-medium">Duration:</span>
                <div className="text-muted-foreground">4 weeks</div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Client Feedback</h4>
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm italic">"{selectedProject.clientFeedback}"</p>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Skills Used</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.skills.map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Deliverables</h4>
              <ul className="space-y-1">
                {selectedProject.deliverables.map((deliverable, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-trust-blue rounded-full" />
                    {deliverable}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">On-Chain Record:</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    console.log('Opening block explorer for:', selectedProject.onChainHash);
                  }}
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  View on Base
                </Button>
              </div>
              <div className="text-xs text-muted-foreground font-mono mt-1">
                {selectedProject.onChainHash}
              </div>
            </div>

            <Button
              onClick={() => setSelectedProject(null)}
              className="w-full"
              variant="outline"
            >
              Close
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
