import React, { createContext, useReducer } from 'react';
import { IState } from '../Interfaces';
import { initialState, reducer } from './Reducer';

export const Store = createContext<IState | any>(initialState);

export function StoreProvider({ children }: JSX.ElementChildrenAttribute): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>;
}
