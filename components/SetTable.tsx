'use client';

import React from 'react';
import { LuTimer } from 'react-icons/lu';
import { IoAddOutline } from 'react-icons/io5';
import { useState } from 'react';
import { Button } from './ui/button';

export default function SetTable() {
  const [defaultSetCount, setDefaultSetCount] = useState(3);

  return (
    <table className="w-full border-separate border-spacing-y-2 text-custom-text-main">
      <thead>
        <tr>
          <th className="font-normal">SET</th>
          <th className="font-normal">PREVIOUS</th>
          <th className="font-normal">KGS</th>
          <th className="font-normal">REPS</th>
        </tr>
      </thead>
      <tbody>
        <tr className="bg-custom-card-bg text-center">
          <td className="rounded-l-sm py-4">1</td>
          <td className="text-custom-text-muted py-4 italic">100 x 8</td>
          <td className="py-4">100</td>
          <td className="rounded-r-sm py-4">8</td>
        </tr>
        <tr className="bg-custom-card-bg text-center">
          <td className="rounded-l-sm py-4">2</td>
          <td className="text-custom-text-muted py-4 italic">100 x 8</td>
          <td className="py-4">100</td>
          <td className="rounded-r-sm py-4">8</td>
        </tr>
        <tr className="bg-custom-card-bg text-center">
          <td className="rounded-l-sm py-4">3</td>
          <td className="text-custom-text-muted py-4 italic">100 x 8</td>
          <td className="py-4">100</td>
          <td className="rounded-r-sm py-4">8</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th colSpan={4} className="py-4">
            <div className="flex justify-center gap-3">
              <Button className="border-custom-text-muted/15 border p-4">
                <p className="flex items-center gap-2">
                  <LuTimer className="text-custom-secondary size-5" />
                  ADD 90S BREAK
                </p>
              </Button>
              <Button className="border-custom-text-muted/15 border p-4">
                <p className="flex items-center gap-2">
                  <IoAddOutline className="text-custom-text-muted size-5" />
                  ADD SET
                </p>
              </Button>
            </div>
          </th>
        </tr>
      </tfoot>
    </table>
  );
}
