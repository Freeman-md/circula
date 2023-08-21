import { CountryCode } from 'libphonenumber-js/types';
export interface Contact {
    id?: string,
    firstName: string,
    lastName: string,
    email: string,
    countryCode: CountryCode
    phone: string,
    address: string,
    company: string,
    notes: string
}

export interface User {
    uid: string,
    displayName: string,
    email: string,
    photoURL: string,
}

export interface GroupedContacts {
    [key: string]: Contact[]
}

export interface UseInputProps {
    defaultValue?: string, 
    validationLogic?: Function, 
    errorMessage?: string, 
    required?: boolean
}