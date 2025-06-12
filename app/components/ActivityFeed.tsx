
import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Bell,
  CheckCircle,
  MessageSquare,
  Shield,
  AlertTriangle,
  ExternalLink,
  X
} from "lucide-react";
import { useNotifications, type Notification } from '@/contexts/NotificationContext';

const ActivityFeed = () => {
  const { notifications, markAsRead, clearNotification, markAllAsRead } = useNotifications();

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'milestone':
        return CheckCircle;
      case 'payment':
        return Shield;
      case 'message':
        return MessageSquare;
      case 'on-chain':
        return Shield;
      case 'system':
        return AlertTriangle;
      default:
        return Bell;
    }
  };

  const getNotificationColor = (type: Notification['type'], priority: Notification['priority']) => {
    if (priority === 'high') return 'text-destructive';
    if (priority === 'medium') return 'text-trust-blue';
    return 'text-muted-foreground';
  };

  const getBadgeVariant = (type: Notification['type']) => {
    switch (type) {
      case 'milestone':
        return 'default';
      case 'payment':
      case 'on-chain':
        return 'secondary';
      case 'message':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.isRead) {
      markAsRead(notification.id);
    }

    // Handle navigation to related chat if available
    if (notification.relatedChatId) {
      console.log('Navigate to chat:', notification.relatedChatId);
    }
  };

  const handleClearNotification = (e: React.MouseEvent, notificationId: string) => {
    e.stopPropagation();
    clearNotification(notificationId);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Activity Feed</h2>
          {notifications.some(n => !n.isRead) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-xs"
            >
              Mark all read
            </Button>
          )}
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No notifications yet</p>
            </div>
          ) : (
            notifications.map((notification) => {
              const Icon = getNotificationIcon(notification.type);
              const iconColor = getNotificationColor(notification.type, notification.priority);

              return (
                <Card
                  key={notification.id}
                  className={`p-3 cursor-pointer hover:bg-accent transition-colors ${!notification.isRead ? 'border-l-4 border-l-trust-blue bg-accent/30' : ''
                    }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 ${iconColor}`}>
                      <Icon className="h-4 w-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className={`text-sm font-medium ${!notification.isRead ? 'text-foreground' : 'text-muted-foreground'
                              }`}>
                              {notification.title}
                            </h4>
                            <Badge variant={getBadgeVariant(notification.type)} className="text-xs">
                              {notification.type}
                            </Badge>
                          </div>

                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {notification.message}
                          </p>

                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-muted-foreground">
                              {notification.timestamp}
                            </span>

                            {notification.actionRequired && (
                              <Badge variant="destructive" className="text-xs">
                                Action Required
                              </Badge>
                            )}
                          </div>

                          {notification.metadata?.transactionHash && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="mt-2 h-6 px-2 text-xs"
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              <ExternalLink className="h-3 w-3 mr-1" />
                              View on Base
                            </Button>
                          )}
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 hover:opacity-100"
                          onClick={(e) => handleClearNotification(e, notification.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ActivityFeed;
