'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { HiPlay, HiStop } from 'react-icons/hi';

import { saveWorkout } from '@/app/actions';
import type { Exercise } from '@/types/exercise';
import {
  ExerciseCard,
  type ExerciseState,
  type PreviousSet,
  type SetData,
} from '@/components/workout/ExerciseCard';
import { FinishWorkoutDialog } from '@/components/workout/FinishWorkoutDialog';

export type { ExerciseState, PreviousSet, SetData };

interface Workout {
  id: string;
  title: string;
  exerciseIds: string[];
}

interface WorkoutClientProps {
  workout: Workout;
  exercises: Exercise[];
  previousData: Record<string, PreviousSet[]>;
}

function formatTime(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60)
    .toString()
    .padStart(2, '0');
  const secs = (totalSeconds % 60).toString().padStart(2, '0');
  if (hours > 0)
    return `${Math.min(hours, 99).toString().padStart(2, '0')}:${mins}:${secs}`;
  return `${mins}:${secs}`;
}

export default function WorkoutClient({
  workout,
  exercises,
  previousData,
}: WorkoutClientProps) {
  const router = useRouter();

  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [startTime, setStartTime] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [animatePopup, setAnimatePopup] = useState(false);
  const [breakTimers, setBreakTimers] = useState<Record<number, number>>({});

  const [exerciseData, setExerciseData] = useState<ExerciseState[]>(
    exercises.map((ex) => {
      const history = previousData[ex.id];
      const initialSets: SetData[] =
        history?.length > 0
          ? history.map(() => ({ reps: '', weight: '', restTimeSeconds: 0 }))
          : [
              { reps: '', weight: '', restTimeSeconds: 0 },
              { reps: '', weight: '', restTimeSeconds: 0 },
              { reps: '', weight: '', restTimeSeconds: 0 },
            ];
      return { exerciseId: ex.id, name: ex.name, sets: initialSets };
    }),
  );

  useEffect(() => {
    if (!isActive || showPopup) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [isActive, showPopup]);

  useEffect(() => {
    const hasActive = Object.values(breakTimers).some((t) => t > 0);
    if (!hasActive) return;
    const id = setInterval(() => {
      setBreakTimers((prev) => {
        const next = { ...prev };
        let changed = false;
        for (const key in next) {
          if (next[key] > 0) {
            next[key] -= 1;
            changed = true;
          }
        }
        return changed ? next : prev;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [breakTimers]);

  const handleToggle = () => {
    if (isActive) {
      setShowPopup(true);
      setTimeout(() => setAnimatePopup(true), 10);
    } else {
      setIsActive(true);
      setSeconds(0);
      setStartTime(new Date().toISOString());
    }
  };

  const handleDiscard = () => {
    setAnimatePopup(false);
    setTimeout(() => {
      setShowPopup(false);
      setIsActive(false);
      setSeconds(0);
      router.push('/workouts');
    }, 300);
  };

  const handleSave = async () => {
    if (!workout || seconds < 1) return;

    const cleanedExercises = exerciseData
      .map((ex) => ({
        exerciseId: ex.exerciseId,
        name: ex.name,
        sets: ex.sets
          .filter((s) => s.reps !== '' && s.weight !== '')
          .map((s) => ({
            reps: Number(s.reps),
            weight: Number(s.weight),
            restTimeSeconds: s.restTimeSeconds ?? 0,
          })),
      }))
      .filter((ex) => ex.sets.length > 0);

    const totalVolume = cleanedExercises.reduce(
      (acc, ex) =>
        acc + ex.sets.reduce((s, set) => s + set.reps * set.weight, 0),
      0,
    );

    try {
      await saveWorkout({
        workoutName: workout.title,
        durationMinutes: Math.floor(seconds / 60),
        startTime: startTime ?? new Date().toISOString(),
        totalSessionVolume: totalVolume,
        exercises: cleanedExercises,
      });
      setAnimatePopup(false);
      setTimeout(() => {
        setShowPopup(false);
        router.push('/workouts');
      }, 300);
    } catch (err) {
      console.error('Failed to save workout:', err);
    }
  };

  const addSet = (exerciseIndex: number) => {
    setExerciseData((prev) => {
      const next = [...prev];
      next[exerciseIndex] = {
        ...next[exerciseIndex],
        sets: [
          ...next[exerciseIndex].sets,
          { reps: '', weight: '', restTimeSeconds: 0 },
        ],
      };
      return next;
    });
  };

  const deleteSet = (exerciseIndex: number) => {
    setExerciseData((prev) => {
      const next = [...prev];
      if (next[exerciseIndex].sets.length <= 1) return next;
      next[exerciseIndex] = {
        ...next[exerciseIndex],
        sets: next[exerciseIndex].sets.slice(0, -1),
      };
      return next;
    });
  };

  const toggleBreak = (exerciseIndex: number) => {
    setBreakTimers((prev) => {
      if ((prev[exerciseIndex] ?? 0) > 0)
        return { ...prev, [exerciseIndex]: 0 };
      return { ...prev, [exerciseIndex]: 90 };
    });
    setExerciseData((prev) => {
      const next = [...prev];
      const sets = [...next[exerciseIndex].sets];
      if (sets.length > 0 && !((breakTimers[exerciseIndex] ?? 0) > 0)) {
        sets[sets.length - 1] = {
          ...sets[sets.length - 1],
          restTimeSeconds: 90,
        };
      }
      next[exerciseIndex] = { ...next[exerciseIndex], sets };
      return next;
    });
  };

  const updateSet = (
    exerciseIndex: number,
    setIndex: number,
    field: 'reps' | 'weight',
    value: string,
  ) => {
    setExerciseData((prev) => {
      const next = [...prev];
      const sets = [...next[exerciseIndex].sets];
      let parsed: number | '' = value === '' ? '' : Number(value);
      if (field === 'reps' && parsed !== '') {
        parsed = Math.min(50, Math.max(1, parsed));
      }
      if (field === 'weight' && parsed !== '') {
        parsed = Math.min(500, Math.max(1, parsed));
      }
      sets[setIndex] = { ...sets[setIndex], [field]: parsed };
      next[exerciseIndex] = { ...next[exerciseIndex], sets };
      return next;
    });
  };

  return (
    <>
      <header className="flex flex-col items-start gap-5 py-3">
        <div className="flex flex-col gap-2">
          <p className="text-custom-secondary font-bold uppercase text-sm tracking-wide">
            Current Session
          </p>
          <h1 className="text-custom-text-main text-3xl font-medium">
            {workout?.title}
          </h1>
        </div>

        <button
          onClick={handleToggle}
          className={`group flex h-14 w-40 items-center justify-center gap-3 rounded-lg transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-custom-secondary active:scale-95 ${
            isActive
              ? 'border border-custom-border bg-custom-background-dark text-custom-text-main hover:border-red-500 hover:text-red-400'
              : 'bg-custom-primary text-white shadow-lg hover:brightness-110'
          }`}
        >
          {isActive ? (
            <HiStop className="size-6 shrink-0 transition-transform duration-300 group-hover:scale-110" />
          ) : (
            <HiPlay className="size-6 shrink-0 transition-transform duration-300 group-hover:scale-110" />
          )}
          <div className="flex h-10 w-16 flex-col items-start justify-center text-left">
            <span className="text-sm font-semibold leading-none tracking-wide">
              {isActive ? 'FINISH' : 'START'}
            </span>
            <span
              className={`text-xs font-medium tabular-nums text-gray-400 transition-all duration-300 ${
                isActive
                  ? 'mt-1 max-h-4 opacity-100'
                  : 'mt-0 max-h-0 opacity-0'
              }`}
            >
              {formatTime(seconds)}
            </span>
          </div>
        </button>
      </header>

      <section className="flex flex-col gap-10">
        {exerciseData.map((exData, exerciseIndex) => (
          <ExerciseCard
            key={exData.exerciseId}
            exData={exData}
            exerciseIndex={exerciseIndex}
            exercises={exercises}
            previousData={previousData}
            breakTimers={breakTimers}
            onAddSet={addSet}
            onDeleteSet={deleteSet}
            onToggleBreak={toggleBreak}
            onUpdateSet={updateSet}
          />
        ))}
      </section>

      <FinishWorkoutDialog
        show={showPopup}
        animate={animatePopup}
        seconds={seconds}
        onDiscard={handleDiscard}
        onSave={handleSave}
      />
    </>
  );
}
