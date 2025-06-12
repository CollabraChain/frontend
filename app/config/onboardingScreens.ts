
import { MessageSquare, Bot, Shield, LucideIcon } from "lucide-react";

export interface OnboardingScreenData {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  content: string;
  animation: string;
}

export const onboardingScreens: OnboardingScreenData[] = [
  {
    title: "Welcome to CollabraChain",
    subtitle: "The future of decentralized work",
    icon: MessageSquare,
    content: "AI-powered project management meets blockchain security. Collaborate with confidence on the Base network.",
    animation: "animate-fade-in"
  },
  {
    title: "AI-Powered Project Management",
    subtitle: "Right in your chat",
    icon: Bot,
    content: "Get intelligent suggestions, automated milestone tracking, and seamless project coordination through natural conversation.",
    animation: "animate-scale-in"
  },
  {
    title: "Secure Payments & Agreements",
    subtitle: "On the Base blockchain",
    icon: Shield,
    content: "Smart contracts ensure secure escrow, automatic payments upon milestone completion, and dispute resolution.",
    animation: "animate-fade-in"
  }
];
