import React from 'react'
import Logo from './Logo'

export default function Navbar() {
  return (
    <nav className='bg-primary'>
      <Logo
        size={10}
        color='#4f46e5'
      />
    </nav>
  )
}
