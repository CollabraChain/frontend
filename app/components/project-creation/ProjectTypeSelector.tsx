
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Smartphone, Palette, Code, PenTool, Megaphone } from 'lucide-react';

interface ProjectTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: React.ComponentType<any>;
  estimatedBudget: string;
  estimatedTime: string;
  features: string[];
}

interface ProjectTypeSelectorProps {
  selectedType: string;
  onTypeSelect: (type: string, template: string) => void;
}

const templates: ProjectTemplate[] = [
  {
    id: 'website-basic',
    name: 'Basic Website',
    category: 'Website',
    description: 'Simple landing page or portfolio website',
    icon: Globe,
    estimatedBudget: '500-2000 USDC',
    estimatedTime: '2-4 weeks',
    features: ['Responsive design', 'SEO optimization', 'Contact forms']
  },
  {
    id: 'website-ecommerce',
    name: 'E-commerce Site',
    category: 'Website',
    description: 'Full online store with payment integration',
    icon: Globe,
    estimatedBudget: '2000-8000 USDC',
    estimatedTime: '4-8 weeks',
    features: ['Product catalog', 'Payment processing', 'Admin dashboard']
  },
  {
    id: 'mobile-app',
    name: 'Mobile App',
    category: 'Mobile',
    description: 'Native or cross-platform mobile application',
    icon: Smartphone,
    estimatedBudget: '3000-12000 USDC',
    estimatedTime: '6-12 weeks',
    features: ['iOS & Android', 'Push notifications', 'Offline support']
  },
  {
    id: 'smart-contract',
    name: 'Smart Contract',
    category: 'Blockchain',
    description: 'Custom smart contract development',
    icon: Code,
    estimatedBudget: '1000-5000 USDC',
    estimatedTime: '2-6 weeks',
    features: ['Security audit', 'Gas optimization', 'Testing suite']
  },
  {
    id: 'design-system',
    name: 'Design System',
    category: 'Design',
    description: 'Complete brand identity and design system',
    icon: Palette,
    estimatedBudget: '1500-4000 USDC',
    estimatedTime: '3-6 weeks',
    features: ['Brand guidelines', 'Component library', 'Asset creation']
  },
  {
    id: 'marketing-campaign',
    name: 'Marketing Campaign',
    category: 'Marketing',
    description: 'Comprehensive digital marketing strategy',
    icon: Megaphone,
    estimatedBudget: '800-3000 USDC',
    estimatedTime: '2-4 weeks',
    features: ['Content creation', 'Social media', 'Analytics setup']
  }
];

const ProjectTypeSelector = ({ selectedType, onTypeSelect }: ProjectTypeSelectorProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Choose Your Project Type</h2>
        <p className="text-muted-foreground">
          Select a template to get started with pre-configured milestones and budget estimates.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template) => {
          const Icon = template.icon;
          const isSelected = selectedType === template.id;
          
          return (
            <Card
              key={template.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                isSelected ? 'ring-2 ring-trust-blue border-trust-blue' : ''
              }`}
              onClick={() => onTypeSelect(template.id, template.name)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-trust-blue text-white' : 'bg-muted text-muted-foreground'
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <Badge variant="outline" className="mt-1">
                        {template.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  {template.description}
                </p>
                
                <div className="flex justify-between text-sm">
                  <div>
                    <span className="text-muted-foreground">Budget:</span>
                    <span className="ml-1 font-medium">{template.estimatedBudget}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Timeline:</span>
                    <span className="ml-1 font-medium">{template.estimatedTime}</span>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Includes:</div>
                  <div className="flex flex-wrap gap-1">
                    {template.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="border-dashed">
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center">
            <PenTool className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <h3 className="font-medium mb-1">Custom Project</h3>
            <p className="text-sm text-muted-foreground">
              Start from scratch with a completely custom setup
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectTypeSelector;
