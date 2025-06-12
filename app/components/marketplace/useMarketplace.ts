
import { useState, useMemo, useEffect } from 'react';

export interface Project {
  id: string;
  title: string;
  description: string;
  budget: number;
  timeline: string;
  skills: string[];
  category: string;
  clientName: string;
  clientRating: number;
  clientReviews: number;
  applicants: number;
  postedDate: string;
  status: 'open' | 'in_progress' | 'completed';
  isUrgent?: boolean;
  experienceLevel: 'beginner' | 'intermediate' | 'expert';
  hasApplied?: boolean;
}

export interface MarketplaceFilters {
  category: string;
  budgetMin: number;
  budgetMax: number;
  skills: string[];
  timeline: string;
  experienceLevel: string;
  clientRating: number;
}

const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Modern E-commerce Website',
    description: 'Need a responsive e-commerce website with React and payment integration. Looking for an experienced developer who can deliver within 4 weeks.',
    budget: 2500,
    timeline: '4 weeks',
    skills: ['React', 'TypeScript', 'Stripe', 'Tailwind CSS'],
    category: 'Web Development',
    clientName: 'TechCorp Ltd',
    clientRating: 4.8,
    clientReviews: 24,
    applicants: 12,
    postedDate: '2024-01-15',
    status: 'open',
    isUrgent: true,
    experienceLevel: 'intermediate'
  },
  {
    id: '2',
    title: 'Mobile App UI/UX Design',
    description: 'Design a modern mobile app interface for a fitness tracking application. Need complete wireframes and high-fidelity designs.',
    budget: 1800,
    timeline: '3 weeks',
    skills: ['Figma', 'UI/UX Design', 'Mobile Design', 'Prototyping'],
    category: 'Design',
    clientName: 'FitLife Startup',
    clientRating: 4.6,
    clientReviews: 18,
    applicants: 8,
    postedDate: '2024-01-14',
    status: 'open',
    experienceLevel: 'expert'
  },
  {
    id: '3',
    title: 'Smart Contract Development',
    description: 'Develop a DeFi protocol smart contract with staking and yield farming features. Security audit required.',
    budget: 5000,
    timeline: '6 weeks',
    skills: ['Solidity', 'Web3', 'DeFi', 'Smart Contracts'],
    category: 'Blockchain',
    clientName: 'DeFi Innovations',
    clientRating: 4.9,
    clientReviews: 31,
    applicants: 15,
    postedDate: '2024-01-13',
    status: 'open',
    experienceLevel: 'expert'
  },
  {
    id: '4',
    title: 'Content Writing for Tech Blog',
    description: 'Write 10 technical articles about AI and machine learning for our company blog. SEO optimization required.',
    budget: 800,
    timeline: '2 weeks',
    skills: ['Technical Writing', 'SEO', 'AI/ML Knowledge', 'Content Strategy'],
    category: 'Content',
    clientName: 'AI Research Co',
    clientRating: 4.7,
    clientReviews: 42,
    applicants: 6,
    postedDate: '2024-01-12',
    status: 'open',
    experienceLevel: 'intermediate'
  }
];

export const useMarketplace = () => {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [filters, setFilters] = useState<MarketplaceFilters>({
    category: '',
    budgetMin: 0,
    budgetMax: 10000,
    skills: [],
    timeline: '',
    experienceLevel: '',
    clientRating: 0
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [appliedProjects, setAppliedProjects] = useState<Set<string>>(new Set());

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      // Search query filter
      if (searchQuery && !project.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !project.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Category filter
      if (filters.category && project.category !== filters.category) {
        return false;
      }

      // Budget filter
      if (project.budget < filters.budgetMin || project.budget > filters.budgetMax) {
        return false;
      }

      // Skills filter
      if (filters.skills.length > 0) {
        const hasMatchingSkill = filters.skills.some(skill => 
          project.skills.some(projectSkill => 
            projectSkill.toLowerCase().includes(skill.toLowerCase())
          )
        );
        if (!hasMatchingSkill) {
          return false;
        }
      }

      // Experience level filter
      if (filters.experienceLevel && project.experienceLevel !== filters.experienceLevel) {
        return false;
      }

      // Client rating filter
      if (filters.clientRating > 0 && project.clientRating < filters.clientRating) {
        return false;
      }

      return true;
    }).map(project => ({
      ...project,
      hasApplied: appliedProjects.has(project.id)
    }));
  }, [projects, filters, searchQuery, appliedProjects]);

  const updateFilters = (newFilters: Partial<MarketplaceFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const updateSearchQuery = (query: string) => {
    setSearchQuery(query);
  };

  const applyToProject = async (projectId: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update the applicant count and mark as applied
      setProjects(prev => prev.map(project => 
        project.id === projectId 
          ? { ...project, applicants: project.applicants + 1 }
          : project
      ));
      
      setAppliedProjects(prev => new Set([...prev, projectId]));
      
      console.log(`Successfully applied to project: ${projectId}`);
    } catch (error) {
      console.error('Failed to apply to project:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    projects,
    filteredProjects,
    filters,
    searchQuery,
    isLoading,
    updateFilters,
    updateSearchQuery,
    applyToProject
  };
};
