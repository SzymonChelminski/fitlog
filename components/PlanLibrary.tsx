import React from 'react';
import { TrainingPlan } from '@/types/trainingPlan';
import { getExerciseById } from '@/services/getExerciseById';
import { PiDotsThreeOutlineVerticalFill } from 'react-icons/pi';
import { Exercise } from '@/types/exercise';

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function PlanLibrary({
  routines,
}: {
  routines: TrainingPlan[];
}) {
  const getRoutineExercises = (exerciseIds: string[]): Exercise[] => {
    const exercises: Exercise[] = [];

    exerciseIds.forEach((id) => {
      exercises.push(getExerciseById(id)!);
    });

    return exercises;
  };

  return (
    <section>
      {routines.map((routine) => {
        return (
          <Card key={routine.id}>
            <CardHeader>
              <CardTitle>{routine.title}</CardTitle>
              <CardDescription>{routine.id}</CardDescription>
              <CardAction>
                <PiDotsThreeOutlineVerticalFill />
              </CardAction>
            </CardHeader>
            <CardContent>
              <span className="flex gap-4">
                <span>
                  Exercises <br />
                  {routine.exerciseIds.length}
                </span>
                <span>
                  Avg. Duration <br />
                  65 mins
                </span>
              </span>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}
