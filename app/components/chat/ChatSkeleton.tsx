
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

const ChatSkeleton = () => {
  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header Skeleton */}
      <div className="p-4 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <Skeleton className="h-4 w-4 lg:hidden" />
          <div className="flex-1">
            <Skeleton className="h-5 w-32 mb-2" />
            <div className="flex items-center gap-2">
              <Skeleton className="w-2 h-2 rounded-full" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
          <Skeleton className="h-4 w-4" />
        </div>
      </div>
      
      {/* Messages Skeleton */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4">
        {/* AI Message Skeleton */}
        <div className="flex gap-3 mb-4 mx-4">
          <Skeleton className="w-7 h-7 rounded-full flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-12" />
            </div>
            <div className="bg-neutral-50 rounded-lg rounded-tl-none p-3 max-w-sm">
              <Skeleton className="h-3 w-full mb-2" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          </div>
        </div>

        {/* User Message Skeleton */}
        <div className="flex gap-3 mb-4 mx-4 flex-row-reverse">
          <Skeleton className="w-7 h-7 rounded-full flex-shrink-0" />
          <div className="flex-1 min-w-0 text-right">
            <div className="flex items-center gap-2 mb-2 flex-row-reverse">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-12" />
            </div>
            <div className="bg-trust-blue/10 rounded-lg rounded-tr-none p-3 max-w-sm inline-block">
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        </div>

        {/* Another AI Message Skeleton */}
        <div className="flex gap-3 mb-4 mx-4">
          <Skeleton className="w-7 h-7 rounded-full flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-12" />
            </div>
            <div className="bg-neutral-50 rounded-lg rounded-tl-none p-3 max-w-sm">
              <Skeleton className="h-3 w-full mb-2" />
              <Skeleton className="h-3 w-2/3 mb-2" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        </div>

        {/* Interactive Message Skeleton */}
        <div className="flex gap-3 mb-4 mx-4">
          <Skeleton className="w-7 h-7 rounded-full flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-12" />
            </div>
            <div className="bg-neutral-50 rounded-lg rounded-tl-none p-3 max-w-sm">
              <Skeleton className="h-3 w-full mb-3" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-16" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Input Skeleton */}
      <div className="p-4 border-t border-border bg-card">
        <div className="flex gap-2 items-end">
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-9 w-9" />
          <Skeleton className="flex-1 h-9" />
          <Skeleton className="h-9 w-16" />
        </div>
      </div>
    </div>
  );
};

export default ChatSkeleton;
