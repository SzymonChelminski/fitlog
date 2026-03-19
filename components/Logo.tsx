import React from 'react'
import { Dumbbell } from 'lucide-react'

interface logoProps {
  color: string;
  size: number;
}

export default function Logo({ color, size }: logoProps) {
  return (
    <a href="/">
      <Dumbbell color={color} size={size} />
    </a>
  )
}
