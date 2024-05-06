import React from 'react';

export const ExpandLessIcon = (props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      stroke='currentColor'
      fill='currentColor'
      strokeWidth='0'
      viewBox='0 0 24 24'
      color='black'
      height='20'
      width='20'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path fill='none' d='M0 0h24v24H0V0z'></path>
      <path d='M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14l-6-6z'></path>
    </svg>
  );
};
