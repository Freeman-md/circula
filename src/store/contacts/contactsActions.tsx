import { AppDispatch } from '..';
import contactService from '../../lib/contacts-service'


export const getContacts = () => {
    return (dispatch: AppDispatch) => {
        contactService.fetchContacts(dispatch)
    }
}