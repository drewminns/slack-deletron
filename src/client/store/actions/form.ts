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

export interface IUpdateType {
  type: ActionTypes.updateTypes;
  payload: string[];
}

export const updateTypes = (value: string, currentList: string[]): IUpdateType => {
  const updatedList = [...currentList];
  if (updatedList.includes(value)) {
    updatedList.splice(currentList.indexOf(value));
  } else {
    updatedList.push(value);
  }

  return {
    type: ActionTypes.updateTypes,
    payload: updatedList,
  };
};
