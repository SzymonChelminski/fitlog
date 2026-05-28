'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { updateWorkout } from '@/app/services/workoutService';
import { searchExercises, type ExerciseResult } from '@/actions/exerciseActions';
import { FaTrash, FaPlus } from 'react-icons/fa';
import { FiX, FiCheckCircle } from 'react-icons/fi';
import { LuSearch, LuDumbbell } from 'react-icons/lu';
import { Loader2 } from 'lucide-react';

const BODY_PARTS = [
  'back',
  'cardio',
  'chest',
  'lower arms',
  'lower legs',
  'neck',
  'shoulders',
  'upper arms',
  'upper legs',
  'waist',
] as const;

type BodyPart = (typeof BODY_PARTS)[number];

interface EditWorkoutClientProps {
  workout: {
    id: string;
    title: string;
    exerciseIds: string[];
  };
  initialExercises: ExerciseResult[];
}

export default function EditWorkoutClient({
  workout,
  initialExercises,
}: EditWorkoutClientProps) {
  const router = useRouter();

  const [title, setTitle] = useState(workout.title);

  const [exerciseMap, setExerciseMap] = useState<Map<string, ExerciseResult>>(
    () => new Map(initialExercises.map((ex) => [ex.id, ex])),
  );
  const [exerciseIds, setExerciseIds] = useState<string[]>(workout.exerciseIds);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [selectedBodyPart, setSelectedBodyPart] = useState<BodyPart | null>(null);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ExerciseResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const currentExercises = exerciseIds
    .map((id) => exerciseMap.get(id))
    .filter((ex): ex is ExerciseResult => ex !== undefined);

  const handleSearch = useCallback(async () => {
    if (!selectedBodyPart || !query.trim() || isSearching) return;
    setIsSearching(true);
    setSearchError('');
    setHasSearched(true);

    const { exercises, error } = await searchExercises(selectedBodyPart, query);

    setExerciseMap((prev) => {
      const next = new Map(prev);
      exercises.forEach((ex) => next.set(ex.id, ex));
      return next;
    });
    setResults(exercises);
    if (error) setSearchError(error);
    setIsSearching(false);
  }, [selectedBodyPart, query, isSearching]);

  const handleAddExercise = (id: string) => {
    if (!exerciseIds.includes(id)) {
      setExerciseIds((prev) => [...prev, id]);
    }
    setIsModalOpen(false);
    setQuery('');
    setResults([]);
    setHasSearched(false);
  };

  const handleRemoveExercise = (indexToRemove: number) => {
    setExerciseIds((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const openModal = () => {
    setSelectedBodyPart(null);
    setQuery('');
    setResults([]);
    setHasSearched(false);
    setSearchError('');
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!title.trim() || exerciseIds.length === 0) return;
    setIsSaving(true);
    try {
      await updateWorkout(workout.id, title, exerciseIds);
      router.push('/workouts');
      router.refresh();
    } catch (error) {
      console.error('Failed to update workout:', error);
      setIsSaving(false);
    }
  };

  const canSearch = !!selectedBodyPart && query.trim().length > 0;

  return (
    <>
      <div className="flex flex-col gap-6">

        <header className="flex flex-col gap-2">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-custom-secondary">
            Edit Routine
          </p>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Workout Title"
            className="w-full border-b border-custom-border bg-transparent py-2 text-3xl font-medium text-custom-text-main transition-colors focus:border-custom-secondary focus:outline-none"
          />
        </header>

        <section className="mt-4 flex flex-col gap-4">
          <h3 className="text-lg font-medium text-custom-text-muted">Exercises</h3>

          {currentExercises.length === 0 ? (
            <div className="glass rounded-2xl border border-custom-border bg-custom-card-bg p-6 text-center">
              <p className="text-sm text-custom-text-muted">No exercises added yet.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {currentExercises.map((ex, index) => (
                <div
                  key={`${ex.id}-${index}`}
                  className="glass flex items-center justify-between rounded-2xl border border-custom-border bg-custom-card-bg px-4 py-3 transition-colors hover:border-custom-secondary/40"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium capitalize text-custom-text-main">
                      {ex.name}
                    </span>
                    <span className="text-xs capitalize text-custom-text-muted">
                      {ex.bodyPart} · {ex.target}
                    </span>
                  </div>
                  <button
                    onClick={() => handleRemoveExercise(index)}
                    aria-label={`Remove ${ex.name}`}
                    className="rounded-lg p-2 text-custom-text-muted transition-colors hover:text-red-400"
                  >
                    <FaTrash className="size-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={openModal}
            className="flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-custom-border p-4 text-sm font-semibold uppercase text-custom-text-muted transition-all hover:border-custom-secondary/50 hover:text-custom-text-main"
          >
            <FaPlus className="size-3" /> Add Exercise
          </button>
        </section>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={() => router.push('/workouts')}
            className="rounded-xl border border-custom-border px-8 py-3 text-sm font-semibold uppercase text-custom-text-main transition-colors hover:bg-black/5 dark:hover:bg-white/5 sm:w-36"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving || !title.trim() || exerciseIds.length === 0}
            className="flex items-center justify-center gap-2 rounded-xl bg-custom-primary px-8 py-3 text-sm font-semibold uppercase text-white transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50 sm:w-40"
          >
            {isSaving ? (
              'Saving...'
            ) : (
              <>
                <FiCheckCircle className="size-4" /> Save Changes
              </>
            )}
          </button>
        </div>

      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/80 backdrop-blur-sm sm:items-center sm:p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="flex h-[85dvh] w-full flex-col overflow-hidden rounded-t-2xl border border-custom-border bg-custom-card-bg shadow-xl sm:h-[80vh] sm:max-w-lg sm:rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex items-center justify-between border-b border-custom-border px-5 py-4">
              <h2 className="text-base font-medium uppercase tracking-wide text-custom-text-main">
                Add Exercise
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                aria-label="Close"
                className="rounded-lg p-1.5 text-custom-text-muted transition-colors hover:text-custom-text-main"
              >
                <FiX className="size-5" />
              </button>
            </header>

            <div className="border-b border-custom-border px-4 py-3">
              <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-custom-text-muted/70">
                Select a body part
              </p>
              <div className="flex flex-wrap gap-1.5">
                {BODY_PARTS.map((part) => (
                  <button
                    key={part}
                    type="button"
                    onClick={() => setSelectedBodyPart(part)}
                    className={`rounded-full px-3 py-1 text-xs font-medium capitalize transition-all ${
                      selectedBodyPart === part
                        ? 'bg-custom-primary text-white'
                        : 'border border-custom-border bg-transparent text-custom-text-muted hover:border-custom-primary/40 hover:text-custom-text-main'
                    }`}
                  >
                    {part}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-b border-custom-border px-4 py-3">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <LuSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 size-3.5 text-custom-text-muted/50 pointer-events-none" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder={
                      selectedBodyPart
                        ? `Search ${selectedBodyPart} exercises…`
                        : 'Select a body part first…'
                    }
                    disabled={!selectedBodyPart}
                    className="h-10 w-full rounded-xl border border-custom-border bg-custom-background-dark pl-9 pr-4 text-sm text-custom-text-main placeholder:text-custom-text-muted/40 outline-none transition-colors focus:border-custom-secondary disabled:opacity-40 disabled:cursor-not-allowed"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSearch}
                  disabled={!canSearch || isSearching}
                  className="h-10 shrink-0 rounded-xl bg-custom-primary px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSearching ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <LuSearch className="size-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {isSearching ? (
                <div className="flex flex-col items-center justify-center gap-3 py-14">
                  <Loader2 className="size-7 animate-spin text-custom-primary" />
                  <p className="text-sm text-custom-text-muted/60">Fetching exercises…</p>
                </div>
              ) : searchError ? (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/5 py-10 px-6 text-center">
                  <p className="text-sm font-medium text-red-400">{searchError}</p>
                </div>
              ) : hasSearched && results.length === 0 ? (
                <div className="flex flex-col items-center gap-3 py-14 text-center">
                  <LuDumbbell className="size-7 text-custom-text-muted/30" />
                  <p className="text-sm text-custom-text-muted/60">
                    No results for &ldquo;{query}&rdquo; in {selectedBodyPart}.
                  </p>
                </div>
              ) : results.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {results.map((ex) => (
                    <button
                      key={ex.id}
                      onClick={() => handleAddExercise(ex.id)}
                      className="group flex items-center justify-between rounded-2xl border border-custom-border bg-black/[0.03] p-3 text-left transition-colors hover:bg-black/[0.06] dark:bg-white/[0.02] dark:hover:bg-white/[0.05]"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={`/api/exercises/image/${ex.id}`}
                          alt={ex.name}
                          width={44}
                          height={44}
                          loading="lazy"
                          className="size-11 rounded-lg object-cover bg-black"
                        />
                        <div className="flex flex-col gap-0.5">
                          <span className="line-clamp-1 text-sm font-medium capitalize text-custom-text-main">
                            {ex.name}
                          </span>
                          <span className="text-xs uppercase tracking-wide text-custom-text-muted/70">
                            {ex.bodyPart} · {ex.target}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-center p-1.5 text-custom-primary opacity-0 transition-opacity group-hover:opacity-100">
                        <FaPlus className="size-3" />
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-custom-border bg-custom-card-bg/50 py-14 text-center">
                  <LuDumbbell className="size-7 text-custom-text-muted/20" />
                  <p className="text-sm text-custom-text-muted/50">
                    Choose a body part and search to find exercises.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
