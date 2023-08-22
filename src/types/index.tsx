import { CountryCode } from 'libphonenumber-js/types';
export type Contact = {
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

export type User = {
    uid: string,
    displayName: string,
    email: string,
    photoURL: string,
}

export type GroupedContacts = {
    [key: string]: Contact[]
}

export type UseInputProps = {
    defaultValue?: string, 
    validationLogic?: Function, 
    errorMessage?: string, 
    required?: boolean
}