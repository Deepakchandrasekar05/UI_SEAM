import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = 'h-16' }) => {
  return (
    <svg className={className} viewBox="0 0 1200 400" xmlns="http://www.w3.org/2000/svg">
      {/* Concentric Circles */}
      <g transform="translate(200, 200)">
        {[160, 130, 100, 70, 40].map((radius, i) => (
          <circle
            key={i}
            cx="0"
            cy="0"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
          />
        ))}
      </g>

      {/* Circuit Board Pattern */}
      <g transform="translate(400, 150)">
        <rect width="100" height="100" fill="currentColor" />
        <path
          d="M 10,20 h 20 v 30 h 40 M 60,70 v -20 h 20"
          stroke="white"
          strokeWidth="4"
          fill="none"
        />
      </g>

      {/* SEAM Text */}
      <g transform="translate(520, 150)">
        <path
          d="M 0,0 h 400 v 100 h -400 z"
          fill="currentColor"
        />
        <text
          x="20"
          y="75"
          fill="white"
          fontFamily="monospace"
          fontSize="80"
          fontWeight="bold"
        >
          SEAM
        </text>
      </g>

      {/* Binary Rain Effect */}
      <g transform="translate(520, 260)">
        {Array.from({ length: 8 }).map((_, i) => (
          <text
            key={i}
            x={i * 50}
            y="0"
            fill="currentColor"
            fontSize="12"
            fontFamily="monospace"
          >
            {'10'.repeat(4)}
          </text>
        ))}
      </g>
    </svg>
  );
};