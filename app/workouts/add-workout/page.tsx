import React from 'react';

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';

import Image from 'next/image';

import getAllExercises from '@/app/services/getExercisesList';

export default async function page() {
  const exercises = await getAllExercises();

  return (
    <section className="bg-primary flex flex-1 flex-col p-4">
      <section>
        <h2 className="text-custom-secondary">CONFIGURATOR</h2>
        <h1 className="text-custom-text-main text-2xl">New Workout setup</h1>
      </section>
      <Field className="max-w-sm">
        <FieldLabel className="text-custom-text-muted">Workout name</FieldLabel>
        <InputGroup>
          <InputGroupInput
            placeholder="e.g. Hypertrophy: Pull Focus"
            className="text-custom-text-main"
          />
        </InputGroup>
        <FieldDescription>Icon positioned at the end.</FieldDescription>
      </Field>
      <section>
        <h2 className="text-custom-secondary">LIBRARY</h2>
        <h1 className="text-custom-text-main text-xl">Select Exercises</h1>
      </section>
      <Command className="p-4">
        <CommandInput placeholder="Search exercises library..." />
      </Command>
      <section>
        {exercises.map((ex: any) => (
          <Card key={ex.id}>
            <CardHeader>
              <Image
                src={`/api/exercises/image/${ex.id}?res=360`}
                alt={ex.name}
                width={50}
                height={50}
                unoptimized
              />
            </CardHeader>
            <CardFooter>
              <CardTitle>{ex.name}</CardTitle>
              <CardDescription>{ex.target}</CardDescription>
            </CardFooter>
          </Card>
        ))}
      </section>
    </section>
  );
}
