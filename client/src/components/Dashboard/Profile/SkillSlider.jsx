import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { X } from 'lucide-react';

const SkillSlider = ({ skill, onSkillChange }) => {
  return (
    <div className="p-4 border border-gray-200 rounded-2xl bg-gray-50">
      <div className="flex items-center justify-between mb-4">
        <Input
          value={skill.name || ''}
          onChange={(e) => onSkillChange('name', e.target.value)}
          placeholder="Skill name (e.g., Teaching, Communication)"
          className="flex-1 mr-3 bg-white"
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onSkillChange('remove')}
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">{skill.name || 'Skill'}</span>
          <span className="text-sm font-bold text-[#6C5CE7]">{skill.level || 50}%</span>
        </div>
        
        <div className="relative">
          <Slider
            value={[skill.level || 50]}
            onValueChange={(value) => onSkillChange('level', value[0])}
            max={100}
            step={1}
            className="w-full"
          />
        </div>
        
        <div className="flex justify-between text-xs text-gray-500">
          <span>Beginner</span>
          <span>Expert</span>
        </div>
      </div>
    </div>
  );
};

export default SkillSlider;