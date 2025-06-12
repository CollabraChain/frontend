
import { useState } from 'react';

export const useProjectData = () => {
  const [projectData, setProjectData] = useState({
    name: 'Website Redesign',
    description: 'Complete redesign of the company website with modern UI/UX principles. This project involves creating a responsive design that works across all devices, implementing a new design system, optimizing for performance and accessibility, and integrating with our existing backend systems. The goal is to improve user engagement and conversion rates while maintaining brand consistency.',
    status: 'in-progress',
    budget: '1,000 USDC',
    spent: '300 USDC',
    progress: 30,
    startDate: '2024-01-15',
    deadline: '2024-02-15',
    participants: [
      { name: 'ben.base', role: 'Client', avatar: '' },
      { name: 'anya.base', role: 'Designer', avatar: '' }
    ],
    contractAddress: '0x1234...5678'
  });

  const milestones = [
    {
      id: 1,
      name: 'Initial Wireframes',
      description: 'Create wireframes for all main pages',
      amount: '300 USDC',
      status: 'pending-approval' as const,
      dueDate: '2024-01-22',
      deliverables: ['Mobile wireframes', 'Desktop wireframes', 'User flow diagram']
    },
    {
      id: 2,
      name: 'Visual Design',
      description: 'Design system and high-fidelity mockups',
      amount: '400 USDC',
      status: 'upcoming' as const,
      dueDate: '2024-02-05',
      deliverables: ['Design system', 'Homepage design', 'Key page designs']
    },
    {
      id: 3,
      name: 'Final Assets',
      description: 'Export all assets and create style guide',
      amount: '300 USDC',
      status: 'upcoming' as const,
      dueDate: '2024-02-15',
      deliverables: ['Exported assets', 'Style guide', 'Handoff documentation']
    }
  ];

  const updateProjectData = (updates: Partial<typeof projectData>) => {
    setProjectData(prev => ({ ...prev, ...updates }));
  };

  const handleDescriptionSave = (newDescription: string) => {
    updateProjectData({ description: newDescription });
  };

  const handleMilestoneAction = (milestoneId: number, action: 'approve' | 'request-changes') => {
    console.log(`Milestone ${milestoneId} action: ${action}`);
    // In a real app, this would trigger smart contract interactions
  };

  return {
    projectData,
    milestones,
    updateProjectData,
    handleDescriptionSave,
    handleMilestoneAction
  };
};
