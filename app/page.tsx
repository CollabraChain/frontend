import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import {
    MessageSquare,
    Zap,
    Users,
    Bot,
    Wallet,
    Globe,
    FileText,
    Award
} from "lucide-react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { FeatureGrid } from "./components/FeatureGrid";
import { StatsSection } from "./components/StatsSection";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";

export default function Index() {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="relative">
                <HeroSection />
                <StatsSection />
                <FeatureGrid />

                {/* Enhanced Use Cases Section */}
                <section className="py-20 bg-neutral-50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center mb-16">
                            <h2 className="text-3xl font-bold tracking-tight text-neutral-800 sm:text-4xl">
                                Built for the Future of{" "}
                                <span className="trust-blue">Decentralized Work</span>
                            </h2>
                            <p className="mt-4 text-lg text-neutral-600">
                                From freelancers to DeSci communities, CollabraChain transforms how distributed teams collaborate
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <Card className="border-neutral-200 hover:border-trust-blue/30 transition-all duration-300">
                                <CardHeader>
                                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-energy-green/10 text-energy-green mb-4">
                                        <Users className="h-6 w-6" />
                                    </div>
                                    <CardTitle className="text-xl">Freelancers & Clients</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-neutral-600 leading-relaxed">
                                        Secure payments, transparent milestones, and encrypted communication.
                                        Build trust with smart contract escrows and automated releases.
                                    </CardDescription>
                                </CardContent>
                            </Card>

                            <Card className="border-neutral-200 hover:border-trust-blue/30 transition-all duration-300">
                                <CardHeader>
                                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-trust-blue/10 text-trust-blue mb-4">
                                        <Globe className="h-6 w-6" />
                                    </div>
                                    <CardTitle className="text-xl">Distributed Teams</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-neutral-600 leading-relaxed">
                                        Coordinate across time zones with AI-powered project management.
                                        Real-time progress tracking and instant global payments.
                                    </CardDescription>
                                </CardContent>
                            </Card>

                            <Card className="border-neutral-200 hover:border-trust-blue/30 transition-all duration-300">
                                <CardHeader>
                                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-energy-green/10 text-energy-green mb-4">
                                        <Award className="h-6 w-6" />
                                    </div>
                                    <CardTitle className="text-xl">Creator Economy</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-neutral-600 leading-relaxed">
                                        Collaborative content creation with transparent revenue sharing.
                                        Build verifiable reputation through on-chain achievements.
                                    </CardDescription>
                                </CardContent>
                            </Card>

                            <Card className="border-neutral-200 hover:border-trust-blue/30 transition-all duration-300">
                                <CardHeader>
                                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-trust-blue/10 text-trust-blue mb-4">
                                        <FileText className="h-6 w-6" />
                                    </div>
                                    <CardTitle className="text-xl">DeSci & DeEd</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-neutral-600 leading-relaxed">
                                        Research collaboration with immutable records. Transparent funding
                                        distribution and intellectual property management.
                                    </CardDescription>
                                </CardContent>
                            </Card>

                            <Card className="border-neutral-200 hover:border-trust-blue/30 transition-all duration-300">
                                <CardHeader>
                                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-energy-green/10 text-energy-green mb-4">
                                        <Bot className="h-6 w-6" />
                                    </div>
                                    <CardTitle className="text-xl">AI-Native Workflows</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-neutral-600 leading-relaxed">
                                        Natural language project setup, automated milestone verification,
                                        and intelligent task delegation through AI agents.
                                    </CardDescription>
                                </CardContent>
                            </Card>

                            <Card className="border-neutral-200 hover:border-trust-blue/30 transition-all duration-300">
                                <CardHeader>
                                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-trust-blue/10 text-trust-blue mb-4">
                                        <Wallet className="h-6 w-6" />
                                    </div>
                                    <CardTitle className="text-xl">Web3 Communities</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-neutral-600 leading-relaxed">
                                        DAO project management with transparent governance. Contributor
                                        rewards and reputation systems built on verifiable credentials.
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Technology Stack Section */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center mb-16">
                            <h2 className="text-3xl font-bold tracking-tight text-neutral-800 sm:text-4xl">
                                Powered by the Best of{" "}
                                <span className="energy-green">Web3 Infrastructure</span>
                            </h2>
                            <p className="mt-4 text-lg text-neutral-600">
                                Built on cutting-edge protocols for security, speed, and seamless user experience
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-trust-blue/5 to-trust-blue/10 border border-trust-blue/20">
                                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-trust-blue mb-6">
                                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                                        <span className="text-trust-blue text-sm font-bold">B</span>
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold mb-4">Base Blockchain</h3>
                                <p className="text-neutral-600 leading-relaxed">
                                    Fast, low-cost transactions with EVM compatibility. Smart contract escrows
                                    and automated payments with sub-second finality.
                                </p>
                            </div>

                            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-energy-green/5 to-energy-green/10 border border-energy-green/20">
                                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-energy-green mb-6">
                                    <MessageSquare className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold mb-4">XMTP Protocol</h3>
                                <p className="text-neutral-600 leading-relaxed">
                                    End-to-end encrypted messaging with wallet-based identity.
                                    Decentralized communication that you own and control.
                                </p>
                            </div>

                            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-energy-green/5 to-energy-green/10 border border-energy-green/20">
                                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-energy-green mb-6">
                                    <Zap className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold mb-4">Coinbase AgentKit</h3>
                                <p className="text-neutral-600 leading-relaxed">
                                    AI agents that understand natural language and execute blockchain
                                    transactions. Gasless interactions for seamless user experience.
                                </p>
                            </div>

                            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-trust-blue/5 to-trust-blue/10 border border-trust-blue/20">
                                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-trust-blue mb-6">
                                    <Globe className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold mb-4">Basenames</h3>
                                <p className="text-neutral-600 leading-relaxed">
                                    Human-readable identities for seamless interactions.
                                    No more confusing wallet addresses in your collaborations.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <CTASection />
            </main>

            <Footer />
        </div>
    );
};
