// components/FormPhoneNumberInput.tsx
import React from 'react';
import ToggleButton from './ToggleButton';
import PhoneNumberInput from './PhoneNumberInput';
import { CountryCode } from 'libphonenumber-js';

interface FormPhoneNumberInputProps {
    label: string;
    name: string;
    value: string;
    onChange: (value: string) => void;
    isValid: boolean;
    error: string | undefined;
    toggleVisibility?: (value: boolean) => void;
    visibility?: boolean;
    countryCode?: CountryCode;
    required?: boolean;
}

const FormPhoneNumberInput: React.FC<FormPhoneNumberInputProps> = ({
    label,
    name,
    value,
    onChange,
    isValid,
    error,
    toggleVisibility,
    visibility,
    countryCode = 'GB',
    required = true,
}) => {
    return (
        <div className="form-control">
            <label htmlFor="phone">{label} {required && <span className="text-red-500">*</span>}</label>
            <input type="hidden" name={`${name}_visibility`} value={visibility?.toString() || ''} />
            <PhoneNumberInput countryCode={countryCode} value={value} onChange={onChange} />
            {!isValid && error && <small className="text-red-500">{error}</small>}

            <div className="mt-2">
                {toggleVisibility && <ToggleButton initialVisibility={visibility || false} onToggle={toggleVisibility} />}
            </div>
        </div>
    );
};

export default FormPhoneNumberInput;
