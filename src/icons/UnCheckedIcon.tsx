import React from 'react';

export const UnCheckedIcon = (props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      stroke='currentColor'
      fill='currentColor'
      strokeWidth='0'
      version='1.1'
      viewBox='0 0 16 16'
      color='#188f10'
      height='18'
      width='18'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path d='M8 0c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zM8 14c-3.314 0-6-2.686-6-6s2.686-6 6-6c3.314 0 6 2.686 6 6s-2.686 6-6 6z'></path>
    </svg>
  );
};
