'use client'
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Star, Award, TrendingUp, Shield, Users, DollarSign } from "lucide-react";
import { useReputation } from '@/hooks/useReputation';

export default function ReputationDashboard() {
  const { reputationScore, skillVerifications } = useReputation();

  if (!reputationScore) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <div className="text-muted-foreground">Loading reputation data...</div>
        </CardContent>
      </Card>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 4.5) return 'text-energy-green';
    if (score >= 4.0) return 'text-amber-500';
    if (score >= 3.5) return 'text-orange-500';
    return 'text-red-500';
  };

  const getScoreBg = (score: number) => {
    if (score >= 4.5) return 'bg-energy-green/10';
    if (score >= 4.0) return 'bg-amber-500/10';
    if (score >= 3.5) return 'bg-orange-500/10';
    return 'bg-red-500/10';
  };

  return (
    <div className="space-y-6">
      {/* Overall Reputation Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-trust-blue" />
            Reputation Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`text-4xl font-bold ${getScoreColor(reputationScore.overall)}`}>
                {reputationScore.overall.toFixed(1)}
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= reputationScore.overall
                        ? 'text-amber-500 fill-current'
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>
            </div>
            <Badge variant="secondary" className={getScoreBg(reputationScore.overall)}>
              Top 5% Performer
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Reliability</span>
                <span className={`font-medium ${getScoreColor(reputationScore.reliability)}`}>
                  {reputationScore.reliability.toFixed(1)}
                </span>
              </div>
              <Progress value={reputationScore.reliability * 20} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Quality</span>
                <span className={`font-medium ${getScoreColor(reputationScore.quality)}`}>
                  {reputationScore.quality.toFixed(1)}
                </span>
              </div>
              <Progress value={reputationScore.quality * 20} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Communication</span>
                <span className={`font-medium ${getScoreColor(reputationScore.communication)}`}>
                  {reputationScore.communication.toFixed(1)}
                </span>
              </div>
              <Progress value={reputationScore.communication * 20} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Technical</span>
                <span className={`font-medium ${getScoreColor(reputationScore.technical)}`}>
                  {reputationScore.technical.toFixed(1)}
                </span>
              </div>
              <Progress value={reputationScore.technical * 20} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="h-5 w-5 text-trust-blue mr-2" />
              <span className="text-2xl font-bold text-trust-blue">
                {reputationScore.projectsCompleted}
              </span>
            </div>
            <div className="text-sm text-muted-foreground">Projects Completed</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <DollarSign className="h-5 w-5 text-energy-green mr-2" />
              <span className="text-2xl font-bold text-energy-green">
                ${(reputationScore.totalEarned / 1000).toFixed(0)}K
              </span>
            </div>
            <div className="text-sm text-muted-foreground">Total Earned</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Star className="h-5 w-5 text-amber-500 mr-2" />
              <span className="text-2xl font-bold text-amber-500">
                {reputationScore.averageRating.toFixed(1)}
              </span>
            </div>
            <div className="text-sm text-muted-foreground">Avg Rating</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-5 w-5 text-purple-600 mr-2" />
              <span className="text-2xl font-bold text-purple-600">
                {reputationScore.repeatClients}
              </span>
            </div>
            <div className="text-sm text-muted-foreground">Repeat Clients</div>
          </CardContent>
        </Card>
      </div>

      {/* Top Skills */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-trust-blue" />
            Verified Skills
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {skillVerifications.slice(0, 4).map((skill) => (
              <div key={skill.skill} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="font-medium">{skill.skill}</div>
                  <Badge 
                    variant="secondary" 
                    className={
                      skill.level === 'expert' ? 'bg-trust-blue/10 text-trust-blue' :
                      skill.level === 'intermediate' ? 'bg-amber-500/10 text-amber-500' :
                      'bg-muted text-muted-foreground'
                    }
                  >
                    {skill.level}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  {skill.verifiedCount} verifications
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
