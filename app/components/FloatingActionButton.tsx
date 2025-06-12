
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, MessageSquare, Users, Briefcase } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const FloatingActionButton = () => {
  const [open, setOpen] = useState(false);

  const actions = [
    {
      title: "Start New Project",
      description: "Create a project with smart contracts and milestones",
      icon: Briefcase,
      color: "bg-trust-blue",
      action: () => {
        console.log('Start new project');
        setOpen(false);
      }
    },
    {
      title: "Direct Message",
      description: "Send a private message to another user",
      icon: MessageSquare,
      color: "bg-energy-green",
      action: () => {
        console.log('Start direct message');
        setOpen(false);
      }
    },
    {
      title: "Join Project",
      description: "Join an existing project with an invite code",
      icon: Users,
      color: "bg-amber-500",
      action: () => {
        console.log('Join project');
        setOpen(false);
      }
    }
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg bg-trust-blue hover:bg-trust-blue/90 z-50"
        >
          <Plus className="w-6 h-6 text-white" />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Start Something New</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Card 
                key={index}
                className="cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={action.action}
              >
                <CardContent className="p-4 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{action.title}</h3>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FloatingActionButton;
