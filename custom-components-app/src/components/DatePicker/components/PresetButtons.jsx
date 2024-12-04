import React from 'react';
import '../styles/datePickerStyles.css';

const PRESETS = [
  { id: 'today', label: 'Today' },
  { id: 'yesterday', label: 'Yesterday' },
  { id: 'thisMonth', label: 'This Month' },
  { id: 'lastMonth', label: 'Last Month' },
  { id: 'customRange', label: 'Custom Range' }
];

const PresetButtons = ({ onSelect, activePreset, style }) => {
  return (
    <div className="preset-buttons">
      {PRESETS.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => onSelect(id)}
          className={`preset-button ${activePreset === id ? 'active' : ''}`}
          style={style}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default PresetButtons;