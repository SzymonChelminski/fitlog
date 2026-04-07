export interface Exercise {
  id: string;
  name: string;
  bodyPart: string;
  equipment: string;
  target: string;
  secondaryMuscles: string[];
  instructions: string[];
  description: string;
  difficulty: Difficulty;
  category: string;
}

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
