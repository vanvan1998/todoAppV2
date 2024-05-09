import React from 'react';
import { render } from '@testing-library/react';
import { SignIn } from '../SignIn';
import RootLayout from '../../../app/layout';

describe('SponsorPaneV2', () => {
  it('renders SponsorPaneV2 with desktop view', () => {
    const component = render(
      <RootLayout>
        <SignIn />
      </RootLayout>
    );
    expect(component).toMatchSnapshot();
  });
});
