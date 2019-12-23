import { Dispatch } from 'redux';
import { ActionTypes } from './types';

export interface ISetDate {
  type: ActionTypes.setStartDate | ActionTypes.setEndDate;
  payload: string;
}

export const changeDate = (date: string, isStart: false): ISetDate => {
  return {
    type: isStart ? ActionTypes.setStartDate : ActionTypes.setEndDate,
    payload: date,
  };
};
