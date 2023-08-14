import { addDoc, collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore/lite"
import { Contact } from "../types"
import { db } from "../db/firebase"

const fetchContacts = async () => {
    // get contacts collection
    const contactsCollection = collection(db, 'contacts')

    // make request to get current snapshot of collection
    const contactsSnapshot = await getDocs(contactsCollection)

    // get raw data for each item in snapshot and store in contacts list
    const contactsList: Contact[] = contactsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data() as Contact
    }))

    return contactsList
}

const fetchContact = async (id: string) => {
    const docRef = doc(db, 'contacts', id)

    return await getDoc(docRef)
}

const createContact = async (contact: Contact) => {
    // send request to firebase cloud firestore to add contact
    const docRef = await addDoc(collection(db, 'contacts'), contact)

    return docRef
}

const updateContact = async (contact: Contact) => {
        // use non-null assertion operator ('!') to enforce id is not undefined
        const id = contact.id!
        
        // send request to firebase cloud firestore to update contact
        await setDoc(doc(db, 'contacts', id), contact)
}

const contactsService = {
    fetchContacts,
    fetchContact,
    createContact,
    updateContact
}

export default contactsService