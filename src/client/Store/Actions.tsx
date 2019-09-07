import { useContext } from 'react';
import { Types } from './Types';
import { Store } from './Store';

export function loginUserAction(payload: string) {
  const { dispatch } = useContext(Store);
  return dispatch({ type: Types.LOG_IN, payload });
}

export function logoutUserAction() {
  const { dispatch } = useContext(Store);
  return dispatch({ type: Types.LOG_OUT });
}
