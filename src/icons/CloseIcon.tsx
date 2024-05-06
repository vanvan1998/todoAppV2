import React from 'react';

export const CloseIcon = (props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      stroke='currentColor'
      fill='currentColor'
      strokeWidth='0'
      viewBox='0 0 512 512'
      color='black'
      height='24'
      width='24'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        fill='none'
        strokeMiterlimit='10'
        strokeWidth='32'
        d='M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z'
      ></path>
      <path
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='32'
        d='M320 320L192 192m0 128l128-128'
      ></path>
    </svg>
  );
};
