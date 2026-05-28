'use client';

import { Field, FieldLabel } from '@/components/ui/field';
import {
  InputGroupInput,
  InputGroup,
  InputGroupAddon,
} from '@/components/ui/input-group';

import { CiAt } from 'react-icons/ci';
import { IoMdEyeOff, IoMdEye } from 'react-icons/io';
import { IoLogIn } from 'react-icons/io5';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

import { signIn, sendPasswordResetLink } from '../actions';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setAuthError('');
    setIsLoading(true);

    const result = await signIn(data);
    setIsLoading(false);

    if (result?.success === false) {
      if (result.errors) {
        setErrors(result.errors);
      } else if (result.message) {
        setAuthError(result.message);
      }
    }
  };

  const handleUserData = (property: string, val: string | number) => {
    setData((prev) => ({
      ...prev,
      [property]: val,
    }));
  };

  return (
    <main className="bg-custom-page flex flex-1 flex-col items-center justify-center px-6 py-12 text-custom-text-main sm:px-8">

      <div className="flex w-full max-w-sm flex-col gap-10">

        <header className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-[2.5rem] font-light">Welcome Back</h1>
          <p className="text-custom-text-muted text-sm tracking-wide">
            ACCESS YOUR KINETIC OBSERVATORY
          </p>
        </header>

        <form
          className="flex flex-col gap-1"
          onSubmit={async (e) => {
            e.preventDefault();
            await handleSubmit();
          }}
        >
          <Field>
            <FieldLabel className="text-custom-text-muted/80 font-normal">
              EMAIL ADDRESS
            </FieldLabel>
            <InputGroup className="border-custom-text-muted/40 rounded-none border-b">
              <InputGroupInput
                type="email"
                placeholder="example@email.com"
                className="placeholder:text-custom-text-muted/20 autofill:shadow-[inset_0_0_0_1000px_transparent] autofill:transition-colors autofill:duration-[5000000s]"
                value={data.email}
                onChange={(e) => handleUserData('email', e.currentTarget.value)}
              />
              <InputGroupAddon align="inline-end">
                <CiAt className="text-custom-secondary" />
              </InputGroupAddon>
            </InputGroup>
            {errors.email && (
              <p className="text-sm text-orange-600">{errors.email}</p>
            )}
            <FieldLabel className="text-custom-text-muted/75 mt-4 font-normal">
              PASSWORD
            </FieldLabel>
            <InputGroup className="border-custom-text-muted/40 rounded-none border-b">
              <InputGroupInput
                type={showPassword ? 'text' : 'password'}
                placeholder="•••••••"
                className="placeholder:text-custom-text-muted/20"
                value={data.password}
                onChange={(e) =>
                  handleUserData('password', e.currentTarget.value)
                }
              />
              <InputGroupAddon align="inline-end">
                {showPassword ? (
                  <IoMdEyeOff
                    className="text-custom-secondary cursor-pointer"
                    onClick={() => setShowPassword((prev) => !prev)}
                  />
                ) : (
                  <IoMdEye
                    className="text-custom-secondary cursor-pointer"
                    onClick={() => setShowPassword((prev) => !prev)}
                  />
                )}
              </InputGroupAddon>
            </InputGroup>
          </Field>

          <Button
            type="button"
            variant="ghost"
            className="text-custom-text-muted/75 mt-1 max-w-fit p-0 text-sm"
            onClick={async () => {
              const { success, errors, message } = await sendPasswordResetLink({
                email: data.email,
              });

              if (!success) {
                if (errors?.email) {
                  setErrors({ email: errors.email });
                } else if (message) {
                  setMessage(message ?? '');
                }
              } else {
                setMessage(message ?? '');
              }
            }}
          >
            Reset password
          </Button>

          {errors.password && (
            <p className="text-sm text-orange-600">{errors.password}</p>
          )}
          {message && <p className="text-custom-secondary text-sm">{message}</p>}

          {authError && (
            <p className="text-sm font-medium text-red-500">{authError}</p>
          )}

          <div className="mt-9 flex flex-col gap-5 text-center">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-custom-primary w-full rounded-full py-8 text-lg font-medium text-white disabled:opacity-70"
              size="lg"
            >
              {isLoading ? (
                <AiOutlineLoading3Quarters className="size-6 animate-spin" />
              ) : (
                <>
                  <span>LOG IN</span>
                  <IoLogIn className="size-6" />
                </>
              )}
            </Button>
            <p className="text-custom-text-muted/75 text-sm">
              New to the Observatory?{' '}
              <Link href="/auth/register" className="text-custom-primary">
                Create Account
              </Link>
            </p>
          </div>
        </form>

      </div>
    </main>
  );
}
