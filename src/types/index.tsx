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

    constructor(contact: IContact) {
        this.id = contact.id;
        this.firstName = contact.firstName;
        this.lastName = contact.lastName;
        this.email = contact.email;
        this.countryCode = contact.countryCode;
        this.phone = contact.phone;
        this.address = contact.address;
        this.company = contact.company;
        this.notes = contact.notes;
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

    static fromJSON(jsonData: Contact): IContact {
        const contact: IContact = {
          id: jsonData?.id, 
          firstName: {
            value: jsonData.firstName || '',
            visibility: true,
          },
          lastName: {
            value: jsonData.lastName || '',
            visibility: true,
          },
          email: {
            value: jsonData.email || '',
            visibility: true,
          },
          countryCode: {
            value: jsonData.countryCode || '' as CountryCode,
            visibility: true,
          },
          phone: {
            value: jsonData.phone || '',
            visibility: true,
          },
          company: {
            value: jsonData.company || '',
            visibility: true,
          },
          address: {
            value: jsonData.address || '',
            visibility: true,
          },
          notes: {
            value: jsonData.notes || '',
            visibility: true,
          },
        };
    
        return contact;
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