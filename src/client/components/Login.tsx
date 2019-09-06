import * as React from 'react';
import { useAuthToken } from '../Hooks/UserAuthProvider';

export function Login() {
  const { isLoggedIn, logOut } = useAuthToken();

  return (
    <div>
      <p>{!isLoggedIn ? <a href="/api/auth/slack">Login</a> : <button onClick={() => logOut()}>Log Out</button>}</p>
    </div>
  );
}
