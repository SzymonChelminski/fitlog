import React from 'react';
import { TrainingPlan } from '@/types/trainingPlan';
import { getExerciseById } from '@/services/getExerciseById';
import { PiDotsThreeOutlineVerticalFill } from 'react-icons/pi';
import { FaPlay } from 'react-icons/fa';
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

  const { exerciseIds } = routines[1];
  console.log(getRoutineExercises(exerciseIds));

  const getDominatingCategory = (exercises: Exercise[]) => {
    const catMap = new Map();
    exercises.forEach((ex) => {
      catMap.set(
        ex.category,
        catMap.has(ex.category) ? catMap.get(ex.category) + 1 : 1,
      );
    });

    if (catMap.size === 0) return null;
    return [...catMap.entries()].reduce((a, b) => (b[1] > a[1] ? b : a))[0];
  };

  console.log();

  return (
    <section>
      {routines.map((routine) => {
        return (
          <Card key={routine.id}>
            <CardHeader>
              <CardTitle>{routine.title}</CardTitle>
              <CardDescription>
                {getDominatingCategory(getRoutineExercises(exerciseIds))}
              </CardDescription>
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
                <span className="bg-custom-text-muted/10 ml-auto flex items-center rounded-full p-4">
                  <FaPlay className="text-custom-text-muted size-5" />
                </span>
              </span>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}
