
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Address, Avatar, Identity, Name } from '@coinbase/onchainkit/identity';

interface BasenameDisplayProps {
  address?: string;
  className?: string;
}

const BasenameDisplay = ({
  address,
  className = ''
}: BasenameDisplayProps) => {

  return (
    <div className={`flex items-center gap-2 w-full justify-center ${className}`}>
      <Identity address={address as `0x${string}`}>
        <Avatar />
        <Name>
          <Badge />
        </Name>
        <Address />

      </Identity>
    </div>
  );
};

export default BasenameDisplay;
