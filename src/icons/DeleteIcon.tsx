import React from 'react';

export const DeleteIcon = (props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      stroke='currentColor'
      fill='currentColor'
      strokeWidth='0'
      viewBox='0 0 24 24'
      color='black'
      height='22'
      width='22'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path fill='none' d='M0 0h24v24H0z'></path>
      <path fill='none' d='M0 0h24v24H0V0z'></path>
      <path d='M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z'></path>
    </svg>
  );
};