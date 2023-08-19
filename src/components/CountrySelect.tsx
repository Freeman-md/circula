import { getCountries, getCountryCallingCode } from 'react-phone-number-input/input';
import en from 'react-phone-number-input/locale/en.json';
import 'react-phone-number-input/style.css';

const CountrySelect = ({ value = '', onChange, ...rest }: { value?: string, onChange: Function }) => (
    <select {...rest} value={value} onChange={(event) => onChange(event.target.value || undefined)}>
        <option value="">{en.ZZ}</option>
        {getCountries().map((country) => (
            <option key={country} value={country}>
                {en[country]} + {getCountryCallingCode(country)}
            </option>
        ))}
    </select>
);

export default CountrySelect