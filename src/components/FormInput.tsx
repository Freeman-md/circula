import React from 'react';
import ToggleButton from './ToggleButton';

interface FormInputProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isValid: boolean;
  error: string | undefined;
  toggleVisibility?: (value: boolean) => void;
  visibility?: boolean;
  required?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  isValid,
  error,
  toggleVisibility,
  visibility,
  required = true,
}) => {
  return (
    <div className="form-control">
      <label htmlFor={name}>
        {label} { required && <span className="text-red-500">*</span> }
      </label>
      <input type="hidden" name={`${name}_visibility`} value={visibility?.toString() || ''} />
      <input type={type} name={name} id={name} value={value} onChange={onChange} />
      {!isValid && error && <small className="text-red-500">{error}</small>}

      <div className="mt-2">
        {toggleVisibility && <ToggleButton initialVisibility={visibility || false} onToggle={toggleVisibility} />}
      </div>
    </div>
  );
};

export default FormInput;
