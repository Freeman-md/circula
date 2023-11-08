import { CountryCode } from 'libphonenumber-js/types';

export type Contact = {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    countryCode: CountryCode;
    phone: string;
    address: string;
    company: string;
    notes: string;
};

export interface IContact {
    id?: string;
    firstName: {
      value: string;
      visibility: boolean;
    };
    lastName: {
      value: string;
      visibility: boolean;
    };
    email: {
      value: string;
      visibility: boolean;
    };
    countryCode: {
      value: CountryCode;
      visibility: boolean;
    };
    phone: {
      value: string;
      visibility: boolean;
    };
    address: {
      value: string;
      visibility: boolean;
    };
    company: {
      value: string;
      visibility: boolean;
    };
    notes: {
      value: string;
      visibility: boolean;
    };
  }

export class ContactModel implements IContact {
    id?: string;
    firstName: {
        value: string;
        visibility: boolean;
    };
    lastName: {
        value: string;
        visibility: boolean;
    };
    email: {
        value: string;
        visibility: boolean;
    };
    countryCode: {
        value: CountryCode;
        visibility: boolean;
    };
    phone: {
        value: string;
        visibility: boolean;
    };
    address: {
        value: string;
        visibility: boolean;
    };
    company: {
        value: string;
        visibility: boolean;
    };
    notes: {
        value: string;
        visibility: boolean;
    };

    constructor(contact: Contact) {
        this.id = contact.id;
        this.firstName = {
            value: contact.firstName,
            visibility: true,
        };
        this.lastName = {
            value: contact.lastName,
            visibility: true,
        };
        this.email = {
            value: contact.email,
            visibility: true,
        };
        this.countryCode = {
            value: contact.countryCode,
            visibility: true,
        };
        this.phone = {
            value: contact.phone,
            visibility: true,
        };
        this.address = {
            value: contact.address,
            visibility: true,
        };
        this.company = {
            value: contact.company,
            visibility: true,
        };
        this.notes = {
            value: contact.notes,
            visibility: true,
        };
    }

    toJSON() {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            countryCode: this.countryCode,
            phone: this.phone,
            address: this.address,
            company: this.company,
            notes: this.notes,
        };
    }
}


export type User = {
    uid: string,
    displayName: string,
    email: string,
    photoURL: string,
}

export type GroupedContacts = {
    [key: string]: IContact[]
}

export type UseInputProps = {
    defaultValue?: string,
    validationLogic?: Function,
    errorMessage?: string,
    required?: boolean
}