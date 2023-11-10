// components/FormTextAreaInput.tsx
import React from 'react';
import ToggleButton from './ToggleButton';

interface FormTextAreaInputProps {
    label: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isValid: boolean;
  error: string | undefined;
  toggleVisibility?: (value: boolean) => void; 
  visibility?: boolean;
  rowNumber?: number;
  required?: boolean;
}

const FormTextAreaInput: React.FC<FormTextAreaInputProps> = ({
    label,
  name,
  value,
  onChange,
  isValid,
  error,
  toggleVisibility,
  visibility,
  rowNumber = 3,
  required = true
}) => {
  return (
    <div className="form-control col-span-2">
      <label htmlFor={name}>{label} { required && <span className="text-red-500">*</span> }</label>
      <input type="hidden" name={`${name}_visibility`} value={visibility?.toString() || ''} />
      <textarea rows={rowNumber} id={name} name={name} value={value} onChange={onChange} />
      {!isValid && error && <small className="text-red-500">{error}</small>}

      <div className="mt-2">
        {toggleVisibility && <ToggleButton initialVisibility={visibility || false} onToggle={toggleVisibility} />}
      </div>
    </div>
  );
};

export default FormTextAreaInput;
