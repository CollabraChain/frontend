
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  MessageSquare,
  Twitter,
  Github,
  Mail,
  Shield,
  Zap,
  Globe,
} from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-neutral-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-trust-blue rounded-lg">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">CollabraChain</span>
            </div>
            <p className="text-neutral-300 mb-6 leading-relaxed">
              The future of decentralized collaboration. AI-powered project management
              with end-to-end encrypted messaging and instant on-chain payments.
            </p>
            <div className="flex items-center space-x-2 text-sm text-neutral-400">
              <Shield className="h-4 w-4" />
              <span>Built on Base • Powered by XMTP</span>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/demo" className="text-neutral-300 hover:text-energy-green transition-colors">
                  Interactive Demo
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="text-neutral-300 hover:text-energy-green transition-colors">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/create-project" className="text-neutral-300 hover:text-energy-green transition-colors">
                  Create Project
                </Link>
              </li>
              <li>
                <a href="#features" className="text-neutral-300 hover:text-energy-green transition-colors">
                  Features
                </a>
              </li>
            </ul>
          </div>

          {/* Technology Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Technology</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://base.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-300 hover:text-energy-green transition-colors flex items-center space-x-2"
                >
                  <div className="w-4 h-4 bg-trust-blue rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">B</span>
                  </div>
                  <span>Base Blockchain</span>
                </a>
              </li>
              <li>
                <a
                  href="https://xmtp.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-300 hover:text-energy-green transition-colors flex items-center space-x-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>XMTP Protocol</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.coinbase.com/agentkit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-300 hover:text-energy-green transition-colors flex items-center space-x-2"
                >
                  <Zap className="h-4 w-4" />
                  <span>Coinbase AgentKit</span>
                </a>
              </li>
              <li>
                <a
                  href="https://base.org/names"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-300 hover:text-energy-green transition-colors flex items-center space-x-2"
                >
                  <Globe className="h-4 w-4" />
                  <span>Basenames</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-neutral-300 hover:text-energy-green transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-300 hover:text-energy-green transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-300 hover:text-energy-green transition-colors">
                  Press Kit
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-300 hover:text-energy-green transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-neutral-700 mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-neutral-400">
            <span>© 2025 CollabraChain. Built for Base Buildathon.</span>
            <div className="flex items-center space-x-4">
              <a href="#" className="hover:text-energy-green transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-energy-green transition-colors">
                Terms of Service
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-energy-green">
              <Twitter className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-energy-green">
              <Github className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-energy-green">
              <Mail className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};
