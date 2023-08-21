import { AppDispatch } from '..';
import ContactsService from '../../lib/contacts-service';


export const getContacts = () => {
    return (dispatch: AppDispatch) => {
        ContactsService.fetchContacts(dispatch)
    }
}