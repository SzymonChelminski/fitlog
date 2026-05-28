'use client';

import { FiCheckCircle, FiX } from 'react-icons/fi';

interface Props {
  show: boolean;
  animate: boolean;
  seconds: number;
  onDiscard: () => void;
  onSave: () => void;
}

export function FinishWorkoutDialog({
  show,
  animate,
  seconds,
  onDiscard,
  onSave,
}: Props) {
  if (!show) return null;

  const tooShort = seconds < 1;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-300 ${
        animate
          ? 'bg-black/60 backdrop-blur-sm'
          : 'bg-transparent backdrop-blur-none'
      }`}
    >
      <div
        className={`bg-custom-card-bg flex w-80 flex-col items-center gap-6 rounded-2xl border border-custom-border p-6 shadow-xl transition-all duration-300 ${
          animate
            ? 'translate-y-0 scale-100 opacity-100'
            : 'translate-y-20 scale-95 opacity-0'
        }`}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h3 className="text-custom-text-main text-lg font-medium">
            Finish Workout?
          </h3>
          <p className="text-custom-text-muted text-sm">
            Save your session or discard it without recording.
          </p>
        </div>

        {tooShort && (
          <p className="w-full rounded-lg border border-orange-800/40 bg-orange-950/20 px-3 py-2 text-center text-xs text-orange-400">
            Workout must last at least 1 second to save.
          </p>
        )}

        <div className="flex w-full gap-4">
          <button
            onClick={onDiscard}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-300 bg-red-50 py-3 text-red-500 transition-colors hover:bg-red-100 dark:border-red-800 dark:bg-custom-background-dark dark:text-red-400 dark:hover:bg-red-950/30"
          >
            <FiX className="size-4" />
            Discard
          </button>
          <button
            onClick={onSave}
            disabled={tooShort}
            className="bg-custom-primary flex w-full items-center justify-center gap-2 rounded-lg py-3 text-white transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FiCheckCircle className="size-4" />
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
