
import React from 'react';

interface StatusDotProps {
  status: 'active' | 'pending-approval' | 'completed' | 'in-dispute' | 'offline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const StatusDot = ({ status, size = 'sm', className = '' }: StatusDotProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-energy-green';
      case 'pending-approval':
        return 'bg-amber-500';
      case 'completed':
        return 'bg-trust-blue';
      case 'in-dispute':
        return 'bg-red-500';
      case 'offline':
        return 'bg-neutral-400';
      default:
        return 'bg-neutral-400';
    }
  };

  const getSize = (size: string) => {
    switch (size) {
      case 'sm':
        return 'w-2 h-2';
      case 'md':
        return 'w-3 h-3';
      case 'lg':
        return 'w-4 h-4';
      default:
        return 'w-2 h-2';
    }
  };

  return (
    <div
      className={`${getSize(size)} ${getStatusColor(status)} rounded-full ${className}`}
      title={status.replace('-', ' ')}
    />
  );
};

export default StatusDot;
