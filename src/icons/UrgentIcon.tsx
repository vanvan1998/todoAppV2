import React from 'react';

export const UrgentIcon = (props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      stroke='currentColor'
      fill='currentColor'
      strokeWidth='0'
      viewBox='0 0 24 24'
      height='1em'
      width='1em'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path fill='none' d='M0 0h24v24H0V0z'></path>
      <path d='m3.5 18.99 11 .01c.67 0 1.27-.33 1.63-.84L20.5 12l-4.37-6.16c-.36-.51-.96-.84-1.63-.84l-11 .01L8.34 12 3.5 18.99z'></path>
    </svg>
  );
};
