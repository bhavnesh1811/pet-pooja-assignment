import React from 'react';
import DateInput from './DateInput';
import '../styles/datePickerStyles.css';

const CustomDateRange = ({ startDate, endDate, onStartDateChange, onEndDateChange, style }) => {
  return (
    <div className="custom-range">
      <DateInput
        label="From"
        value={startDate}
        onChange={onStartDateChange}
        max={endDate}
        style={style}
      />
      <DateInput
        label="To"
        value={endDate}
        onChange={onEndDateChange}
        min={startDate}
        style={style}
      />
    </div>
  );
};

export default CustomDateRange;