import React from 'react';
import { format, subDays, addDays, parseISO } from 'date-fns';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { IInitialState, changeDate } from '../store';

export const DateSelector: React.FC = () => {
  const dispatch = useDispatch();
  const { startDate, endDate } = useSelector(
    (state: IInitialState) => ({
      startDate: state.form.startDate,
      endDate: state.form.endDate,
    }),
    shallowEqual,
  );

  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>, start: boolean) {
    const { value } = e.target;
    dispatch(changeDate(value, start));
  }

  const today = format(new Date(), 'yyyy-MM-dd');
  return (
    <>
      <label htmlFor="startDate">From</label>
      <input
        type="date"
        id="enddate"
        max={format(subDays(parseISO(startDate), 1), 'yyyy-MM-dd')}
        onChange={e => handleDateChange(e, false)}
        value={endDate}
      />
      <label htmlFor="endData">To</label>
      <input
        type="date"
        id="startdate"
        max={today}
        min={format(addDays(parseISO(endDate), 1), 'yyyy-MM-dd')}
        onChange={e => handleDateChange(e, true)}
        value={startDate}
      />
    </>
  );
};

DateSelector.displayName = 'Date Selector';
