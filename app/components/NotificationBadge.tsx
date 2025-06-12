
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { useNotifications } from '@/contexts/NotificationContext';

interface NotificationBadgeProps {
  className?: string;
  showZero?: boolean;
}

const NotificationBadge = ({ className = "", showZero = false }: NotificationBadgeProps) => {
  const { unreadCount } = useNotifications();

  if (unreadCount === 0 && !showZero) {
    return null;
  }

  return (
    <Badge 
      variant="destructive" 
      className={`h-5 min-w-5 text-xs flex items-center justify-center ${className}`}
    >
      {unreadCount > 99 ? '99+' : unreadCount}
    </Badge>
  );
};

export default NotificationBadge;
