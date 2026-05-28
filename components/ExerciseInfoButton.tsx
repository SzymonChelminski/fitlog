'use client';

import React, { useState } from 'react';
import { FiInfo, FiX } from 'react-icons/fi';
import { Exercise } from '@/types/exercise';

interface Props {
  exercise: Exercise;
}

export default function ExerciseInfoButton({ exercise }: Props) {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [animatePopup, setAnimatePopup] = useState<boolean>(false);

  const openPopup = () => {
    setShowPopup(true);
    setTimeout(() => setAnimatePopup(true), 10);
  };

  const closePopup = () => {
    setAnimatePopup(false);
    setTimeout(() => setShowPopup(false), 300);
  };

  return (
    <>
      <button
        onClick={openPopup}
        className="ml-6 shrink-0 rounded-full pl-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-custom-secondary"
        aria-label="View exercise details"
      >
        <FiInfo className="text-custom-text-muted size-6 shrink-0 transition-colors hover:text-custom-text-main" />
      </button>

      {showPopup && (
        <div
          className={`fixed top-0 left-0 z-[100] flex h-screen w-screen items-center justify-center transition-all duration-300 ${
            animatePopup ? 'bg-black/70 backdrop-blur-sm' : 'bg-transparent backdrop-blur-none'
          }`}
        >
          <div
            className={`bg-custom-card-bg flex w-11/12 max-w-md flex-col gap-6 rounded-3xl border border-custom-border p-7 shadow-2xl transition-all duration-300 transform ${
              animatePopup ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-12 scale-95 opacity-0'
            }`}
          >
            <div className="flex items-center justify-between border-b border-custom-border pb-4">
              <h3 className="text-custom-text-main text-xl font-bold uppercase tracking-wider">
                {exercise.name}
              </h3>
              <button
                onClick={closePopup}
                className="bg-custom-background-dark text-custom-text-muted rounded-full p-2 transition-all hover:brightness-110 hover:text-custom-text-main"
                aria-label="Close popup"
              >
                <FiX className="size-5" />
              </button>
            </div>

            <div className="flex max-h-[65vh] flex-col gap-6 overflow-y-auto pr-2">
              <div className="bg-custom-card-bg grid grid-cols-2 gap-y-5 gap-x-4 rounded-2xl border border-custom-border p-5 shadow-inner">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-bold tracking-widest text-indigo-400 uppercase">Target</span>
                  <span className="text-custom-text-main text-sm font-medium capitalize drop-shadow-sm">{exercise.target}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-bold tracking-widest text-indigo-400 uppercase">Body Part</span>
                  <span className="text-custom-text-main text-sm font-medium capitalize drop-shadow-sm">{exercise.bodyPart}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-bold tracking-widest text-indigo-400 uppercase">Equipment</span>
                  <span className="text-custom-text-main text-sm font-medium capitalize drop-shadow-sm">{exercise.equipment}</span>
                </div>
                {exercise.difficulty && (
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-bold tracking-widest text-indigo-400 uppercase">Difficulty</span>
                    <span className="text-custom-text-main text-sm font-medium capitalize drop-shadow-sm">{exercise.difficulty}</span>
                  </div>
                )}
              </div>

              {exercise.description && (
                <div className="flex flex-col gap-2.5">
                  <span className="text-[11px] font-bold tracking-widest text-gray-500 uppercase">Description</span>
                  <p className="text-custom-text-muted text-sm leading-relaxed font-light">
                    {exercise.description}
                  </p>
                </div>
              )}

              {exercise.instructions && exercise.instructions.length > 0 && (
                <div className="flex flex-col gap-2.5">
                  <span className="text-[11px] font-bold tracking-widest text-gray-500 uppercase">Instructions</span>
                  <ol className="text-custom-text-main/90 flex flex-col gap-3 list-decimal pl-5 text-sm font-light">
                    {exercise.instructions.map((step, idx) => (
                      <li key={idx} className="leading-relaxed pl-1 marker:text-indigo-400 marker:font-medium">
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
