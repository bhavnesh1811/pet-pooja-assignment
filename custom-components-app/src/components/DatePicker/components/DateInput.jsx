import React from 'react';
import { formatDate } from '../utils/datePickerUtils';
import '../styles/datePickerStyles.css';

const DateInput = ({ label, value, onChange, min, max, style }) => {
  return (
    <div className="date-input-container">
      <label className="date-input-label">{label}</label>
      <input
        type="date"
        value={formatDate(value)}
        onChange={(e) => {
          const date = new Date(e.target.value);
          onChange(date);
        }}
        min={min ? formatDate(min) : undefined}
        max={max ? formatDate(max) : undefined}
        className="date-input"
        style={style}
      />
    </div>
  );
};

export default DateInput;