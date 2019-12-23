import { Action, ActionTypes } from '../actions';
import { format, subDays } from 'date-fns';

const date = new Date();

export interface IFormState {
  startDate: string;
  endDate: string;
}

const initialFormState: IFormState = {
  startDate: format(date, 'yyyy-MM-dd'),
  endDate: format(subDays(date, 30), 'yyyy-MM-dd'),
};

export const formReducer = (state: IFormState = initialFormState, action: Action): IFormState => {
  switch (action.type) {
    case ActionTypes.setStartDate:
      return { ...state, startDate: action.payload };
    case ActionTypes.setEndDate:
      return { ...state, endDate: action.payload };
    default:
      return state;
  }
};
