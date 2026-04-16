import React from 'react';
import { TrainingPlan } from '@/types/trainingPlan';
import { getExerciseById } from '@/services/getExerciseById';
import { PiDotsThreeOutlineVerticalFill } from 'react-icons/pi';
import { GoDotFill } from 'react-icons/go';
import { IoPlay } from 'react-icons/io5';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { Exercise } from '@/types/exercise';

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from './ui/button';
import Link from 'next/link';

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

  const getDotColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'strength':
        return 'text-blue-600';
      case 'stretching':
        return 'text-teal-600';
      case 'cardio':
        return 'text-red-600';
      case 'plyometrics':
        return 'text-purple-600';
      case 'powerlifting':
        return 'text-orange-600';
      case 'strongman':
        return 'text-stone-700';
      case 'olympic_weightlifting':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <section className="flex flex-col gap-4">
      {routines.map((routine) => {
        return (
          <Card key={routine.id} className="bg-custom-card-bg rounded-md">
            <CardHeader>
              <CardTitle className="text-custom-text-main text-2xl">
                {routine.title}
              </CardTitle>
              <CardDescription className="text-custom-text-muted flex items-center gap-1 font-medium uppercase">
                <GoDotFill
                  className={getDotColor(
                    getDominatingCategory(
                      getRoutineExercises(routine.exerciseIds),
                    ),
                  )}
                />

                {getDominatingCategory(
                  getRoutineExercises(routine.exerciseIds),
                )}
              </CardDescription>
              <CardAction>
                <PiDotsThreeOutlineVerticalFill className="text-custom-text-main/50 size-5" />
              </CardAction>
            </CardHeader>
            <CardContent>
              <span className="flex gap-4">
                <span className="text-custom-text-muted text-md font-medium">
                  Exercises <br />
                  <span className="text-custom-text-main font-normal">
                    {routine.exerciseIds.length}
                  </span>
                </span>
                <span className="text-custom-text-muted text-md font-medium">
                  Avg. Duration <br />
                  <span className="text-custom-text-main font-normal">
                    65
                  </span>{' '}
                  min
                </span>
                <Button className="bg-custom-text-muted/10 ml-auto flex items-center rounded-full p-4">
                  <IoPlay className="text-custom-text-muted size-6" />
                </Button>
              </span>
            </CardContent>
          </Card>
        );
      })}
      <Link
        href={'/workouts/add-workout'}
        className="border-custom-text-muted/20 flex h-40 flex-col items-center justify-center gap-3 rounded-xl border-3 border-dashed bg-transparent"
      >
        <span className="bg-custom-text-muted/10 rounded-full p-4">
          <BsFillPlusCircleFill className="text-custom-primary size-8" />
        </span>
        <span className="text-custom-text-muted/75 text-center font-medium">
          Create Custom Routine
        </span>
      </Link>
    </section>
  );
}
