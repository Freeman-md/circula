// components/FormPlacesAutoComplete.tsx
import React from 'react';
import ToggleButton from './ToggleButton';
import PlacesAutoComplete from './PlacesAutoComplete';

interface FormPlacesAutoCompleteProps {
    label: string,
  name: string;
  value: string;
  onChange: (value: string) => void;
  isValid: boolean;
  error: string | undefined;
  toggleVisibility?: (value: boolean) => void;
  visibility?: boolean;
  required?: boolean;
  types?: []
}

const FormPlacesAutoComplete: React.FC<FormPlacesAutoCompleteProps> = ({
    label,
  name,
  value,
  onChange,
  isValid,
  error,
  toggleVisibility,
  visibility,
  required = true,
  types = ['establishment'],
}) => {
  return (
    <div className="form-control">
      <label htmlFor={name}>{label} { required && <span className="text-red-500">*</span> }</label>
      <input type="hidden" name={`${name}_visibility`} value={visibility?.toString() || ''} />
      <PlacesAutoComplete name={name} value={value} onChange={onChange} types={types} />
                {
                    !isValid && error
                        ? <small className="text-red-500">{error}</small>
                        : <small>Powered by Google</small>
                }

      <div className="mt-2">
        {toggleVisibility && <ToggleButton initialVisibility={visibility || false} onToggle={toggleVisibility} />}
      </div>
    </div>
  );
};

export default FormPlacesAutoComplete;
