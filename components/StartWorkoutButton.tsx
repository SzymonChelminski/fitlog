'use client';

import React, { useState, useEffect } from 'react';
import { HiPlay, HiStop } from 'react-icons/hi';

export default function StartWorkoutButton() {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(0);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [animatePopup, setAnimatePopup] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && !showPopup) {
      interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, showPopup]);

  const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const secs = (totalSeconds % 60).toString().padStart(2, '0');

    if (hours > 0) {
      return `${Math.min(hours, 99).toString().padStart(2, '0')}:${mins}:${secs}`;
    }
    return `${mins}:${secs}`;
  };

  const handleToggle = () => {
    if (isActive) {
      setShowPopup(true);
      setTimeout(() => setAnimatePopup(true), 10);
    } else {
      setIsActive(true);
      setSeconds(0);
    }
  };

  const closePopup = () => {
    setAnimatePopup(false);
    setTimeout(() => {
      setShowPopup(false);
      setIsActive(false);
      setSeconds(0);
    }, 300);
  };

  return (
    <>
      <button
        onClick={handleToggle}
        className={`group flex h-14 w-44 items-center justify-center gap-3 rounded-full transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-custom-secondary active:scale-95 ${
          isActive
            ? 'bg-custom-background-dark text-custom-text-main border border-custom-border hover:border-red-500 hover:text-red-400'
            : 'bg-custom-primary text-white shadow-lg hover:brightness-110'
        }`}
      >
        {isActive ? (
          <HiStop className="size-6 shrink-0 transition-transform duration-300 group-hover:scale-110" />
        ) : (
          <HiPlay className="size-6 shrink-0 transition-transform duration-300 group-hover:scale-110" />
        )}
        <div className="flex h-10 w-16 flex-col items-start justify-center text-left">
          <span className="text-sm font-semibold tracking-wide leading-none">
            {isActive ? 'FINISH' : 'START'}
          </span>
          <span
            className={`text-xs font-medium text-gray-400 tabular-nums transition-all duration-300 ${
              isActive ? 'mt-1 max-h-4 opacity-100' : 'mt-0 max-h-0 opacity-0'
            }`}
          >
            {formatTime(seconds)}
          </span>
        </div>
      </button>

      {showPopup && (
        <div
          className={`fixed top-0 left-0 z-[100] flex h-screen w-screen items-center justify-center transition-all duration-300 ${
            animatePopup ? 'bg-black/60 backdrop-blur-sm' : 'bg-transparent backdrop-blur-none'
          }`}
        >
          <div
            className={`bg-custom-card-bg flex w-80 flex-col items-center gap-6 rounded-2xl border border-custom-border p-6 shadow-xl transition-all duration-300 transform ${
              animatePopup ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-20 scale-95 opacity-0'
            }`}
          >
            <h3 className="text-custom-text-main text-lg font-medium">
              Save this workout?
            </h3>
            <div className="flex w-full gap-4">
              <button
                onClick={closePopup}
                className="text-custom-text-main bg-custom-background-dark w-full rounded-xl border border-custom-border py-2 transition-colors hover:brightness-110"
              >
                No
              </button>
              <button
                onClick={closePopup}
                className="bg-custom-primary w-full rounded-xl py-2 text-white transition-all hover:brightness-110"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
