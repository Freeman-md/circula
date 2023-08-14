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