import { collection, getDocs } from 'firebase/firestore/lite';
import { db } from '../../db/firebase';
import { AppDispatch } from '..';
import { setContacts } from './contactsSlice';

export const fetchContacts = () => {
    return async (dispatch: AppDispatch) => {
        // get contacts collection
        const contactsCollection = collection(db, 'contacts')

        // make request to get current snapshot of collection
        const contactsSnapshot = await getDocs(contactsCollection)
        
        // get raw data for each item in snapshot and store in contacts list
        const contactsList = contactsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))

        dispatch(setContacts({
            contacts: contactsList
        }))
    }
}

export const addContact = () => {
    return async () => {
        console.log('adding contact')
        // send request to firebase cloud firestore to add contacts
    }
}