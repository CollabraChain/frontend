import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownBasename,
  WalletDropdownFundLink,
  WalletDropdownLink,
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet';
import {
  Address,
  Avatar,
  Name,
  Identity,
  EthBalance,
} from '@coinbase/onchainkit/identity';

const WalletConnection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-amber-500" />
          Connect Your Wallet
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Connect your Coinbase Wallet to start collaborating on CollabraChain.
        </p>
        
        <Wallet>
          <ConnectWallet className="w-full">
            <div className="flex items-center justify-center gap-2 w-full bg-trust-blue hover:bg-trust-blue/90 text-white p-2 rounded-md">
              <Avatar className="h-6 w-6" />
              <div>Connect Coinbase Wallet</div>
            </div>
          </ConnectWallet>
          <WalletDropdown>
            <Identity
              className="px-4 pt-3 pb-2"
              hasCopyAddressOnClick
            >
              <Avatar />
              <Name />
              <Address />
              <EthBalance />
            </Identity>
            <WalletDropdownBasename />
            <WalletDropdownLink
              icon="wallet"
              href="https://keys.coinbase.com"
            >
              Wallet
            </WalletDropdownLink>
            <WalletDropdownFundLink />
            <WalletDropdownDisconnect />
          </WalletDropdown>
        </Wallet>
      </CardContent>
    </Card>
  );
};

export default WalletConnection;
