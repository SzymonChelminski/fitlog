'use client';

import { useState, useCallback, memo } from 'react';
import { useRouter } from 'next/navigation';
import { LuSearch, LuDumbbell, LuPlus } from 'react-icons/lu';
import { BsCheckCircleFill } from 'react-icons/bs';
import { Loader2 } from 'lucide-react';

import { searchExercises, type ExerciseResult } from '@/actions/exerciseActions';
import createTrainingPlan from '@/actions/trainingActions';

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

const ExerciseItem = memo(function ExerciseItem({
  ex,
  isSelected,
  onToggle,
}: {
  ex: ExerciseResult;
  isSelected: boolean;
  onToggle: (id: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onToggle(ex.id)}
      className={`group w-full text-left flex items-center gap-4 rounded-2xl border p-4 transition-all duration-150 ${
        isSelected
          ? 'border-custom-primary/50 bg-custom-primary/5'
          : 'border-custom-border bg-custom-card-bg hover:bg-black/[0.025] dark:hover:bg-white/[0.025]'
      }`}
    >
      <div className="relative shrink-0">
        <img
          src={`/api/exercises/image/${ex.id}`}
          alt={ex.name}
          width={56}
          height={56}
          loading="lazy"
          className="size-14 rounded-xl object-cover bg-custom-border"
        />
        {isSelected && (
          <span className="absolute -top-1.5 -right-1.5 rounded-full bg-custom-card-bg p-0.5">
            <BsCheckCircleFill className="size-4 text-custom-primary" />
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 min-w-0">
        <p className="text-sm font-semibold uppercase tracking-wide text-custom-text-main truncate">
          {ex.name}
        </p>
        <p className="text-xs text-custom-text-muted/70 truncate capitalize">
          {ex.bodyPart} · {ex.target}
        </p>
        <p className="text-xs text-custom-text-muted/40 truncate capitalize">
          {ex.equipment}
        </p>
      </div>

      <span
        className={`shrink-0 size-5 rounded-full border-2 flex items-center justify-center transition-colors ${
          isSelected
            ? 'border-custom-primary bg-custom-primary'
            : 'border-custom-border group-hover:border-custom-primary/40'
        }`}
      >
        {isSelected && <span className="size-2 rounded-full bg-white" />}
      </span>
    </button>
  );
});

export function ExerciseLibrary() {
  const router = useRouter();

  const [selectedBodyPart, setSelectedBodyPart] = useState<BodyPart | null>(null);
  const [query, setQuery]                       = useState('');
  const [results, setResults]                   = useState<ExerciseResult[]>([]);
  const [isSearching, setIsSearching]           = useState(false);
  const [searchError, setSearchError]           = useState('');
  const [hasSearched, setHasSearched]           = useState(false);

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [planName, setPlanName]       = useState('');
  const [isCreating, setIsCreating]   = useState(false);

  const toggleExercise = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const handleSearch = async () => {
    if (!selectedBodyPart || !query.trim() || isSearching) return;

    setIsSearching(true);
    setSearchError('');
    setHasSearched(true);

    const { exercises, error } = await searchExercises(selectedBodyPart, query);

    setResults(exercises);
    if (error) setSearchError(error);
    setIsSearching(false);
  };

  const handleCreate = async () => {
    if (!canCreate || isCreating) return;
    setIsCreating(true);
    const result = await createTrainingPlan(planName.trim(), Array.from(selectedIds));
    setIsCreating(false);
    if (result?.success) {
      router.push('/workouts');
    }
  };

  const hasExercises = selectedIds.size > 0;
  const hasName      = planName.trim() !== '';
  const canCreate    = hasExercises && hasName;
  const canSearch    = !!selectedBodyPart && query.trim().length > 0;

  return (
    <div className="flex flex-col gap-6">

      <div className="glass rounded-2xl border border-custom-border bg-custom-card-bg p-5 flex flex-col gap-5">

        <div className="flex items-center justify-between">
          {hasExercises ? (
            <span className="flex items-center gap-1.5 rounded-full bg-custom-primary/10 px-3 py-1 text-xs font-semibold text-custom-primary">
              <BsCheckCircleFill className="size-3" />
              {selectedIds.size} exercise{selectedIds.size !== 1 ? 's' : ''} selected
            </span>
          ) : (
            <span className="text-xs text-custom-text-muted/40 italic">
              Select exercises below to get started
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="plan-name"
            className="text-xs font-semibold uppercase tracking-[0.14em] text-custom-text-muted/70"
          >
            Workout Name
          </label>

          <input
            id="plan-name"
            type="text"
            placeholder={hasExercises ? 'e.g. Hypertrophy: Pull Focus' : 'Select exercises first…'}
            disabled={!hasExercises}
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            className="h-10 w-full rounded-lg border border-custom-border bg-custom-background-dark px-3 text-sm text-custom-text-main placeholder:text-custom-text-muted/30 outline-none focus:border-custom-primary/60 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          />

          {hasExercises && !hasName && (
            <p className="text-xs text-orange-400">Give your workout a name to continue.</p>
          )}

          <button
            type="button"
            onClick={handleCreate}
            disabled={!canCreate || isCreating}
            className="h-10 w-full rounded-lg bg-custom-primary text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isCreating ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Saving…
              </>
            ) : (
              <>
                <LuPlus className="size-4" />
                Create Workout
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-custom-text-muted/70">
          1 · Select a body part
        </p>
        <div className="flex gap-2 flex-wrap">
          {BODY_PARTS.map((part) => (
            <button
              key={part}
              type="button"
              onClick={() => setSelectedBodyPart(part)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium capitalize transition-all duration-150 ${
                selectedBodyPart === part
                  ? 'bg-custom-primary text-white shadow-sm'
                  : 'border border-custom-border bg-custom-card-bg text-custom-text-muted hover:text-custom-text-main hover:border-custom-primary/40'
              }`}
            >
              {part}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className={`text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
          selectedBodyPart ? 'text-custom-text-muted/70' : 'text-custom-text-muted/30'
        }`}>
          2 · Search exercises
        </p>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <LuSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-custom-text-muted/50 pointer-events-none" />
            <input
              type="text"
              placeholder={
                selectedBodyPart
                  ? `Search ${selectedBodyPart} exercises…`
                  : 'Select a body part first…'
              }
              disabled={!selectedBodyPart}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="h-11 w-full rounded-xl border border-custom-border bg-custom-card-bg pl-10 pr-4 text-sm text-custom-text-main placeholder:text-custom-text-muted/40 outline-none focus:border-custom-primary/60 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            />
          </div>
          <button
            type="button"
            onClick={handleSearch}
            disabled={!canSearch || isSearching}
            className="h-11 shrink-0 rounded-xl bg-custom-primary px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSearching ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <LuSearch className="size-4" />
            )}
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>
      </div>

      {isSearching ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-custom-border bg-custom-card-bg py-14">
          <Loader2 className="size-8 animate-spin text-custom-primary" />
          <p className="text-sm text-custom-text-muted/60">Fetching exercises…</p>
        </div>
      ) : searchError ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/5 py-10 text-center px-6">
          <p className="text-sm font-medium text-red-400">{searchError}</p>
        </div>
      ) : hasSearched && results.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-custom-border bg-custom-card-bg py-14 text-center">
          <LuDumbbell className="size-7 text-custom-text-muted/30" />
          <p className="text-sm text-custom-text-muted/60">
            No exercises found for &ldquo;{query}&rdquo; in {selectedBodyPart}.
          </p>
          <p className="text-xs text-custom-text-muted/40">Try a different keyword or body part.</p>
        </div>
      ) : results.length > 0 ? (
        <div className="flex flex-col gap-2">
          <p className="text-xs text-custom-text-muted/50">
            {results.length} result{results.length !== 1 ? 's' : ''} · tap to select
          </p>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {results.map((ex) => (
              <ExerciseItem
                key={ex.id}
                ex={ex}
                isSelected={selectedIds.has(ex.id)}
                onToggle={toggleExercise}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-custom-border bg-custom-card-bg/50 py-14 text-center">
          <LuDumbbell className="size-7 text-custom-text-muted/20" />
          <p className="text-sm text-custom-text-muted/50">
            Choose a body part and search to discover exercises.
          </p>
        </div>
      )}

    </div>
  );
}
