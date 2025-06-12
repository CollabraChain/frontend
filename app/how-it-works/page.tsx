import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Bot, Shield, DollarSign, CheckCircle, Wallet, Globe, Users, Award, Zap } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI Project Assistant",
    description: "Start projects in chat. AI sets up contracts & milestones for you.",
    color: "text-energy-green"
  },
  {
    icon: Shield,
    title: "Secure Messaging",
    description: "Private, end-to-end encrypted group chats for all collaboration.",
    color: "text-trust-blue"
  },
  {
    icon: DollarSign,
    title: "Smart Escrow",
    description: "Funds are held safely and released automatically on milestone approval.",
    color: "text-energy-green"
  },
  {
    icon: CheckCircle,
    title: "Milestone Tracking",
    description: "Track progress and approvals directly in chat with AI help.",
    color: "text-trust-blue"
  },
  {
    icon: Wallet,
    title: "Instant Payments",
    description: "Get paid in USDC instantly on Base when work is approved.",
    color: "text-energy-green"
  },
  {
    icon: Globe,
    title: "On-Chain Reputation",
    description: "Earn verifiable credentials and build your Web3 profile.",
    color: "text-trust-blue"
  }
];

const journeys = [
  {
    icon: Users,
    title: "For Freelancers",
    description: "Join a project chat, agree on milestones, deliver work, and get paid automatically."
  },
  {
    icon: Award,
    title: "For Clients",
    description: "Start a project, fund escrow, track progress, and release payments with confidence."
  },
  {
    icon: Zap,
    title: "AI-Powered",
    description: "Let AI handle setup, reminders, and milestone checks—just chat naturally."
  }
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h1 className="text-4xl font-bold tracking-tight text-neutral-800 sm:text-5xl mb-4">
                How CollabraChain Works
              </h1>
              <p className="text-lg text-neutral-600">
                Simple, secure, and AI-powered collaboration—all in your chat.
              </p>
            </div>
            <div className="mx-auto mt-12 max-w-6xl">
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
        <section className="py-16 bg-neutral-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-12">
              <h2 className="text-2xl font-bold tracking-tight text-neutral-800 mb-4">
                User Journeys
              </h2>
              <p className="text-neutral-600">
                See how CollabraChain makes work seamless for everyone.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {journeys.map((journey) => (
                <div key={journey.title} className="flex flex-col items-center text-center p-8 rounded-2xl bg-white border border-neutral-200 shadow-sm hover:shadow-md transition-all">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-energy-green/10 text-energy-green mb-4">
                    <journey.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-neutral-800">{journey.title}</h3>
                  <p className="text-neutral-600 text-base">{journey.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
} 