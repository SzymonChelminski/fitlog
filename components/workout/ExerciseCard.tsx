'use client';

import { LuTimer } from 'react-icons/lu';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import ExerciseInfoButton from '@/components/ExerciseInfoButton';
import { Button } from '@/components/ui/button';
import type { Exercise } from '@/types/exercise';

export interface PreviousSet {
  weight: number;
  reps: number;
}

export interface SetData {
  reps: number | '';
  weight: number | '';
  restTimeSeconds?: number;
}

export interface ExerciseState {
  exerciseId: string;
  name: string;
  sets: SetData[];
}

interface Props {
  exData: ExerciseState;
  exerciseIndex: number;
  exercises: Exercise[];
  previousData: Record<string, PreviousSet[]>;
  breakTimers: Record<number, number>;
  onAddSet: (index: number) => void;
  onDeleteSet: (index: number) => void;
  onToggleBreak: (index: number) => void;
  onUpdateSet: (
    exIdx: number,
    setIdx: number,
    field: 'reps' | 'weight',
    value: string,
  ) => void;
}

export function ExerciseCard({
  exData,
  exerciseIndex,
  exercises,
  previousData,
  breakTimers,
  onAddSet,
  onDeleteSet,
  onToggleBreak,
  onUpdateSet,
}: Props) {
  const originalEx = exercises.find((e) => e.id === exData.exerciseId);
  const history = previousData[exData.exerciseId];
  const breakActive = (breakTimers[exerciseIndex] ?? 0) > 0;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-custom-text-muted text-sm font-light uppercase">
            Exercise {exerciseIndex + 1}
          </h3>
          <h2 className="mt-1 text-lg font-bold uppercase text-custom-text-main">
            {exData.name}
          </h2>
        </div>
        {originalEx && <ExerciseInfoButton exercise={originalEx} />}
      </div>

      <div className="mt-4">
        <table className="w-full border-separate border-spacing-y-2 text-custom-text-main">
          <thead>
            <tr>
              <th className="py-2 px-2 text-center font-normal">SET</th>
              <th className="py-2 px-2 text-center font-normal">PREVIOUS</th>
              <th className="py-2 px-2 text-center font-normal">KGS</th>
              <th className="py-2 px-2 text-center font-normal">REPS</th>
            </tr>
          </thead>
          <tbody>
            {exData.sets.map((set, setIndex) => {
              const prevSet = history?.[setIndex];
              return (
                <tr key={setIndex} className="bg-custom-card-bg text-center">
                  <td className="rounded-l-sm py-4">{setIndex + 1}</td>
                  <td className="text-custom-text-muted py-4 text-sm italic">
                    {prevSet ? `${prevSet.weight} x ${prevSet.reps}` : '-'}
                  </td>
                  <td className="py-4">
                    <input
                      type="number"
                      placeholder="0"
                      min={1}
                      max={500}
                      value={set.weight}
                      onChange={(e) =>
                        onUpdateSet(exerciseIndex, setIndex, 'weight', e.target.value)
                      }
                      className="w-full bg-transparent text-center focus:outline-none"
                    />
                  </td>
                  <td className="rounded-r-sm py-4">
                    <input
                      type="number"
                      placeholder="0"
                      min={1}
                      max={50}
                      value={set.reps}
                      onChange={(e) =>
                        onUpdateSet(exerciseIndex, setIndex, 'reps', e.target.value)
                      }
                      className="w-full bg-transparent text-center focus:outline-none"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="mt-6 flex items-center justify-center gap-4">
          <Button
            variant="ghost"
            onClick={() => onToggleBreak(exerciseIndex)}
            className={`flex h-12 w-44 items-center justify-center rounded-lg border px-6 transition-colors duration-300 ${
              breakActive
                ? 'border-custom-secondary bg-custom-secondary font-semibold text-custom-background-dark'
                : 'border-custom-border bg-transparent text-custom-text-muted hover:bg-black/5 hover:text-custom-text-main dark:hover:bg-white/5'
            }`}
          >
            <p className="flex items-center justify-center gap-2 whitespace-nowrap text-sm">
              <LuTimer className="size-4" />
              {breakActive ? `${breakTimers[exerciseIndex]}S` : 'START 90S'}
            </p>
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={() => onAddSet(exerciseIndex)}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-custom-border bg-transparent p-0 text-custom-text-main transition-all hover:bg-black/5 hover:text-custom-text-main dark:hover:bg-white/5"
            >
              <FaPlus className="size-4" />
            </Button>
            <Button
              variant="ghost"
              onClick={() => onDeleteSet(exerciseIndex)}
              disabled={exData.sets.length <= 1}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-custom-border bg-transparent p-0 text-custom-text-muted transition-all hover:bg-black/5 hover:text-custom-text-main dark:hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <FaMinus className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
