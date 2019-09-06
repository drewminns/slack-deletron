import React from 'react';
import { UserAuthProvider } from './Hooks/UserAuthProvider';
import { Login } from './Components/Login';

export function App() {
  return (
    <UserAuthProvider>
      <Login />
    </UserAuthProvider>
  );
}
