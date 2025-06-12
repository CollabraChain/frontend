"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ProjectCreationProvider, useProjectCreation } from '@/contexts/ProjectCreationContext';
import ProgressIndicator from '@/components/project-creation/ProgressIndicator';
import ProjectTypeSelector from '@/components/project-creation/ProjectTypeSelector';
import ProjectDetailsForm from '@/components/project-creation/ProjectDetailsForm';
import MilestoneBuilder from '@/components/project-creation/MilestoneBuilder';
import BudgetCalculator from '@/components/project-creation/BudgetCalculator';
import TeamInvitation from '@/components/project-creation/TeamInvitation';
import ContractConfigurator from '@/components/project-creation/ContractConfigurator';
import ProjectSummary from '@/components/project-creation/ProjectSummary';

const CreateProjectContent = () => {
    const router = useRouter();
    const {
        currentStep,
        totalSteps,
        projectData,
        canProceed,
        nextStep,
        previousStep,
        updateProjectData,
        createProject,
        isLoading
    } = useProjectCreation();

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <ProjectTypeSelector
                        selectedType={projectData.type}
                        onTypeSelect={(type, template) => updateProjectData({ type, template })}
                    />
                );
            case 2:
                return <ProjectDetailsForm />;
            case 3:
                return (
                    <MilestoneBuilder
                        milestones={projectData.milestones}
                        onUpdate={(milestones) => updateProjectData({ milestones })}
                    />
                );
            case 4:
                return <BudgetCalculator />;
            case 5:
                return (
                    <TeamInvitation
                        team={projectData.team}
                        onUpdate={(team) => updateProjectData({ team })}
                    />
                );
            case 6:
                return (
                    <ContractConfigurator
                        contract={projectData.contract}
                        onUpdate={(contract) => updateProjectData({ contract })}
                    />
                );
            case 7:
                return (
                    <ProjectSummary
                        projectData={projectData}
                        onUpdate={updateProjectData}
                    />
                );
            default:
                return null;
        }
    };

    const handleCreateProject = async () => {
        const success = await createProject();
        if (success) {
            router.push('/demo');
        }
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="border-b border-border bg-card">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon" onClick={() => router.back()}>
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div>
                            <h1 className="text-xl font-semibold">Create New Project</h1>
                            <p className="text-sm text-muted-foreground">
                                Set up your project with smart contracts and milestone-based payments
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress Indicator */}
            <div className="max-w-4xl mx-auto px-4 py-6">
                <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 pb-8">
                <div className="bg-card rounded-lg border border-border p-6">
                    {renderStepContent()}
                </div>

                {/* Navigation */}
                <div className="flex justify-between mt-6">
                    <Button
                        variant="outline"
                        onClick={previousStep}
                        disabled={currentStep === 1}
                    >
                        Previous
                    </Button>

                    <div className="flex gap-2">
                        <Button variant="outline">
                            Save as Draft
                        </Button>

                        {currentStep === totalSteps ? (
                            <Button
                                onClick={handleCreateProject}
                                disabled={!canProceed || isLoading}
                            >
                                {isLoading ? 'Creating...' : 'Create Project'}
                            </Button>
                        ) : (
                            <Button onClick={nextStep} disabled={!canProceed}>
                                Next
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const CreateProject = () => {
    return (
        <ProjectCreationProvider>
            <CreateProjectContent />
        </ProjectCreationProvider>
    );
};

export default CreateProject;
