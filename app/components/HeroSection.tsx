import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, Shield, Zap, MessageSquare, } from "lucide-react";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-neutral-50 to-white py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <Badge className="mb-4 bg-energy-green/10 text-energy-green border-energy-green/20 hover:bg-energy-green/20">
            🚀 Built for Base Buildathon
          </Badge>

          <h1 className="text-4xl font-bold tracking-tight text-neutral-800 sm:text-6xl lg:text-7xl">
            AI-Powered{" "}
            <span className="text-trust-blue">On-Chain Hub</span>{" "}
            for Decentralized Collaboration
          </h1>

          <p className="mt-6 text-lg leading-8 text-neutral-600 sm:text-xl max-w-3xl mx-auto">
            Transform group chats into dynamic workspaces. Secure XMTP messaging meets
            intelligent AI agents and automated Base blockchain payments—all in one platform.
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6 flex-wrap">
            <Button
              size="lg"
              className="bg-energy-green hover:bg-energy-green-light text-white px-8 py-3 text-base"
              asChild
            >
              <Link href="/onboarding">
                Start Collaborating
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="px-8 py-3 text-base"
              asChild
            >
              <Link href="/demo">
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Link>
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
            <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-white/50 border border-neutral-200">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-trust-blue" />
                <span className="font-medium text-neutral-800">End-to-End Encrypted</span>
              </div>
              <span className="text-neutral-600 text-center">XMTP secure messaging with wallet-based identity</span>
            </div>

            <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-white/50 border border-neutral-200">
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-energy-green" />
                <span className="font-medium text-neutral-800">Instant Payments</span>
              </div>
              <span className="text-neutral-600 text-center">Smart contract escrows with automated USDC releases</span>
            </div>

            <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-white/50 border border-neutral-200">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-trust-blue" />
                <span className="font-medium text-neutral-800">AI-Native Workflows</span>
              </div>
              <span className="text-neutral-600 text-center">Natural language project setup via AgentKit AI</span>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-trust-blue to-energy-green opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
      </div>
    </section>
  );
};
