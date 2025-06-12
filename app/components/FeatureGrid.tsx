
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bot,
  Shield,
  DollarSign,
  CheckCircle,
  Wallet,
  Globe,
} from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI Project Assistant",
    description: "Smart agents parse natural language, set up contracts, and manage milestones automatically within your chats.",
    color: "text-energy-green"
  },
  {
    icon: Shield,
    title: "Secure Messaging",
    description: "End-to-end encrypted communications via XMTP ensure your project discussions stay private and verifiable.",
    color: "text-trust-blue"
  },
  {
    icon: DollarSign,
    title: "Smart Escrow",
    description: "Automated payment releases based on milestone completion. Funds are secured on Base blockchain until work is approved.",
    color: "text-energy-green"
  },
  {
    icon: CheckCircle,
    title: "Milestone Tracking",
    description: "AI-powered progress monitoring with transparent approval workflows built into your chat experience.",
    color: "text-trust-blue"
  },
  {
    icon: Wallet,
    title: "Coinbase Integration",
    description: "Seamless wallet connectivity with gasless transactions and instant USDC payments on Base network.",
    color: "text-energy-green"
  },
  {
    icon: Globe,
    title: "Global Collaboration",
    description: "Cross-border payments with transparent fee structures and real-time settlement for distributed teams.",
    color: "text-trust-blue"
  }
];

export const FeatureGrid = () => {
  return (
    <section id="features" className="py-20 sm:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-800 sm:text-4xl">
            Everything you need for{" "}
            <span className="trust-blue">decentralized collaboration</span>
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            Powerful features that transform how distributed teams work together
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-6xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="relative overflow-hidden hover:shadow-lg transition-all duration-300 border-neutral-200 hover:border-trust-blue/30"
              >
                <CardHeader className="pb-4">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg bg-neutral-100 ${feature.color}`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-neutral-800">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-neutral-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
