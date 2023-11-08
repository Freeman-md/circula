import { useState, useEffect } from 'react'
import { CountryCode, E164Number } from 'libphonenumber-js/types';
import { parsePhoneNumber } from "libphonenumber-js";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import { lookupCountry } from '../lib/phone-input';

type PhoneNumberInputProps = {
    value?: E164Number,
    name?: string,
    onChange: (value: E164Number) => void,
    countryCode: CountryCode
};
  

const PhoneNumberInput = ({ value, name, onChange, countryCode = 'GB'} : PhoneNumberInputProps) => {
    const [country, setCountry] = useState<CountryCode>(countryCode);

    const parsedPhoneNumber = (parsePhoneNumber(value as string, country)).number

    const countryChangeHandler = (country: CountryCode) => {
        setCountry(prevState => {
            return country
        })
    }

    async function handleNavigator(pos: GeolocationPosition) {
        const { latitude, longitude } = pos.coords;

        const userCountryCode = await lookupCountry({ latitude, longitude });

        setCountry(userCountryCode || 'GB');
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(handleNavigator, () => console.warn('permission was rejected'));
    }, [])

    return <>
        {/* <CountrySelect value={country} onChange={setCountry} /> */}
        <input type="text" value={country || ''} readOnly name='country-code' hidden />
        <PhoneInput
            initialValueFormat="national"
            countryCallingCodeEditable={false} defaultCountry={country} value={parsedPhoneNumber} onCountryChange={countryChangeHandler} onChange={onChange} name="phone" />
    </>
}

export default PhoneNumberInput