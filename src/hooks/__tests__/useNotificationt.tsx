// import React from 'react';
// import { render, act } from '@testing-library/react';
// import { useNotification } from '../useNotification';

// describe('useNotification', () => {
//   beforeEach(() => {
//     jest.useFakeTimers();
//   });

//   afterEach(() => {
//     jest.clearAllTimers();
//     jest.useRealTimers();
//   });

//   it('renders useNotification with desktop view', () => {
//     const Notification = () => {
//       useNotification();
//       return <>test notification</>;
//     };
//     const component = render(<Notification />);
//     expect(component).toMatchSnapshot();
//   });
// });

import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { useFirebase } from '../useFirebase';

describe('useFirebase', () => {
  it('renders useFirebase with desktop view', () => {
    const { result } = renderHook(() => useFirebase());
    console.log(result.current);
  });
});
