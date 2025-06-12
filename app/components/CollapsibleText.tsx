
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Check, X } from "lucide-react";

interface CollapsibleTextProps {
  text: string;
  maxLines?: number;
  title?: string;
  isEditable?: boolean;
  onSave?: (newText: string) => void;
}

const CollapsibleText = ({ 
  text, 
  maxLines = 4, 
  title, 
  isEditable = false,
  onSave 
}: CollapsibleTextProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  // Simple line count estimation (rough)
  const lineCount = text.split('\n').length + Math.floor(text.length / 60);
  const shouldTruncate = lineCount > maxLines;
  const displayText = isExpanded || !shouldTruncate ? text : text.slice(0, 200) + '...';

  const handleSave = () => {
    if (onSave) {
      onSave(editText);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(text);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="space-y-3">
        {title && (
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-sm">{title}</h3>
          </div>
        )}
        <Textarea
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="min-h-[100px] resize-none"
          placeholder="Enter project description..."
        />
        <div className="flex gap-2">
          <Button size="sm" onClick={handleSave} className="bg-energy-green hover:bg-energy-green-light">
            <Check className="h-3 w-3 mr-1" />
            Save
          </Button>
          <Button size="sm" variant="outline" onClick={handleCancel}>
            <X className="h-3 w-3 mr-1" />
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {title && (
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-sm">{title}</h3>
          {isEditable && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6"
              onClick={() => setIsEditing(true)}
            >
              <Edit className="h-3 w-3" />
            </Button>
          )}
        </div>
      )}
      <div className="text-sm text-muted-foreground">
        <p className="leading-relaxed">{displayText}</p>
        {shouldTruncate && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-trust-blue hover:underline mt-1 text-xs font-medium"
          >
            {isExpanded ? 'Read Less' : 'Read More'}
          </button>
        )}
      </div>
    </div>
  );
};

export default CollapsibleText;
