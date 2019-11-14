import React from 'react';
import { Auth } from './Containers/Auth';
import { Files } from './Containers/Files';
import { Form } from './Containers/Form';

export const App: React.FC = () => {
  return (
    <>
      <Auth />
      <Form />
      <Files />
    </>
  );
};
