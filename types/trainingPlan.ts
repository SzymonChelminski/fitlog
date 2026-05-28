export interface TrainingPlan {
  id: string;
  title: string;
  description: string | null;
  exerciseIds: string[];
  userId: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}
