
import React, { useState } from 'react';
import { useHelp } from '@/contexts/HelpContext';
import ProjectHeader from '@/components/project/ProjectHeader';
import ProjectOverview from '@/components/project/ProjectOverview';
import MilestoneTracker from '@/components/project/MilestoneTracker';
import ContractDetails from '@/components/project/ContractDetails';
import { useProjectData } from '@/components/project/useProjectData';

const ProjectDetails = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { openHelp } = useHelp();
  const [isProjectOwner] = useState(true);
  
  const {
    projectData,
    milestones,
    handleDescriptionSave,
    handleMilestoneAction
  } = useProjectData();

  React.useEffect(() => {
    openHelp('details');
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <ProjectOverview
            projectData={projectData}
            isProjectOwner={isProjectOwner}
            onDescriptionSave={handleDescriptionSave}
          />
        );
      case 'milestones':
        return (
          <MilestoneTracker
            milestones={milestones}
            onMilestoneAction={handleMilestoneAction}
          />
        );
      case 'contract':
        return <ContractDetails projectData={projectData} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <ProjectHeader
        projectName={projectData.name}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      <div className="flex-1 overflow-y-auto p-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default ProjectDetails;
