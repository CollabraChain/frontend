'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Star, Award, DollarSign, Shield, Briefcase, TrendingUp } from "lucide-react";
import { useReputation } from '@/hooks/useReputation';
import ReputationDashboard from './ReputationDashboard';
import CredentialsView from './CredentialsView';
import PortfolioView from './PortfolioView';
import { useAccount } from 'wagmi';

export default function UserProfile() {

  const { isConnected } = useAccount();
  const { reputationScore } = useReputation();
  const [activeTab, setActiveTab] = useState('overview');


  if (!isConnected) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Connect your wallet to view profile</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="reputation" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Reputation
          </TabsTrigger>
          <TabsTrigger value="credentials" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Credentials
          </TabsTrigger>
          <TabsTrigger value="portfolio" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            Portfolio
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          {/* Quick Stats */}
          {reputationScore && (
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-trust-blue">
                    {reputationScore.projectsCompleted}
                  </div>
                  <div className="text-sm text-muted-foreground">Projects Completed</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-energy-green">
                    ${(reputationScore.totalEarned / 1000).toFixed(0)}K
                  </div>
                  <div className="text-sm text-muted-foreground">Total Earned</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-amber-500">
                    {reputationScore.averageRating.toFixed(1)}
                  </div>
                  <div className="text-sm text-muted-foreground">Average Rating</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    8
                  </div>
                  <div className="text-sm text-muted-foreground">Credentials</div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-trust-blue/10 rounded-full flex items-center justify-center">
                    <Award className="h-4 w-4 text-trust-blue" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">React Expert Credential</div>
                    <div className="text-xs text-muted-foreground">Earned 5 days ago</div>
                  </div>
                </div>
                <Badge variant="secondary">New</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-energy-green/10 rounded-full flex items-center justify-center">
                    <DollarSign className="h-4 w-4 text-energy-green" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Project Milestone Completed</div>
                    <div className="text-xs text-muted-foreground">Payment released: $2,500</div>
                  </div>
                </div>
                <Badge variant="secondary">Verified</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-amber-500/10 rounded-full flex items-center justify-center">
                    <Star className="h-4 w-4 text-amber-500" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">5-Star Client Review</div>
                    <div className="text-xs text-muted-foreground">&quot;Outstanding communication!&quot;</div>
                  </div>
                </div>
                <Badge variant="secondary">Verified</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reputation" className="mt-6">
          <ReputationDashboard />
        </TabsContent>

        <TabsContent value="credentials" className="mt-6">
          <CredentialsView />
        </TabsContent>

        <TabsContent value="portfolio" className="mt-6">
          <PortfolioView />
        </TabsContent>
      </Tabs>
    </div>
  );
};
