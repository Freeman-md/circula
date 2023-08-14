import { AppDispatch } from '..';
import { setContacts } from './contactsSlice';
import { Contact } from '../../types';
import contactService from '../../lib/firebase'


export const getContacts = () => {
    return async (dispatch: AppDispatch) => {
        const contactsList = await contactService.fetchContacts()

        dispatch(setContacts({
            contacts: contactsList
        }))
    }
}

export const createContact = (contact: Contact) => {
    return async (dispatch: AppDispatch) => {
        const docRef = await contactService.createContact(contact)

        console.log('Contact added with ID: ' + docRef.id)
    }
}

export const updateContact = (contact: Contact) => {
    return async (dispatch: AppDispatch) => {
        await contactService.updateContact(contact)

        console.log('Contact updated with ID: ' + contact.id)
    }
}