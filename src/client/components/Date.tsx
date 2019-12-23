import React from 'react';
import { format, subDays, parseISO } from 'date-fns';

interface IButtonProps {
  endDate: string;
  startDate: string;
  handleStartDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEndDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DateSelector: React.FC<IButtonProps> = ({
  endDate,
  startDate,
  handleStartDateChange,
  handleEndDateChange,
}: IButtonProps) => {
  const today = format(new Date(), 'yyyy-MM-dd');
  return (
    <>
      <label htmlFor="startDate">From</label>
      <input
        type="date"
        id="startData"
        max={format(subDays(parseISO(startDate), 1), 'yyyy-MM-dd')}
        onChange={handleEndDateChange}
        value={endDate}
      />
      <label htmlFor="endData">To</label>
      <input type="date" id="endData" max={today} onChange={handleStartDateChange} value={startDate} />
    </>
  );
};

DateSelector.displayName = 'Date Selector';
