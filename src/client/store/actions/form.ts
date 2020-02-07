import { ActionTypes } from './types';

export interface ISetDate {
  type: ActionTypes.setStartDate | ActionTypes.setEndDate;
  payload: string;
}

export const changeDate = (date: string, isStart: boolean): ISetDate => {
  return {
    type: isStart ? ActionTypes.setStartDate : ActionTypes.setEndDate,
    payload: date,
  };
};

export interface IUpdateType {
  type: ActionTypes.updateTypes;
  payload: string[];
}

export const updateTypes = (value: string, currentList: string[]): IUpdateType => {
  let updatedList = [...currentList];
  if (updatedList.includes(value)) {
    updatedList = updatedList.filter(val => val !== value);
  } else {
    updatedList.push(value);
  }

  return {
    type: ActionTypes.updateTypes,
    payload: updatedList,
  };
};
