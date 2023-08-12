import { addDoc, collection, getDocs } from 'firebase/firestore/lite';
import { db } from '../../db/firebase';
import { AppDispatch } from '..';
import { setContacts } from './contactsSlice';
import { Contact } from '../../types';

export const getContacts = () => {
    return async (dispatch: AppDispatch) => {
        // get contacts collection
        const contactsCollection = collection(db, 'contacts')

        // make request to get current snapshot of collection
        const contactsSnapshot = await getDocs(contactsCollection)

        // get raw data for each item in snapshot and store in contacts list
        const contactsList: Contact[] = contactsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data() as Contact
        }))

        dispatch(setContacts({
            contacts: contactsList
        }))
    }
}

export const createContact = (contact: Contact) => {
    return async (dispatch: AppDispatch) => {
        // send request to firebase cloud firestore to add contact
        const docRef = await addDoc(collection(db, 'contacts'), contact)

        console.log('Contact added with ID: ' + docRef.id)
    }
}