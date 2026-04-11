'use client';

import { useState, useCallback, useMemo, useDeferredValue, memo } from 'react';
import { FiInfo } from 'react-icons/fi';

import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command';
import {
  Field,
  FieldContent,
  FieldTitle,
  FieldDescription,
} from '@/components/ui/field';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

import { Exercise } from '@/types/exercise';
import createTrainingPlan from '@/actions/trainingActions';

const ExerciseItem = memo(function ExerciseItem({
  ex,
  isSelected,
  onToggle,
}: {
  ex: Exercise;
  isSelected: boolean;
  onToggle: (id: string) => void;
}) {
  return (
    <CommandItem
      className="data-[selected=true]:bg-transparent"
      key={ex.id}
      value={`${ex.name} ${ex.target} ${ex.category}`}
      onSelect={() => onToggle(ex.id)}
    >
      <Field className="bg-custom-text-muted/10 has-data-[state=checked]:bg-custom-text-muted/25 rounded-md p-3 duration-300">
        <FieldContent className="flex flex-row items-center gap-4 p-1">
          <img
            src={
              parseInt(ex.id) <= 350
                ? `/exercises-gifs/${ex.id}.gif`
                : '/placeholder.png'
            }
            alt={ex.name}
            width={50}
            height={50}
            loading="lazy"
            className="size-12.5 rounded-sm object-cover"
          />
          <span>
            <FieldTitle className="text-custom-text-main font-medium uppercase">
              {ex.name}
            </FieldTitle>
            <FieldDescription>
              {ex.category} • {ex.target}
            </FieldDescription>
          </span>
          <span className="ml-auto flex flex-row items-center gap-2">
            <FiInfo className="text-custom-text-muted/40 size-6" />
            <Checkbox
              checked={isSelected}
              className="border-custom-text-muted/40 peer data-checked:bg-custom-primary data-checked:border-custom-primary size-6 border-2"
            />
          </span>
        </FieldContent>
      </Field>
    </CommandItem>
  );
});

export function ExerciseLibrary({ exercises }: { exercises: Exercise[] }) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');
  const [planName, setPlanName] = useState('');
  const deferredSearch = useDeferredValue(search);

  const filtered = useMemo(() => {
    if (!deferredSearch) return exercises;
    const q = deferredSearch.toLowerCase();
    return exercises.filter(
      (ex) =>
        ex.name.toLowerCase().includes(q) ||
        ex.target.toLowerCase().includes(q) ||
        ex.category.toLowerCase().includes(q),
    );
  }, [exercises, deferredSearch]);

  const toggleExercise = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  return (
    <>
      <div className="bg-custom-text-muted/10 group rounded-md p-3">
        <p className="text-custom-text-main group-has-disabled:text-custom-text-muted/40 mb-2">
          Workout name
        </p>
        <Input
          placeholder="e.g. Hypertrophy: Pull Focus"
          disabled={selectedIds.size > 0 ? false : true}
          value={planName}
          onChange={(e) => setPlanName(e.target.value)}
          className="text-custom-text-main bg-custom-text-muted/10 disabled:bg-custom-text-muted/5 rounded-t-sm rounded-b-none border-none p-5"
        />
        <Button
          className="bg-custom-primary m-0! w-full rounded-sm rounded-t-none border-none p-3"
          onClick={() => createTrainingPlan(planName, Array.from(selectedIds))}
          disabled={selectedIds.size > 0 ? false : true}
        >
          Create Workout
        </Button>
      </div>

      <Separator className="bg-custom-text-muted/15" />

      <Command
        shouldFilter={false}
        className="gap-4 rounded-md! bg-transparent"
      >
        <span className="bg-custom-text-muted/10 rounded-md">
          <CommandInput
            placeholder="Search exercises library..."
            className="text-custom-text-main bg-transparent!"
            value={search}
            onValueChange={setSearch}
          />
        </span>
        <CommandList>
          <CommandEmpty className="text-custom-text-muted py-6 text-center">
            No exercises found.
          </CommandEmpty>
          <CommandGroup className="max-h-150 **:[[role=group]]:flex **:[[role=group]]:flex-col **:[[role=group]]:gap-2">
            {filtered.map((ex) => (
              <ExerciseItem
                key={ex.id}
                ex={ex}
                isSelected={selectedIds.has(ex.id)}
                onToggle={toggleExercise}
              />
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </>
  );
}
