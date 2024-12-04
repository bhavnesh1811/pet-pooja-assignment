import React from 'react';
import CustomForm from './CustomForm';

const FormExample = () => {
  const formConfig = {
    fields: {
      name: {
        type: 'text',
        label: 'Name',
        placeholder: 'Enter your name',
        validation: {
          required: true
        }
      },
      email: {
        type: 'text',
        label: 'Email',
        placeholder: 'Enter your email',
        validation: {
          required: true,
          pattern: '^[^@]+@[^@]+\\.[^@]+$',
          patternMessage: 'Please enter a valid email'
        }
      },
      message: {
        type: 'textarea',
        label: 'Message',
        placeholder: 'Type your message here'
      }
    }
  };

  const handleSubmit = (values) => {
    console.log('Form submitted:', values);
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Contact Us</h2>
        <p>Fill out the form below to get in touch.</p>
      </div>
      <CustomForm 
        config={formConfig}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default FormExample;