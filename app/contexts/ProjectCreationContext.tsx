
import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

// Validation schemas
export const milestoneSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  deliverables: z.array(z.string().min(1)),
  budget: z.number().min(0, 'Budget must be positive'),
  timeline: z.number().min(1, 'Timeline must be at least 1 day')
});

export const projectDataSchema = z.object({
  type: z.string().min(1, 'Project type is required'),
  template: z.string().min(1, 'Template is required'),
  name: z.string().min(1, 'Project name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  requirements: z.string().optional(),
  deliverables: z.array(z.string()).default([]),
  timeline: z.enum(['urgent', 'standard', 'flexible']).default('standard'),
  milestones: z.array(milestoneSchema).min(1, 'At least one milestone is required'),
  budget: z.object({
    total: z.number().min(0, 'Total budget must be positive'),
    currency: z.string().default('USDC'),
    paymentMethod: z.string().default('crypto')
  }),
  team: z.array(z.object({
    address: z.string(),
    role: z.string(),
    permissions: z.array(z.string())
  })).default([]),
  contract: z.object({
    template: z.string().default('standard'),
    terms: z.string().default(''),
    disputeResolution: z.string().default('mediation')
  })
});

export type ProjectData = z.infer<typeof projectDataSchema>;
export type Milestone = z.infer<typeof milestoneSchema>;

interface ProjectCreationContextType {
  currentStep: number;
  totalSteps: number;
  projectData: ProjectData;
  errors: Record<string, string>;
  isLoading: boolean;
  canProceed: boolean;
  nextStep: () => void;
  previousStep: () => void;
  updateProjectData: (updates: Partial<ProjectData>) => void;
  validateCurrentStep: () => boolean;
  createProject: () => Promise<boolean>;
  setError: (field: string, message: string) => void;
  clearError: (field: string) => void;
}

const ProjectCreationContext = createContext<ProjectCreationContextType | undefined>(undefined);

const initialProjectData: ProjectData = {
  type: '',
  template: '',
  name: '',
  description: '',
  requirements: '',
  deliverables: [],
  timeline: 'standard',
  milestones: [],
  budget: {
    total: 0,
    currency: 'USDC',
    paymentMethod: 'crypto'
  },
  team: [],
  contract: {
    template: 'standard',
    terms: '',
    disputeResolution: 'mediation'
  }
};

export const ProjectCreationProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [projectData, setProjectData] = useState<ProjectData>(initialProjectData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const totalSteps = 7;

  const setError = useCallback((field: string, message: string) => {
    setErrors(prev => ({ ...prev, [field]: message }));
  }, []);

  const clearError = useCallback((field: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  const updateProjectData = useCallback((updates: Partial<ProjectData>) => {
    setProjectData(prev => {
      const updated = { ...prev, ...updates };
      // Auto-save to localStorage
      localStorage.setItem('project_draft', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const validateCurrentStep = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};

    switch (currentStep) {
      case 1:
        if (!projectData.type) newErrors.type = 'Project type is required';
        if (!projectData.template) newErrors.template = 'Template is required';
        break;
      case 2:
        if (!projectData.name) newErrors.name = 'Project name is required';
        if (!projectData.description || projectData.description.length < 10) {
          newErrors.description = 'Description must be at least 10 characters';
        }
        break;
      case 3:
        if (projectData.milestones.length === 0) {
          newErrors.milestones = 'At least one milestone is required';
        } else {
          projectData.milestones.forEach((milestone, index) => {
            if (!milestone.title) newErrors[`milestone_${index}_title`] = 'Title is required';
            if (milestone.budget <= 0) newErrors[`milestone_${index}_budget`] = 'Budget must be positive';
          });
        }
        break;
      case 4:
        if (projectData.budget.total <= 0) newErrors.budget = 'Total budget must be positive';
        break;
      case 5:
        // Team is optional
        break;
      case 6:
        if (!projectData.contract.template) newErrors.contract = 'Contract template is required';
        break;
      case 7:
        // Review step
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [currentStep, projectData]);

  // Use useMemo to prevent infinite re-renders
  const canProceed = useMemo(() => {
    const newErrors: Record<string, string> = {};

    switch (currentStep) {
      case 1:
        if (!projectData.type) newErrors.type = 'Project type is required';
        if (!projectData.template) newErrors.template = 'Template is required';
        break;
      case 2:
        if (!projectData.name) newErrors.name = 'Project name is required';
        if (!projectData.description || projectData.description.length < 10) {
          newErrors.description = 'Description must be at least 10 characters';
        }
        break;
      case 3:
        if (projectData.milestones.length === 0) {
          newErrors.milestones = 'At least one milestone is required';
        } else {
          projectData.milestones.forEach((milestone, index) => {
            if (!milestone.title) newErrors[`milestone_${index}_title`] = 'Title is required';
            if (milestone.budget <= 0) newErrors[`milestone_${index}_budget`] = 'Budget must be positive';
          });
        }
        break;
      case 4:
        if (projectData.budget.total <= 0) newErrors.budget = 'Total budget must be positive';
        break;
      case 5:
        // Team is optional
        break;
      case 6:
        if (!projectData.contract.template) newErrors.contract = 'Contract template is required';
        break;
      case 7:
        // Review step
        break;
    }

    return Object.keys(newErrors).length === 0;
  }, [currentStep, projectData]);

  const nextStep = useCallback(() => {
    if (validateCurrentStep() && currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep, totalSteps, validateCurrentStep]);

  const previousStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const createProject = useCallback(async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Validate entire project data
      const validation = projectDataSchema.safeParse(projectData);
      if (!validation.success) {
        const fieldErrors: Record<string, string> = {};
        validation.error.errors.forEach(error => {
          fieldErrors[error.path.join('.')] = error.message;
        });
        setErrors(fieldErrors);
        setIsLoading(false);
        return false;
      }

      // Simulate project creation
      console.log('Creating project:', projectData);
      
      // Clear draft from localStorage
      localStorage.removeItem('project_draft');
      
      toast({
        title: "Project Created Successfully",
        description: `${projectData.name} has been deployed to the blockchain.`,
      });
      
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Failed to create project:', error);
      toast({
        title: "Project Creation Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }
  }, [projectData, toast]);

  const value: ProjectCreationContextType = {
    currentStep,
    totalSteps,
    projectData,
    errors,
    isLoading,
    canProceed,
    nextStep,
    previousStep,
    updateProjectData,
    validateCurrentStep,
    createProject,
    setError,
    clearError
  };

  return (
    <ProjectCreationContext.Provider value={value}>
      {children}
    </ProjectCreationContext.Provider>
  );
};

export const useProjectCreation = () => {
  const context = useContext(ProjectCreationContext);
  if (context === undefined) {
    throw new Error('useProjectCreation must be used within a ProjectCreationProvider');
  }
  return context;
};
