import * as React from 'react';
import { Login } from '../../../client/Components/Login';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('components/Hello', () => {
  const MOCK = { compiler: 'TypeScript', framework: 'React' };
  xit('Hello mounts properly', () => {
    const { container } = render(<Login />);
    expect(container).toMatchSnapshot();
  });

  xit('Hello mounts properly', () => {
    const { getByTestId } = render(<Login />);
    expect(getByTestId('string-data')).toHaveTextContent(`Hello from ${MOCK.compiler} and ${MOCK.framework}!`);
  });
});
