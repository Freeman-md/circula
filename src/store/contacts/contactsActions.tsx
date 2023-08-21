import { AppDispatch } from '..';
import contactService from '../../lib/contact-service'


export const getContacts = () => {
    return async (dispatch: AppDispatch) => {
        await contactService.fetchContacts(dispatch)
    }
}