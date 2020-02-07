import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { loginUser, logoutUser, IInitialState } from '../store';

export const LoginButton: React.FC = () => {
  return (
    <a href="/api/auth/slack" className="bg-purple-700 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded">
      Login
    </a>
  );
};

LoginButton.displayName = 'LoginButton';

export interface IUserDisplayProps {
  name: string;
  avatar: string;
}

export const UserDisplay: React.FC<IUserDisplayProps> = ({ name, avatar }: IUserDisplayProps) => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center flex-shrink-0 text-white ml-6">
      <img className="w-12 h-12 rounded mr-3" src={avatar} alt={`Avatar of ${name}`} />
      <p className="text-base">{name}</p>
      <button
        onClick={() => dispatch(logoutUser())}
        className="bg-purple-700 hover:bg-purple-600 text-white-800 font-semibold py-2 px-4 rounded ml-6"
      >
        Logout
      </button>
    </div>
  );
};

UserDisplay.displayName = 'UserDisplay';

export const Navigation: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, name, avatar } = useSelector(
    (state: IInitialState) => ({
      isLoggedIn: state.user.loggedIn,
      name: `${state.user.profile.first_name} ${state.user.profile.last_name}`,
      avatar: state.user.profile.avatar_72,
    }),
    shallowEqual,
  );

  useEffect(() => {
    const URLtoken = new URLSearchParams(location.search).get('token');
    const token = localStorage.getItem('sd-token');
    if (!isLoggedIn) {
      if (URLtoken) {
        dispatch(loginUser(URLtoken));
      } else if (token) {
        dispatch(loginUser(token));
      } else {
        dispatch(logoutUser());
      }
    }
  }, [isLoggedIn]);

  return (
    <nav className="flex items-center justify-between flex-wrap bg-black p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <h1 className="text-lg">Slack Deletron</h1>
      </div>
      {!isLoggedIn ? <LoginButton /> : <UserDisplay name={name} avatar={avatar} />}
    </nav>
  );
};

Navigation.displayName = 'Navigation';
