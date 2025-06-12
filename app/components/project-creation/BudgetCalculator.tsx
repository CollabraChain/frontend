
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calculator, DollarSign, AlertCircle } from 'lucide-react';
import { useProjectCreation } from '@/contexts/ProjectCreationContext';

const BudgetCalculator = () => {
  const { projectData, updateProjectData, errors } = useProjectCreation();

  // Calculate total from milestones
  const milestoneTotalBudget = projectData.milestones.reduce((total, milestone) => total + milestone.budget, 0);

  // Auto-update total budget when milestones change
  useEffect(() => {
    if (milestoneTotalBudget > 0 && milestoneTotalBudget !== projectData.budget.total) {
      updateProjectData({
        budget: {
          ...projectData.budget,
          total: milestoneTotalBudget
        }
      });
    }
  }, [milestoneTotalBudget, projectData.budget, updateProjectData]);

  const handleBudgetUpdate = (field: string, value: string | number) => {
    updateProjectData({
      budget: {
        ...projectData.budget,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Budget & Payment Setup</h2>
        <p className="text-muted-foreground">
          Configure your project budget and payment schedule based on milestones.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Budget Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Total Project Budget</Label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  type="number"
                  value={projectData.budget.total}
                  onChange={(e) => handleBudgetUpdate('total', Number(e.target.value))}
                  placeholder="0"
                  className={errors.budget ? 'border-destructive' : ''}
                />
                <Badge variant="outline">{projectData.budget.currency}</Badge>
              </div>
              {errors.budget && (
                <p className="text-sm text-destructive mt-1">{errors.budget}</p>
              )}
            </div>

            {milestoneTotalBudget > 0 && (
              <div className="p-3 bg-muted rounded-md">
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="h-4 w-4" />
                  <span>Milestone total: {milestoneTotalBudget} {projectData.budget.currency}</span>
                </div>
                {Math.abs(milestoneTotalBudget - projectData.budget.total) > 0.01 && (
                  <div className="flex items-center gap-2 text-sm text-amber-600 mt-1">
                    <AlertCircle className="h-4 w-4" />
                    <span>
                      Difference: {(projectData.budget.total - milestoneTotalBudget).toFixed(2)} {projectData.budget.currency}
                    </span>
                  </div>
                )}
              </div>
            )}

            <div>
              <Label>Currency</Label>
              <select
                value={projectData.budget.currency}
                onChange={(e) => handleBudgetUpdate('currency', e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background"
              >
                <option value="USDC">USDC</option>
                <option value="ETH">ETH</option>
                <option value="DAI">DAI</option>
                <option value="USDT">USDT</option>
              </select>
            </div>

            <div>
              <Label>Payment Method</Label>
              <select
                value={projectData.budget.paymentMethod}
                onChange={(e) => handleBudgetUpdate('paymentMethod', e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background"
              >
                <option value="crypto">Cryptocurrency</option>
                <option value="escrow">Smart Contract Escrow</option>
                <option value="milestone">Milestone-based Release</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Milestone Budget Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {projectData.milestones.length > 0 ? (
              <div className="space-y-3">
                {projectData.milestones.map((milestone, index) => (
                  <div key={milestone.id} className="flex justify-between items-center p-3 border rounded-md">
                    <div>
                      <p className="font-medium">{milestone.title || `Milestone ${index + 1}`}</p>
                      <p className="text-sm text-muted-foreground">{milestone.timeline} days</p>
                    </div>
                    <Badge variant="secondary">
                      {milestone.budget} {projectData.budget.currency}
                    </Badge>
                  </div>
                ))}
                <div className="pt-2 border-t">
                  <div className="flex justify-between items-center font-semibold">
                    <span>Total</span>
                    <span>{milestoneTotalBudget} {projectData.budget.currency}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No milestones created yet.</p>
                <p className="text-sm mt-1">Create milestones in the previous step to see budget distribution.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BudgetCalculator;
