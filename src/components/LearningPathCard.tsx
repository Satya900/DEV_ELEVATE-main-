import React from 'react';
import Link from 'next/link';
import { LearningPath } from '@/types';
import { Badge } from './ui/badge';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from './ui/card';
import { Clock, BookOpen } from 'lucide-react';

interface LearningPathCardProps {
  learningPath: LearningPath;
}

export function LearningPathCard({ learningPath }: LearningPathCardProps) {
  const { title, description, tags, difficulty, estimatedHours, milestones, slug } = learningPath;
  
  const totalArticles = milestones.reduce((acc, milestone) => acc + milestone.articles.length, 0);
  
  const difficultyColor = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800',
  }[difficulty];
  
  return (
    <Link href={`/learning-paths/${slug}`}>
      <Card className="h-full transition-all hover:shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">{title}</CardTitle>
            <Badge className={difficultyColor}>
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </Badge>
          </div>
          <CardDescription className="line-clamp-2 mt-2">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag.id} style={{ backgroundColor: tag.color || 'gray' }}>
                {tag.name}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline">+{tags.length - 3} more</Badge>
            )}
          </div>
        </CardContent>
        <CardFooter className="text-sm text-gray-500 flex justify-between">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{estimatedHours} hours</span>
          </div>
          <div className="flex items-center">
            <BookOpen className="h-4 w-4 mr-1" />
            <span>{totalArticles} articles</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
} 