'use client';

import { useState } from 'react';

import { Field, FieldLabel } from '@/components/ui/field';
import {
  InputGroupInput,
  InputGroup,
  InputGroupAddon,
} from '@/components/ui/input-group';
import { Button } from '@/components/ui/button';

import { IoMdEyeOff, IoMdEye } from 'react-icons/io';
import { BsCheckCircleFill } from 'react-icons/bs';
import { FaRegCircle } from 'react-icons/fa';

import { resetPasswordSchema } from '@/lib/validation/auth';
import { resetPassword } from '@/app/auth/actions';

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [data, setData] = useState({ password: '', confirmPassword: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleUserData = (property: string, val: string) => {
    setData((prev) => ({ ...prev, [property]: val }));
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    const validation = await resetPasswordSchema.safeParseAsync({
      password: data.password,
    });

    if (!validation.success) {
      validation.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        if (!newErrors[field]) newErrors[field] = issue.message;
      });
    }

    if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const result = await resetPassword({ password: data.password });
    if (result?.success) {
      setSuccessMessage('Your password has been updated successfully.');
    }
  };

  return (
    <section className="bg-primary flex flex-1 flex-col p-8 text-white">
      <section className="mb-12 flex flex-col items-center text-center">
        <h1 className="text-[2.5rem]">Reset Password</h1>
        <h2 className="text-custom-text-muted text-sm">
          ENTER YOUR NEW PASSWORD
        </h2>
      </section>

      <form>
        <Field>
          <FieldLabel className="text-custom-text-muted/60 font-normal">
            NEW PASSWORD
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
          {errors.password && (
            <p className="text-sm text-orange-600">{errors.password}</p>
          )}

          <FieldLabel className="text-custom-text-muted/60 mt-4 font-normal">
            CONFIRM PASSWORD
          </FieldLabel>
          <InputGroup className="border-custom-text-muted/40 rounded-none border-b">
            <InputGroupInput
              type={showConfirm ? 'text' : 'password'}
              placeholder="•••••••"
              className="placeholder:text-custom-text-muted/20"
              value={data.confirmPassword}
              onChange={(e) =>
                handleUserData('confirmPassword', e.currentTarget.value)
              }
            />
            <InputGroupAddon align="inline-end">
              {showConfirm ? (
                <IoMdEyeOff
                  className="text-custom-secondary cursor-pointer"
                  onClick={() => setShowConfirm((prev) => !prev)}
                />
              ) : (
                <IoMdEye
                  className="text-custom-secondary cursor-pointer"
                  onClick={() => setShowConfirm((prev) => !prev)}
                />
              )}
            </InputGroupAddon>
          </InputGroup>
        </Field>
      </form>

      <section className="text-custom-text-muted my-6 flex flex-col items-center justify-center gap-2 text-xs">
        <div className="flex gap-6">
          <span className="flex items-center gap-2">
            {data.password.length >= 8 ? (
              <BsCheckCircleFill size={15} className="text-custom-secondary" />
            ) : (
              <FaRegCircle size={15} className="text-custom-text-muted/30" />
            )}
            8+ CHARACTERS
          </span>
          <span className="flex items-center gap-2">
            {/[^A-Za-z0-9]/.test(data.password) ? (
              <BsCheckCircleFill size={15} className="text-custom-secondary" />
            ) : (
              <FaRegCircle size={15} className="text-custom-text-muted/30" />
            )}
            SPECIAL SYMBOL
          </span>
        </div>
        {errors.confirmPassword && (
          <p className="text-sm text-orange-600">{errors.confirmPassword}</p>
        )}
        {successMessage && (
          <p className="mt-4 text-sm text-green-500">{successMessage}</p>
        )}
      </section>

      <section className="mt-auto mb-8 flex flex-col gap-4 text-center">
        <Button
          className="bg-custom-primary text-custom-text-main w-full rounded-full py-8 text-lg font-medium"
          size="lg"
          onClick={handleSubmit}
        >
          <span>RESET PASSWORD</span>
        </Button>
      </section>
    </section>
  );
}
