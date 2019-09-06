import React, { createContext, FunctionComponent, useContext, useEffect, useState } from 'react';

interface IInitialAuthState {
  accessToken: string | null;
  isLoggedIn: boolean;
  logOut: () => void;
}

interface IUserAuthProps {
  children: JSX.Element[] | JSX.Element;
}

const initialAuthState: IInitialAuthState = {
  accessToken: '',
  isLoggedIn: false,
  logOut: () => undefined,
};

const AuthContext = createContext(initialAuthState);

export const UserAuthProvider: FunctionComponent<IUserAuthProps> = (props: IUserAuthProps) => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('sd-token') || '');
  const [isLoggedIn, setLoggedInState] = useState(!!localStorage.getItem('sd-token'));

  useEffect(() => {
    if (!accessToken) {
      const token = new URLSearchParams(location.search).get('token');
      if (token) {
        localStorage.setItem('sd-token', token);
        setAccessToken(token);
        setLoggedInState(true);
      }
    }

    window.history.pushState({}, document.title, 'http://localhost:3000');
  }, [accessToken, isLoggedIn]);

  function logOut() {
    setAccessToken('');
    setLoggedInState(false);
    localStorage.removeItem('sd-token');
  }

  return <AuthContext.Provider value={{ accessToken, isLoggedIn, logOut }}>{props.children}</AuthContext.Provider>;
};

export const useAuthToken = () => useContext(AuthContext);
