import React from 'react';

interface BerryIconProps {
  className?: string;
  size?: number;
}

export const BerryLogo: React.FC<BerryIconProps> = ({ className = 'w-9 h-9' }) => {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="berryGradient" x1="6" y1="10" x2="34" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F43F5E" />
            <stop offset="0.5" stopColor="#E11D48" />
            <stop offset="1" stopColor="#BE123C" />
          </linearGradient>
          <linearGradient id="leafGradient" x1="12" y1="2" x2="28" y2="12" gradientUnits="userSpaceOnUse">
            <stop stopColor="#34D399" />
            <stop offset="1" stopColor="#059669" />
          </linearGradient>
        </defs>

        {/* Strawberry / Berry Body */}
        <path
          d="M20 37C11.5 37 5 26.5 5 17C5 10.5 11 6.5 20 6.5C29 6.5 35 10.5 35 17C35 26.5 28.5 37 20 37Z"
          fill="url(#berryGradient)"
        />

        {/* Berry Seeds */}
        <circle cx="14" cy="15" r="1.3" fill="#FFF1F2" fillOpacity="0.85" />
        <circle cx="21" cy="14" r="1.3" fill="#FFF1F2" fillOpacity="0.85" />
        <circle cx="26" cy="18" r="1.2" fill="#FFF1F2" fillOpacity="0.85" />
        <circle cx="12" cy="21" r="1.2" fill="#FFF1F2" fillOpacity="0.85" />
        <circle cx="18" cy="22" r="1.4" fill="#FFF1F2" fillOpacity="0.85" />
        <circle cx="24" cy="25" r="1.2" fill="#FFF1F2" fillOpacity="0.85" />
        <circle cx="15" cy="28" r="1.1" fill="#FFF1F2" fillOpacity="0.85" />
        <circle cx="20" cy="30" r="1.1" fill="#FFF1F2" fillOpacity="0.85" />

        {/* Berry Leaf Crown */}
        <path
          d="M20 2C19 4.5 16.5 7.5 11 7.5C15 9.8 17.5 12 17.5 14C19 11 21 11 22.5 14C22.5 12 25 9.8 29 7.5C23.5 7.5 21 4.5 20 2Z"
          fill="url(#leafGradient)"
        />
      </svg>
    </div>
  );
};
