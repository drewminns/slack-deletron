import * as React from 'react';
import { shallow } from 'enzyme';
import { Hello } from '../../../client/components/Hello';

test('Hello mounts properly', () => {
  const hello = shallow(<Hello compiler="typescript" framework="React" />);

  expect(hello.find('h1').text()).toEqual('Hello from typescript and React!');
  expect(hello).toMatchSnapshot();
});
