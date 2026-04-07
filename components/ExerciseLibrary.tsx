'use client';

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
  FieldLabel,
} from '@/components/ui/field';
import { Checkbox } from '@/components/ui/checkbox';
import { FiInfo } from 'react-icons/fi';
import Image from 'next/image';

import { useState } from 'react';
import { Exercise } from '@/app/types/exercise';

export function ExerciseLibrary({ exercises }: { exercises: Exercise[] }) {
  const [checkedExercises, setCheckedExercises] = useState([]);

  return (
    <Command className="gap-4 rounded-md! bg-transparent">
      <span className="bg-custom-text-muted/10 rounded-md">
        <CommandInput
          placeholder="Search exercises library..."
          className="text-custom-text-main bg-transparent!"
        />
      </span>
      <CommandList>
        <CommandEmpty className="text-custom-text-muted py-6 text-center">
          No exercises found.
        </CommandEmpty>
        <CommandGroup className="max-h-100 **:[[role=group]]:flex **:[[role=group]]:flex-col **:[[role=group]]:gap-2">
          {exercises.map((ex: Exercise) => (
            <CommandItem
              className="data-[selected=true]:bg-transparent"
              key={ex.id}
              value={`${ex.name} ${ex.target} ${ex.category}`}
            >
              <FieldLabel>
                <Field className="bg-custom-text-muted/10 has-data-[state=checked]:bg-custom-text-muted/25 rounded-md duration-300">
                  <FieldContent className="flex flex-row items-center gap-4 p-1">
                    <Image
                      src={`/exercises-gifs/${ex.id}.gif`}
                      alt={ex.name}
                      width={50}
                      height={50}
                      unoptimized
                      className="rounded-sm"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.png';
                      }}
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
                      <Checkbox className="border-custom-text-muted/40 peer data-checked:bg-custom-primary data-checked:border-custom-primary size-6 border-2" />
                    </span>
                  </FieldContent>
                </Field>
              </FieldLabel>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
