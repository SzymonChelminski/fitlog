'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

import { updateProfile, type ProfileFormState } from '@/actions/settingsActions';

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1 text-xs text-red-400">{msg}</p>;
}

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-custom-text-muted/70"
    >
      {children}
    </label>
  );
}

const inputClass =
  'h-10 w-full rounded-lg border border-custom-border bg-custom-card-bg px-3 text-sm text-custom-text-main placeholder:text-custom-text-muted/30 outline-none focus:border-custom-primary/60 focus:ring-0 transition-colors';

const selectClass =
  'h-10 w-full rounded-lg border border-custom-border bg-custom-card-bg px-3 text-sm text-custom-text-main outline-none focus:border-custom-primary/60 transition-colors appearance-none cursor-pointer';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-6 h-10 w-full rounded-lg bg-custom-primary px-4 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? 'Saving…' : 'Save changes'}
    </button>
  );
}

export interface ProfileData {
  name:       string;
  age:        number;
  weight:     number | null;
  height:     number | null;
  goal:       string | null;
  experience: string;
}

export function ProfileForm({ profile }: { profile: ProfileData }) {
  const [state, action] = useActionState<ProfileFormState, FormData>(
    updateProfile,
    { success: false },
  );

  return (
    <form
      action={action}
      className="mt-4 rounded-xl border border-custom-border bg-custom-card-bg p-5"
    >
      {state.message && (
        <p
          className={`mb-4 rounded-lg px-4 py-2.5 text-sm ${
            state.success
              ? 'bg-emerald-500/10 text-emerald-400'
              : 'bg-red-500/10 text-red-400'
          }`}
        >
          {state.message}
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <FieldLabel htmlFor="name">Display name</FieldLabel>
          <input
            id="name"
            name="name"
            type="text"
            defaultValue={profile.name}
            placeholder="Your name"
            className={inputClass}
            aria-invalid={!!state.errors?.name}
          />
          <FieldError msg={state.errors?.name} />
        </div>

        <div>
          <FieldLabel htmlFor="age">Age</FieldLabel>
          <input
            id="age"
            name="age"
            type="number"
            defaultValue={profile.age}
            placeholder="e.g. 25"
            className={inputClass}
            aria-invalid={!!state.errors?.age}
          />
          <FieldError msg={state.errors?.age} />
        </div>

        <div>
          <FieldLabel htmlFor="weight">Body weight (kg)</FieldLabel>
          <input
            id="weight"
            name="weight"
            type="number"
            step="0.1"
            defaultValue={profile.weight ?? ''}
            placeholder="e.g. 75"
            className={inputClass}
            aria-invalid={!!state.errors?.weight}
          />
          <FieldError msg={state.errors?.weight} />
        </div>

        <div>
          <FieldLabel htmlFor="height">Height (cm)</FieldLabel>
          <input
            id="height"
            name="height"
            type="number"
            defaultValue={profile.height ?? ''}
            placeholder="e.g. 178"
            className={inputClass}
            aria-invalid={!!state.errors?.height}
          />
          <FieldError msg={state.errors?.height} />
        </div>

        <div>
          <FieldLabel htmlFor="experience">Experience level</FieldLabel>
          <select
            id="experience"
            name="experience"
            defaultValue={profile.experience}
            className={selectClass}
            aria-invalid={!!state.errors?.experience}
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          <FieldError msg={state.errors?.experience} />
        </div>

        <div className="sm:col-span-2">
          <FieldLabel htmlFor="goal">Fitness goal</FieldLabel>
          <select
            id="goal"
            name="goal"
            defaultValue={profile.goal ?? ''}
            className={selectClass}
          >
            <option value="">No specific goal</option>
            <option value="muscle_gain">Muscle Gain</option>
            <option value="weight_loss">Weight Loss</option>
            <option value="athleticsm">Athleticism</option>
            <option value="longevity">Longevity</option>
          </select>
        </div>
      </div>

      <SubmitButton />
    </form>
  );
}
