import React from 'react';
import { Button } from "@/components/ui/button";
import { Wallet } from '@coinbase/onchainkit/wallet';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAccount } from 'wagmi';

interface WalletConnectionStepProps {
  onConnect: () => void;
  onSkip: () => void;
}

const WalletConnectionStep = ({ onSkip }: WalletConnectionStepProps) => {
  const {
    address,
  } = useAccount()
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <Card className="shadow-lg">
        <CardHeader className="text-center space-y-3 pb-2">
          <h1 className="text-2xl font-bold">Connect Your Wallet</h1>
          <p className="text-muted-foreground">
            Connect your Coinbase Wallet to start using CollabraChain
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center w-full">
            <Wallet />
          </div>

          {address ? (
            <Button
              onClick={onSkip}
              variant="ghost"
              className="w-full"
            >
              Continue
            </Button>
          ) : (
            null
          )}



        </CardContent>
      </Card>
    </div>
  );
};

export default WalletConnectionStep;
