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

import { FiInfo } from 'react-icons/fi';

import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group';

import { Separator } from '@/components/ui/separator';

import { Checkbox } from '@/components/ui/checkbox';
import { FieldContent, FieldGroup, FieldTitle } from '@/components/ui/field';
import { Label } from '@/components/ui/label';

import { MdDriveFileRenameOutline } from 'react-icons/md';

import Image from 'next/image';

import getAllExercises from '@/app/services/getExercisesList';
import { Input } from '@/components/ui/input';

export default async function page() {
  const exercises = await getAllExercises();

  // console.log(exercises);
  return (
    <section className="bg-primary flex flex-1 flex-col gap-6 p-4">
      <section>
        <h2 className="text-custom-secondary font-semibold">CONFIGURATOR</h2>
        <h1 className="text-custom-text-main text-2xl font-medium">
          New Workout setup
        </h1>
      </section>
      <Field>
        <FieldLabel className="text-custom-text-main text-xl">
          Workout Name
        </FieldLabel>
        <InputGroup className="bg-custom-text-muted/10 rounded-md py-8! pl-1">
          <InputGroupInput
            placeholder="e.g. Hypertrophy: Pull Focus"
            required
            className="text-custom-text-main"
          />
        </InputGroup>
      </Field>
      <Separator className="bg-custom-text-muted/20" />
      <section>
        <h2 className="text-custom-secondary font-semibold">LIBRARY</h2>
        <h1 className="text-custom-text-main text-xl">Select Exercises</h1>
        <Command className="bg-custom-text-muted/10 mt-2 rounded-md!">
          <CommandInput
            placeholder="Search exercises library..."
            className="text-custom-text-main bg-transparent!"
          />
        </Command>
      </section>
      <FieldGroup className="gap-3 border-none">
        {exercises.map((ex: any) => (
          <FieldLabel key={ex.id}>
            <Field className="bg-custom-text-muted/10 has-data-[state=checked]:bg-custom-text-muted/25 rounded-md duration-300">
              <FieldContent className="p- flex flex-row items-center gap-4 p-1">
                <Image
                  src={`/api/exercises/image/${ex.id}?res=360`}
                  alt={ex.name}
                  width={50}
                  height={50}
                  unoptimized
                  className="rounded-sm"
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
        ))}
      </FieldGroup>
    </section>
  );
}
