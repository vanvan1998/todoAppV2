import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { DashBoardView } from '../DashBoardView';

jest.mock('@next/third-parties/google', () => {
  return {
    GoogleAnalytics: () => <>GoogleAnalytics</>
  };
});

jest.mock('src/hooks', () => {
  const originalModule = jest.requireActual('src/hooks');
  return {
    ...originalModule,
    useMediaQuery: jest
      .fn()
      .mockReturnValue({
        isMobile: true
      })
      .mockReturnValueOnce({ isMobile: false }),
    useNotification: jest.fn()
  };
});

jest.mock('src/contexts/AuthContext', () => {
  return {
    useAuth: jest.fn().mockReturnValue({ currentUser: undefined, signIn: jest.fn() })
  };
});

jest.mock('next/navigation', () => {
  return {
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn()
    })
  };
});

describe('DashBoardView', () => {
  it('renders DashBoardView with mobile view', () => {
    const component = render(<DashBoardView />);
    expect(component).toMatchSnapshot();
  });

  it('renders DashBoardView with desktop view', () => {
    const component = render(<DashBoardView />);

    const button = component.getByTestId('sort-by-button');
    fireEvent.click(button);

    const sortByOldestButton = component.getByTestId('sort-by-oldest-button');
    fireEvent.click(sortByOldestButton);

    fireEvent.click(button);
    const sortByNewestButton = component.getByTestId('sort-by-newest-button');
    fireEvent.click(sortByNewestButton);

    expect(component).toMatchSnapshot();
  });

  it('renders DashBoardView with search', () => {
    const component = render(<DashBoardView />);

    const input = screen.getByLabelText('Search');
    fireEvent.change(input, { target: { value: '123' } });
    fireEvent.change(input, { target: { value: '' } });
    expect(component).toMatchSnapshot();
  });
});
