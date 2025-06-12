import { Button } from "./ui/button";
import { ArrowRight, MessageSquare } from "lucide-react";
import Link from "next/link";

export const CTASection = () => {
  return (
    <section className="py-20 sm:py-32 bg-trust-blue">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-6">
            <MessageSquare className="h-8 w-8 text-white" />
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Ready to revolutionize
            <br />
            your collaboration?
          </h2>

          <p className="mt-6 text-lg leading-8 text-white/80 max-w-2xl mx-auto">
            Join the future of decentralized work. Secure messaging, AI assistance,
            and instant payments—all in one platform built on Base.
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6 flex-wrap">
            <Link href="/demo">
              <Button
                size="lg"
                className="bg-energy-green hover:bg-energy-green-light text-white px-8 py-3 text-base"
              >
                Try Interactive Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-8 text-sm text-white/60">
            Built for Base Buildathon • XMTP • Coinbase AgentKit
          </div>
        </div>
      </div>
    </section>
  );
};
