
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { MarketplaceFilters } from './useMarketplace';

interface ProjectFiltersProps {
  filters: MarketplaceFilters;
  onFiltersChange: (filters: Partial<MarketplaceFilters>) => void;
}

const categories = [
  'Web Development',
  'Mobile Development', 
  'Design',
  'Blockchain',
  'AI/ML',
  'Content',
  'Marketing',
  'Consulting'
];

const experienceLevels = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'expert', label: 'Expert' }
];

const ProjectFilters = ({ filters, onFiltersChange }: ProjectFiltersProps) => {
  const [skillInput, setSkillInput] = React.useState('');

  const handleAddSkill = () => {
    if (skillInput.trim() && !filters.skills.includes(skillInput.trim())) {
      onFiltersChange({
        skills: [...filters.skills, skillInput.trim()]
      });
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    onFiltersChange({
      skills: filters.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const clearAllFilters = () => {
    onFiltersChange({
      category: '',
      budgetMin: 0,
      budgetMax: 10000,
      skills: [],
      timeline: '',
      experienceLevel: '',
      clientRating: 0
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Filters</CardTitle>
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Clear All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Category Filter */}
        <div className="space-y-2">
          <Label>Category</Label>
          <Select 
            value={filters.category || 'all'} 
            onValueChange={(value) => onFiltersChange({ category: value === 'all' ? '' : value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Budget Range Filter */}
        <div className="space-y-4">
          <Label>Budget Range</Label>
          <div className="px-2">
            <Slider
              value={[filters.budgetMin, filters.budgetMax]}
              onValueChange={([min, max]) => 
                onFiltersChange({ budgetMin: min, budgetMax: max })
              }
              max={10000}
              min={0}
              step={100}
              className="w-full"
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>${filters.budgetMin}</span>
            <span>-</span>
            <span>${filters.budgetMax}</span>
          </div>
        </div>

        {/* Skills Filter */}
        <div className="space-y-2">
          <Label>Skills</Label>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Add skill..."
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button size="sm" onClick={handleAddSkill}>
              Add
            </Button>
          </div>
          {filters.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {filters.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                  {skill}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => handleRemoveSkill(skill)}
                  />
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Experience Level Filter */}
        <div className="space-y-2">
          <Label>Experience Level</Label>
          <Select 
            value={filters.experienceLevel || 'any'} 
            onValueChange={(value) => onFiltersChange({ experienceLevel: value === 'any' ? '' : value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Any level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any level</SelectItem>
              {experienceLevels.map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Client Rating Filter */}
        <div className="space-y-2">
          <Label>Minimum Client Rating</Label>
          <Select 
            value={filters.clientRating.toString()} 
            onValueChange={(value) => onFiltersChange({ clientRating: Number(value) })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Any rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Any rating</SelectItem>
              <SelectItem value="4">4+ stars</SelectItem>
              <SelectItem value="4.5">4.5+ stars</SelectItem>
              <SelectItem value="4.8">4.8+ stars</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectFilters;
