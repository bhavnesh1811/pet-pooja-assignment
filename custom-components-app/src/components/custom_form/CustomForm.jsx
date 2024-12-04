import React, { useReducer } from 'react';
import styles from './Form.module.css';
const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD_VALUE':
      return {
        ...state,
        values: { ...state.values, [action.field]: action.value },
        touched: { ...state.touched, [action.field]: true }
      };
    case 'SET_FIELD_ERROR':
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.error }
      };
    case 'RESET_FORM':
      return {
        values: action.initialValues,
        errors: {},
        touched: {}
      };
    default:
      return state;
  }
};

// Validation rules
const validateField = (value, rules = {}) => {
  if (rules.required && !value) {
    return 'This field is required';
  }
  if (rules.minLength && value.length < rules.minLength) {
    return `Minimum length is ${rules.minLength} characters`;
  }
  if (rules.maxLength && value.length > rules.maxLength) {
    return `Maximum length is ${rules.maxLength} characters`;
  }
  if (rules.pattern && !new RegExp(rules.pattern).test(value)) {
    return rules.patternMessage || 'Invalid format';
  }
  return '';
};

const TextInput = ({ id, label, value, onChange, error, ...props }) => (
  <div className={styles.fieldGroup}>
    <label htmlFor={id} className={styles.label}>
      {label}
    </label>
    <input
      id={id}
      type="text"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      className={`${styles.input} ${error ? styles.error : ''}`}
      {...props}
    />
    {error && <ValidationMessage message={error} />}
  </div>
);

const TextArea = ({ id, label, value, onChange, error, ...props }) => (
  <div className={styles.fieldGroup}>
    <label htmlFor={id} className={styles.label}>
      {label}
    </label>
    <textarea
      id={id}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      className={`${styles.textarea} ${error ? styles.error : ''}`}
      {...props}
    />
    {error && <ValidationMessage message={error} />}
  </div>
);

const Select = ({ id, label, value, options = [], onChange, error, multiple, ...props }) => (
  <div className={styles.fieldGroup}>
    <label htmlFor={id} className={styles.label}>
      {label}
    </label>
    <select
      id={id}
      value={value || (multiple ? [] : '')}
      multiple={multiple}
      onChange={(e) => {
        if (multiple) {
          const values = Array.from(e.target.selectedOptions).map(option => option.value);
          onChange(values);
        } else {
          onChange(e.target.value);
        }
      }}
      className={`${styles.select} ${error ? styles.error : ''}`}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && <ValidationMessage message={error} />}
  </div>
);

const CheckboxGroup = ({ id, label, options = [], value = [], onChange, error }) => (
  <div className={styles.checkboxGroup}>
    <fieldset>
      <legend className={styles.label}>{label}</legend>
      {options.map((option) => (
        <div key={option.value} className={styles.checkboxLabel}>
          <input
            type="checkbox"
            id={`${id}-${option.value}`}
            checked={value.includes(option.value)}
            onChange={(e) => {
              const newValue = e.target.checked
                ? [...value, option.value]
                : value.filter((v) => v !== option.value);
              onChange(newValue);
            }}
            className={styles.checkbox}
          />
          <label htmlFor={`${id}-${option.value}`}>{option.label}</label>
        </div>
      ))}
    </fieldset>
    {error && <ValidationMessage message={error} />}
  </div>
);

const RadioGroup = ({ id, label, options = [], value, onChange, error }) => (
  <div className={styles.radioGroup}>
    <fieldset>
      <legend className={styles.label}>{label}</legend>
      {options.map((option) => (
        <div key={option.value} className={styles.radioLabel}>
          <input
            type="radio"
            id={`${id}-${option.value}`}
            name={id}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(e.target.value)}
            className={styles.radio}
          />
          <label htmlFor={`${id}-${option.value}`}>{option.label}</label>
        </div>
      ))}
    </fieldset>
    {error && <ValidationMessage message={error} />}
  </div>
);

const Switch = ({ id, label, value = false, onChange, error }) => (
  <div className={styles.switchContainer}>
    <label htmlFor={id} className={styles.label}>
      {label}
    </label>
    <button
      type="button"
      role="switch"
      aria-checked={value}
      id={id}
      onClick={() => onChange(!value)}
      className={`${styles.switch} ${value ? styles.switchActive : ''}`}
    >
      <span className={styles.slider} />
    </button>
    {error && <ValidationMessage message={error} />}
  </div>
);

const DateInput = ({ id, label, value, onChange, error, ...props }) => (
  <div className={styles.fieldGroup}>
    <label htmlFor={id} className={styles.label}>
      {label}
    </label>
    <input
      id={id}
      type="date"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      className={`${styles.input} ${error ? styles.error : ''}`}
      {...props}
    />
    {error && <ValidationMessage message={error} />}
  </div>
);

const Button = ({ children, variant = 'primary', ...props }) => {
  const buttonClass = variant === 'primary' ? styles.submitButton : styles.resetButton;
  
  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
};

const ValidationMessage = ({ message }) => (
  <p className={styles.errorMessage} role="alert">
    {message}
  </p>
);

const defaultConfig = {
  fields: {}
};

// Main Form Container Component
const CustomForm = ({ 
  config = defaultConfig, 
  onSubmit = () => {}, 
  initialValues = {} 
}) => {
  const [state, dispatch] = useReducer(formReducer, {
    values: initialValues,
    errors: {},
    touched: {}
  });

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.entries(config.fields || {}).forEach(([fieldName, fieldConfig]) => {
      const error = validateField(state.values[fieldName], fieldConfig.validation);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    Object.entries(newErrors).forEach(([field, error]) => {
      dispatch({ type: 'SET_FIELD_ERROR', field, error });
    });

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(state.values);
    }
  };

  const handleReset = () => {
    dispatch({ type: 'RESET_FORM', initialValues });
  };

  const renderField = (fieldName, fieldConfig) => {
    const commonProps = {
      id: fieldName,
      label: fieldConfig.label,
      value: state.values[fieldName] || '',
      onChange: (value) =>
        dispatch({ type: 'SET_FIELD_VALUE', field: fieldName, value }),
      error: state.touched[fieldName] ? state.errors[fieldName] : '',
      placeholder: fieldConfig.placeholder,
      ...fieldConfig.props
    };

    switch (fieldConfig.type) {
      case 'text':
        return <TextInput {...commonProps} />;
      case 'textarea':
        return <TextArea {...commonProps} />;
      case 'select':
        return <Select {...commonProps} options={fieldConfig.options} />;
      case 'checkbox':
        return <CheckboxGroup {...commonProps} options={fieldConfig.options} />;
      case 'radio':
        return <RadioGroup {...commonProps} options={fieldConfig.options} />;
      case 'switch':
        return <Switch {...commonProps} />;
      case 'date':
        return <DateInput {...commonProps} />;
      default:
        return null;
    }
  };

  if (!config?.fields || Object.keys(config.fields).length === 0) {
    return (
      <div className={styles.formContainer}>
        No form fields configured. Please provide a valid form configuration.
      </div>
    );
  }

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        {Object.entries(config.fields).map(([fieldName, fieldConfig]) => (
          <div key={fieldName}>{renderField(fieldName, fieldConfig)}</div>
        ))}
        <div className={styles.buttonGroup}>
          <Button type="submit" variant="primary">Submit</Button>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CustomForm;
