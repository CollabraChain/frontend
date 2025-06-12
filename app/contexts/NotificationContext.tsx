'use client';
import React, { createContext, useContext, useState, useCallback } from 'react';

export interface Notification {
  id: string;
  type: 'milestone' | 'payment' | 'message' | 'on-chain' | 'system';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
  actionRequired?: boolean;
  relatedChatId?: string;
  metadata?: Record<string, string>;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  clearNotification: (notificationId: string) => void;
  getNotificationsByType: (type: Notification['type']) => Notification[];
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'milestone',
      title: 'Milestone Ready for Review',
      message: 'Initial Wireframes completed by anya.base',
      timestamp: '2 hours ago',
      isRead: false,
      priority: 'high',
      actionRequired: true,
      relatedChatId: 'project-1'
    },
    {
      id: '2',
      type: 'on-chain',
      title: 'Payment Processed',
      message: 'Escrow funded with 1,000 USDC',
      timestamp: '2 days ago',
      isRead: true,
      priority: 'medium',
      metadata: { amount: '1,000 USDC', transactionHash: '0x123...abc' }
    },
    {
      id: '3',
      type: 'message',
      title: 'New Message',
      message: 'ben.base: Great progress on the wireframes!',
      timestamp: '1 hour ago',
      isRead: false,
      priority: 'low',
      relatedChatId: 'project-1'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const addNotification = useCallback((notificationData: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => {
    const newNotification: Notification = {
      ...notificationData,
      id: Date.now().toString(),
      timestamp: 'now',
      isRead: false
    };

    setNotifications(prev => [newNotification, ...prev]);
    console.log('New notification added:', newNotification);
  }, []);

  const markAsRead = useCallback((notificationId: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n)
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  }, []);

  const clearNotification = useCallback((notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  }, []);

  const getNotificationsByType = useCallback((type: Notification['type']) => {
    return notifications.filter(n => n.type === type);
  }, [notifications]);

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      addNotification,
      markAsRead,
      markAllAsRead,
      clearNotification,
      getNotificationsByType
    }}>
      {children}
    </NotificationContext.Provider>
  );
};
