'use client';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useAccount } from "wagmi";
import { Wallet } from "@coinbase/onchainkit/wallet";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const {
    isConnected,
  } = useAccount();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Link href="/" className="p-2 bg-trust-blue rounded-lg flex items-center">
                <MessageSquare className="h-6 w-6 text-white" />
              </Link>
              <Link href="/" className="text-xl font-bold trust-blue">CollabraChain</Link>
            </div>
            <Badge variant="secondary" className="hidden sm:inline-flex">
              Built on Base
            </Badge>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/#features" className="text-neutral-600 hover:text-trust-blue transition-colors">
              Features
            </Link>
            <Link href="/how-it-works" className="text-neutral-600 hover:text-trust-blue transition-colors">
              How it Works
            </Link>
            <a href="https://collabrachain.gitbook.io/docs/" target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-trust-blue transition-colors">
              Docs
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            {isConnected ? (
              <Wallet />
            ) : (
              <Button className="bg-energy-green hover:bg-energy-green-light text-white" asChild>
                <Link href="/onboarding">Get Started</Link>
              </Button>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link href="/#features" className="text-neutral-600 hover:text-trust-blue transition-colors">
                Features
              </Link>
              <Link href="/how-it-works" className="text-neutral-600 hover:text-trust-blue transition-colors">
                How it Works
              </Link>
              <a href="https://collabrachain.gitbook.io/docs/" target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-trust-blue transition-colors">
                Docs
              </a>
              <Button variant="ghost" className="justify-start" asChild>
                <Link href="/onboarding">Get Started</Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
