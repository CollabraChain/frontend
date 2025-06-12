
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TeamInvitationProps {
  team: any[];
  onUpdate: (team: any[]) => void;
}

const TeamInvitation = ({ team, onUpdate }: TeamInvitationProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Team & Collaboration</h2>
        <p className="text-muted-foreground">
          Invite team members and set up collaboration permissions.
        </p>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground text-center">
            Team invitation coming in next iteration...
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamInvitation;
