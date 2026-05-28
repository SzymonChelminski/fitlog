'use client';

import React, { useState, useEffect } from 'react';
import { TrainingPlan } from '@/types/trainingPlan';
import { PiDotsThreeOutlineVerticalFill } from 'react-icons/pi';
import { IoPlay } from 'react-icons/io5';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { deleteWorkout } from '@/app/services/workoutService';

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from './ui/button';
import Link from 'next/link';

function estimateDuration(exerciseCount: number): number {
  return Math.round((exerciseCount * 9 + 5) / 5) * 5;
}

export default function PlanLibrary({
  routines,
}: {
  routines: TrainingPlan[];
}) {
  const router = useRouter();
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [workoutToDeleteId, setWorkoutToDeleteId] = useState<string | null>(
    null,
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest('.workout-dropdown-container')) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const openDeleteModal = (id: string) => {
    setWorkoutToDeleteId(id);
    setOpenDropdownId(null);
    setTimeout(() => setIsModalVisible(true), 10);
  };

  const closeDeleteModal = () => {
    setIsModalVisible(false);
    setTimeout(() => setWorkoutToDeleteId(null), 300);
  };

  const confirmDelete = async () => {
    if (!workoutToDeleteId) return;
    try {
      await deleteWorkout(workoutToDeleteId);
      router.refresh();
    } catch (error) {
      console.error('Failed to delete workout:', error);
    } finally {
      closeDeleteModal();
    }
  };

  const toggleDropdown = (id: string) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {routines.map((routine) => {
          return (
            <Card
              key={routine.id}
              className="bg-custom-card-bg/75 relative overflow-visible rounded-md"
            >
              <CardHeader>
                <CardTitle className="text-custom-text-main text-2xl">
                  {routine.title}
                </CardTitle>
                <CardAction className="workout-dropdown-container relative flex justify-end">
                  <button
                    onClick={() => toggleDropdown(routine.id)}
                    className="rounded p-1 transition-colors hover:bg-black/5 focus:outline-none dark:hover:bg-white/5"
                  >
                    <PiDotsThreeOutlineVerticalFill className="text-custom-text-main/50 size-5" />
                  </button>
                  {openDropdownId === routine.id && (
                    <div className="border-custom-border bg-custom-card-bg absolute top-8 right-0 z-[50] flex w-32 flex-col overflow-hidden rounded-md border shadow-lg">
                      <Link
                        href={`/workouts/${routine.id}/edit`}
                        className="text-custom-text-main flex w-full items-center gap-2 border-none bg-transparent px-4 py-3 text-left text-sm transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                      >
                        <FaEdit className="size-4" />
                        Edit
                      </Link>
                      <button
                        onClick={() => openDeleteModal(routine.id)}
                        className="flex w-full items-center gap-2 border-none bg-transparent px-4 py-3 text-left text-sm text-red-500 transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                      >
                        <FaTrash className="size-4" />
                        Delete
                      </button>
                    </div>
                  )}
                </CardAction>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <div className="text-custom-text-muted text-md font-medium">
                    <p className="text-xs tracking-wide uppercase">Exercises</p>
                    <p className="text-custom-text-main text-lg font-normal">
                      {routine.exerciseIds.length}
                    </p>
                  </div>
                  <div className="text-custom-text-muted text-md font-medium">
                    <p className="text-xs tracking-wide uppercase">Duration</p>
                    <p className="text-custom-text-main text-lg font-normal">
                      {estimateDuration(routine.exerciseIds.length)}{' '}
                      <span className="text-custom-text-muted text-sm font-normal">
                        min
                      </span>
                    </p>
                  </div>
                  <Link href={`/workouts/${routine.id}`} className="ml-auto">
                    <Button
                      className="bg-custom-text-muted/10 flex cursor-pointer items-center rounded-full border-none p-4 hover:brightness-110"
                      aria-label={`Start ${routine.title}`}
                    >
                      <IoPlay className="text-custom-text-muted size-6" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
        <Link
          href={'/workouts/add-workout'}
          className="border-custom-text-muted/20 flex h-40 flex-col items-center justify-center gap-3 rounded-xl border-3 border-dashed bg-transparent transition-colors hover:bg-black/5 md:col-span-2 dark:hover:bg-white/5"
        >
          <span className="bg-custom-text-muted/10 rounded-full p-4">
            <BsFillPlusCircleFill className="text-custom-primary size-8" />
          </span>
          <span className="text-custom-text-muted/75 text-center font-medium">
            Create Custom Routine
          </span>
        </Link>
      </section>

      {workoutToDeleteId && (
        <div
          className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-300 ${
            isModalVisible
              ? 'bg-black/60 backdrop-blur-sm'
              : 'bg-transparent backdrop-blur-none'
          }`}
          onClick={closeDeleteModal}
        >
          <div
            className={`bg-custom-card-bg border-custom-border flex w-80 transform flex-col items-center gap-6 rounded-2xl border p-6 shadow-xl transition-all duration-300 ${
              isModalVisible
                ? 'translate-y-0 scale-100 opacity-100'
                : 'translate-y-8 scale-95 opacity-0'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center gap-2 text-center">
              <h3 className="text-custom-text-main text-lg font-medium">
                Delete Workout?
              </h3>
              <p className="text-custom-text-muted text-sm">
                Are you sure you want to delete this workout?
              </p>
            </div>
            <div className="flex w-full gap-4">
              <button
                onClick={closeDeleteModal}
                className="text-custom-text-main border-custom-border flex w-full items-center justify-center gap-2 rounded-xl border bg-transparent py-3 transition-colors hover:bg-black/5 dark:hover:bg-white/5"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-900/30 bg-red-900/10 py-3 text-red-400 transition-all hover:border-red-900/50 hover:bg-red-900/30"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
