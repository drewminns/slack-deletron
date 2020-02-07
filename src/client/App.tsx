import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';

import { IInitialState } from './store/reducers';
import { Navigation } from './Containers/Navigation';
import { Files } from './Containers/Files';
import { Form } from './Containers/Form';

export const App: React.FC = () => {
  const { isLoggedIn, fetchingChannels } = useSelector(
    (state: IInitialState) => ({
      isLoggedIn: state.user.loggedIn,
      fetchingChannels: state.channels.fetchingChannels,
    }),
    shallowEqual,
  );

  return (
    <div className="sd__wrapper">
      <Navigation />
      <div className="sd__content">
        <div className="flex-none px-4 py-2 bg-gray-900">{isLoggedIn && <Form />}</div>
        <div className="flex-3 px-4 py-2">{isLoggedIn && <Files />}</div>
      </div>
    </div>
  );
};

App.displayName = 'AppWrapper';
