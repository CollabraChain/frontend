
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Clock, DollarSign, Star, Users, AlertCircle } from 'lucide-react';
import { Project } from './useMarketplace';
import { useToast } from '@/hooks/use-toast';

interface ProjectCardProps {
  project: Project;
  onApply: () => Promise<void>;
}

const ProjectCard = ({ project, onApply }: ProjectCardProps) => {
  const [isApplying, setIsApplying] = useState(false);
  const { toast } = useToast();

  const getClientInitial = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  const formatBudget = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleApply = async () => {
    setIsApplying(true);
    try {
      await onApply();
      toast({
        title: "Application Submitted!",
        description: `Your application for "${project.title}" has been sent to the client.`,
      });
    } catch (error) {
      toast({
        title: "Application Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader className="flex-shrink-0">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {project.isUrgent && (
                <Badge variant="destructive" className="flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  Urgent
                </Badge>
              )}
              <Badge variant="outline">{project.category}</Badge>
            </div>
            <CardTitle className="text-lg leading-tight">{project.title}</CardTitle>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Skills */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {project.skills.slice(0, 4).map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {project.skills.length > 4 && (
              <Badge variant="secondary" className="text-xs">
                +{project.skills.length - 4} more
              </Badge>
            )}
          </div>
        </div>

        {/* Project Details */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-energy-green" />
            <span className="font-medium">{formatBudget(project.budget)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{project.timeline}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{project.applicants} applicants</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {project.experienceLevel}
            </Badge>
          </div>
        </div>

        {/* Client Info */}
        <div className="flex items-center justify-between mb-4 pt-4 border-t">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-trust-blue/10 text-trust-blue text-xs">
                {getClientInitial(project.clientName)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">{project.clientName}</p>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 text-amber-500 fill-current" />
                <span className="text-xs text-muted-foreground">
                  {project.clientRating} ({project.clientReviews} reviews)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-auto">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                className="w-full bg-trust-blue hover:bg-trust-blue/90"
                disabled={isApplying}
              >
                {isApplying ? 'Applying...' : 'Apply to Project'}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Apply to {project.title}?</AlertDialogTitle>
                <AlertDialogDescription>
                  You're about to submit an application for this project. The client will be notified and can review your profile to consider you for the role.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleApply} disabled={isApplying}>
                  {isApplying ? 'Submitting...' : 'Submit Application'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
