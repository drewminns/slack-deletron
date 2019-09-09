import React from 'react';
import { Auth } from './Components/Auth';
import { Channels } from './Components/Channels';
import { Files } from './Components/Files';

export const App: React.FC = () => {
  return (
    <>
      <Auth />
      <Channels />
      <Files />
    </>
  );
};
