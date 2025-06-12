
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ExternalLink } from "lucide-react";

interface ContractDetailsProps {
  projectData: any;
}

const ContractDetails = ({ projectData }: ContractDetailsProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Smart Contract Details</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
              <span className="text-sm font-medium">Contract Address</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-mono">{projectData.contractAddress}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Budget:</span>
                <span className="font-medium">{projectData.budget}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Escrowed Amount:</span>
                <span className="font-medium text-energy-green">{projectData.budget}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Payments Made:</span>
                <span className="font-medium">{projectData.spent}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Remaining:</span>
                <span className="font-medium">700 USDC</span>
              </div>
            </div>
            
            <Separator />
            
            <div className="text-sm">
              <span className="text-muted-foreground mb-2 block">Contract Terms:</span>
              <ul className="space-y-1 text-sm">
                <li>• Payments released upon milestone approval</li>
                <li>• 7-day dispute resolution period</li>
                <li>• Automatic completion after final milestone</li>
                <li>• Emergency pause function available</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContractDetails;
