interface logoProps {
  size: number;
  isText: boolean;
}

export default function Logo({ size, isText }: logoProps) {
  return (
    <a href="/" className='flex items-center gap-1'>
    <svg 
      width={size}
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect 
        x="3" 
        y="11" 
        width="18" 
        height="2" 
        rx="1" 
        fill="#4f46e5"
      />
      
      <rect 
        x="6" 
        y="5" 
        width="2" 
        height="14" 
        rx="1" 
        fill="#4f46e5"
      />
      <rect 
        x="2" 
        y="7" 
        width="2" 
        height="10" 
        rx="1" 
        fill="#4f46e5" 
        opacity="0.8"
      />
      
      <rect 
        x="16" 
        y="5" 
        width="2" 
        height="14" 
        rx="1" 
        fill="#4f46e5"
      />
      <rect 
        x="20" 
        y="7" 
        width="2" 
        height="10" 
        rx="1" 
        fill="#4f46e5" 
        opacity="0.8"
      />
    </svg>
      {isText ? <h1 className='text-white text-2xl font-medium'>Fitlog</h1> : ""}
    </a>
  )
}
