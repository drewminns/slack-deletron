import { IState, IAction } from '../Interfaces';
import { Types } from './Types';

export const initialState: IState = {
  LOGGED_IN: false,
  USER_TOKEN: '',
  USER: {
    LOADING: false,
    PROFILE: {},
    ERROR: false,
  },
};

export function reducer(state: IState, action: IAction): IState {
  switch (action.type) {
    case Types.LOG_IN:
      return { ...state, LOGGED_IN: true, USER_TOKEN: action.payload };
    case Types.LOG_OUT:
      return { ...state, LOGGED_IN: false, USER_TOKEN: initialState.USER_TOKEN };
    case Types.FETCH_USER_SUCCESS:
      return { ...state, USER: { ...state.USER, PROFILE: action.payload } };
    default:
      return state;
  }
}
