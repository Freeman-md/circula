export interface Contact {
    id?: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    address: string,
    company: string,
    notes: string
}

export interface GroupedContacts {
    [key: string]: Contact[]
}