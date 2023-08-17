import { AppDispatch } from '..';
import contactService from '../../lib/firebase'


export const getContacts = () => {
    return async (dispatch: AppDispatch) => {
        await contactService.fetchContacts(dispatch)
    }
}