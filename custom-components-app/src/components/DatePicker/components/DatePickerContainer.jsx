import React, { useState, useCallback, useEffect } from 'react';

import PresetButtons from './PresetButtons';
import CustomDateRange from './CustomDateRange';
import {
  getTodayDate,
  getYesterdayDate,
  getFirstDayOfMonth,
  getLastDayOfMonth
} from '../utils/datePickerUtils';
import '../styles/datePickerStyles.css';



const DatePickerContainer = ({
  onDateChange = () => {},
  style = {},
  presetStyle = {},
  fontSize = '14px',
  fontColor = '#333',
  backgroundColor = '#fff'
}) => {
  const [activePreset, setActivePreset] = useState('today');
  const [startDate, setStartDate] = useState(getTodayDate());
  const [endDate, setEndDate] = useState(getTodayDate());

  const handlePresetSelect = useCallback((preset) => {
    setActivePreset(preset);
    const today = getTodayDate();

    switch (preset) {
      case 'today':
        setStartDate(today);
        setEndDate(today);
        break;
      case 'yesterday':
        const yesterday = getYesterdayDate();
        setStartDate(yesterday);
        setEndDate(yesterday);
        break;
      case 'thisMonth':
        setStartDate(getFirstDayOfMonth(today));
        setEndDate(getLastDayOfMonth(today));
        break;
      case 'lastMonth':
        const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        setStartDate(getFirstDayOfMonth(lastMonth));
        setEndDate(getLastDayOfMonth(lastMonth));
        break;
      case 'customRange':
        // Keep current dates when switching to custom
        break;
      default:
        break;
    }
  }, []);

  const handleDateChange = useCallback(() => {
    onDateChange({ startDate, endDate });
  }, [startDate, endDate, onDateChange]);

  useEffect(() => {
    handleDateChange();
  }, [handleDateChange]);

  const containerStyle = {
    fontSize,
    color: fontColor,
    backgroundColor,
    ...style
  };

  return (
    <div className="date-picker-container" style={containerStyle}>
      <PresetButtons
        onSelect={handlePresetSelect}
        activePreset={activePreset}
        style={presetStyle}
      />
      {activePreset === 'customRange' && (
        <CustomDateRange
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          style={style}
        />
      )}
    </div>
  );
};

export default DatePickerContainer;