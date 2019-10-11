import React from 'react';
import { Auth } from './Components/Auth';
import { Files } from './Components/Files';
import { Form } from './Components/Form';

export const App: React.FC = () => {
  return (
    <>
      <Auth />
      <Form />
      <Files />
    </>
  );
};
