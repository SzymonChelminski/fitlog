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

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

import { signIn, sendPasswordResetLink } from '../actions';

export default function page() {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    const result = await signIn(data);

    if (result?.success === false) {
      if (result.errors) {
        setErrors(result.errors);
      } else if (result.message) {
        alert(result.message);
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
    <section className="bg-primary flex flex-1 flex-col p-8 text-white">
      <section className="mb-12 flex flex-col items-center text-center">
        <h1 className="text-[2.5rem]">Welcome Back</h1>
        <h2 className="text-custom-text-muted text-sm">
          ACCES YOUR KINETIC OBSERVATORY
        </h2>
      </section>
      <form>
        <Field>
          <FieldLabel className="text-custom-text-muted/60 font-normal">
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
          <FieldLabel className="text-custom-text-muted/60 mt-4 font-normal">
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
          variant="ghost"
          className="text-custom-text-muted/60 max-w-fit p-0 text-sm"
          onClick={async (e) => {
            e.preventDefault();
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
      </form>
      <section className="mt-auto flex flex-col gap-4 text-center">
        <Button
          className="bg-custom-primary text-custom-text-main w-full rounded-full py-8 text-lg font-medium"
          size="lg"
          onClick={handleSubmit}
        >
          <span>LOG IN</span>
          <IoLogIn className="size-6" />
        </Button>
        <p className="text-custom-text-muted/60 px-4 text-sm">
          New to the Observatory?
          <Link href="/auth/register" className="text-custom-primary ml-1">
            Create Account
          </Link>
        </p>
      </section>
    </section>
  );
}
