import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Input } from '..';

describe('Test Input component', () => {
  test.only('should match its snapshot', async () => {
    const component = render(
      <Input
        title='email'
        value={'email'}
        onChange={jest.fn()}
        styles={{ marginBottom: 16, marginTop: 60 }}
        placeholder='Enter your email...'
      />
    );

    expect(component).toMatchSnapshot();
  });
});
