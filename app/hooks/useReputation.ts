"use client";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
export interface VerifiableCredential {
  id: string;
  type: "skill" | "project_completion" | "client_feedback" | "certification";
  title: string;
  description: string;
  issuer: string;
  issuedDate: string;
  expiryDate?: string;
  verified: boolean;
  onChainHash?: string;
  metadata: {
    skill?: string;
    projectId?: string;
    rating?: number;
    clientAddress?: string;
  };
}

export interface CompletedProject {
  id: string;
  title: string;
  description: string;
  category: string;
  budget: number;
  completedDate: string;
  clientName: string;
  clientRating: number;
  clientFeedback: string;
  skills: string[];
  deliverables: string[];
  onChainHash: string;
}

export interface ReputationScore {
  overall: number;
  reliability: number;
  quality: number;
  communication: number;
  technical: number;
  projectsCompleted: number;
  totalEarned: number;
  averageRating: number;
  repeatClients: number;
}

export interface SkillVerification {
  skill: string;
  level: "beginner" | "intermediate" | "expert";
  verifiedCount: number;
  lastVerified: string;
  credentialIds: string[];
}

export const useReputation = () => {
  const { address, isConnected } = useAccount();
  const [credentials, setCredentials] = useState<VerifiableCredential[]>([]);
  const [portfolio, setPortfolio] = useState<CompletedProject[]>([]);
  const [reputationScore, setReputationScore] =
    useState<ReputationScore | null>(null);
  const [skillVerifications, setSkillVerifications] = useState<
    SkillVerification[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    if (!isConnected || !address) return;

    const mockCredentials: VerifiableCredential[] = [
      {
        id: "vc-1",
        type: "skill",
        title: "React Expert",
        description:
          "Verified expertise in React development through multiple successful projects",
        issuer: "CollabraChain Protocol",
        issuedDate: "2024-01-15",
        verified: true,
        onChainHash: "0xabc123...",
        metadata: { skill: "React", rating: 5 },
      },
      {
        id: "vc-2",
        type: "project_completion",
        title: "E-commerce Platform Delivery",
        description:
          "Successfully delivered a complete e-commerce platform on time and within budget",
        issuer: "client.base",
        issuedDate: "2024-01-20",
        verified: true,
        onChainHash: "0xdef456...",
        metadata: { projectId: "proj-1", rating: 5, clientAddress: "0x123..." },
      },
      {
        id: "vc-3",
        type: "client_feedback",
        title: "Exceptional Communication",
        description:
          "Recognized for outstanding communication and project management skills",
        issuer: "startup.base",
        issuedDate: "2024-01-25",
        verified: true,
        onChainHash: "0xghi789...",
        metadata: { rating: 5, clientAddress: "0x456..." },
      },
    ];

    const mockPortfolio: CompletedProject[] = [
      {
        id: "proj-1",
        title: "E-commerce Platform",
        description:
          "Built a complete e-commerce platform with React, Node.js, and Stripe integration",
        category: "Web Development",
        budget: 5000,
        completedDate: "2024-01-20",
        clientName: "client.base",
        clientRating: 5,
        clientFeedback:
          "Outstanding work! Delivered exactly what we needed on time.",
        skills: ["React", "Node.js", "Stripe", "PostgreSQL"],
        deliverables: [
          "Frontend Application",
          "Backend API",
          "Payment Integration",
          "Admin Dashboard",
        ],
        onChainHash: "0xproject1...",
      },
      {
        id: "proj-2",
        title: "Mobile App Design",
        description:
          "Designed a modern mobile app interface for a fitness tracking application",
        category: "Design",
        budget: 2500,
        completedDate: "2024-01-10",
        clientName: "startup.base",
        clientRating: 5,
        clientFeedback: "Amazing design work! Users love the new interface.",
        skills: ["UI/UX Design", "Figma", "Mobile Design", "Prototyping"],
        deliverables: [
          "Wireframes",
          "High-fidelity Designs",
          "Prototype",
          "Design System",
        ],
        onChainHash: "0xproject2...",
      },
    ];

    const mockReputationScore: ReputationScore = {
      overall: 4.9,
      reliability: 5.0,
      quality: 4.8,
      communication: 5.0,
      technical: 4.7,
      projectsCompleted: 12,
      totalEarned: 25000,
      averageRating: 4.9,
      repeatClients: 3,
    };

    const mockSkillVerifications: SkillVerification[] = [
      {
        skill: "React",
        level: "expert",
        verifiedCount: 8,
        lastVerified: "2024-01-20",
        credentialIds: ["vc-1", "vc-2"],
      },
      {
        skill: "TypeScript",
        level: "expert",
        verifiedCount: 6,
        lastVerified: "2024-01-15",
        credentialIds: ["vc-1"],
      },
      {
        skill: "UI/UX Design",
        level: "intermediate",
        verifiedCount: 4,
        lastVerified: "2024-01-10",
        credentialIds: ["vc-3"],
      },
      {
        skill: "Node.js",
        level: "intermediate",
        verifiedCount: 3,
        lastVerified: "2024-01-05",
        credentialIds: ["vc-2"],
      },
    ];

    setCredentials(mockCredentials);
    setPortfolio(mockPortfolio);
    setReputationScore(mockReputationScore);
    setSkillVerifications(mockSkillVerifications);
  }, [isConnected, address]);

  const issueCredential = async (
    credential: Omit<VerifiableCredential, "id" | "verified" | "onChainHash">
  ) => {
    setIsLoading(true);
    try {
      // Simulate on-chain credential issuance
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const newCredential: VerifiableCredential = {
        ...credential,
        id: `vc-${Date.now()}`,
        verified: true,
        onChainHash: `0x${Math.random().toString(16).substr(2, 8)}...`,
      };

      setCredentials((prev) => [newCredential, ...prev]);
      console.log("Credential issued successfully:", newCredential);
      return newCredential;
    } catch (error) {
      console.error("Failed to issue credential:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyCredential = async (credentialId: string) => {
    setIsLoading(true);
    try {
      // Simulate on-chain verification
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setCredentials((prev) =>
        prev.map((cred) =>
          cred.id === credentialId ? { ...cred, verified: true } : cred
        )
      );

      console.log("Credential verified successfully");
      return true;
    } catch (error) {
      console.error("Failed to verify credential:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const addProjectToPortfolio = async (
    project: Omit<CompletedProject, "id" | "onChainHash">
  ) => {
    setIsLoading(true);
    try {
      // Simulate on-chain project recording
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const newProject: CompletedProject = {
        ...project,
        id: `proj-${Date.now()}`,
        onChainHash: `0x${Math.random().toString(16).substr(2, 8)}...`,
      };

      setPortfolio((prev) => [newProject, ...prev]);

      // Update reputation score
      if (reputationScore) {
        setReputationScore((prev) => ({
          ...prev!,
          projectsCompleted: prev!.projectsCompleted + 1,
          totalEarned: prev!.totalEarned + project.budget,
          averageRating:
            (prev!.averageRating * prev!.projectsCompleted +
              project.clientRating) /
            (prev!.projectsCompleted + 1),
        }));
      }

      console.log("Project added to portfolio:", newProject);
      return newProject;
    } catch (error) {
      console.error("Failed to add project to portfolio:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    credentials,
    portfolio,
    reputationScore,
    skillVerifications,
    isLoading,
    issueCredential,
    verifyCredential,
    addProjectToPortfolio,
  };
};
