import React from 'react';
import { render } from '@testing-library/react';
import { Login } from '../Login';
import RootLayout from '../../../app/layout';

describe('SponsorPaneV2', () => {
  it('renders SponsorPaneV2 with desktop view', () => {
    const component = render(
      <RootLayout>
        <Login />
      </RootLayout>
    );
    expect(component).toMatchSnapshot();
  });
});
