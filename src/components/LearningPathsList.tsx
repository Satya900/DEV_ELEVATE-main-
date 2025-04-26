import React, { useState, useMemo } from 'react';
import { LearningPath, Tag } from '@/types';
import { LearningPathCard } from './LearningPathCard';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Badge } from './ui/badge';
import { X } from 'lucide-react';

interface LearningPathsListProps {
  learningPaths: LearningPath[];
  allTags: Tag[];
}

export function LearningPathsList({ learningPaths, allTags }: LearningPathsListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredLearningPaths = useMemo(() => {
    return learningPaths.filter((path) => {
      // Search filter
      const matchesSearch = path.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        path.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Difficulty filter
      const matchesDifficulty = !difficultyFilter || path.difficulty === difficultyFilter;
      
      // Tags filter
      const matchesTags = 
        selectedTags.length === 0 || 
        selectedTags.every(tagId => 
          path.tags.some(tag => tag.id === tagId)
        );
      
      return matchesSearch && matchesDifficulty && matchesTags;
    });
  }, [learningPaths, searchQuery, difficultyFilter, selectedTags]);

  const handleTagSelect = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter(id => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  const handleRemoveTag = (tagId: string) => {
    setSelectedTags(selectedTags.filter(id => id !== tagId));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <Input
          placeholder="Search learning paths..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="md:flex-1"
        />
        
        <Select
          value={difficultyFilter}
          onValueChange={setDifficultyFilter}
        >
          <SelectTrigger className="md:w-[180px]">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Difficulties</SelectItem>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Tags filter */}
      <div className="flex flex-wrap gap-2">
        {allTags.map(tag => (
          <Badge
            key={tag.id}
            variant={selectedTags.includes(tag.id) ? "default" : "outline"}
            className="cursor-pointer"
            style={selectedTags.includes(tag.id) ? { backgroundColor: tag.color || 'gray' } : {}}
            onClick={() => handleTagSelect(tag.id)}
          >
            {tag.name}
            {selectedTags.includes(tag.id) && (
              <X 
                className="ml-1 h-3 w-3" 
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveTag(tag.id);
                }}
              />
            )}
          </Badge>
        ))}
      </div>
      
      {/* Results count */}
      <div className="text-sm text-gray-500">
        Showing {filteredLearningPaths.length} of {learningPaths.length} learning paths
      </div>
      
      {/* Learning paths grid */}
      {filteredLearningPaths.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredLearningPaths.map((path) => (
            <LearningPathCard key={path.id} learningPath={path} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No learning paths found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your filters or search query</p>
        </div>
      )}
    </div>
  );
} 