import { addDoc, collection, deleteDoc, doc, getDoc, query, setDoc, onSnapshot, QuerySnapshot } from "firebase/firestore"
import { Contact } from "../types"
import { db } from "../db/firebase"
import { AppDispatch } from "../store";
import { setContacts } from "../store/contacts/contactsSlice";
import { auth } from "./auth";

const authUserId = auth.currentUser?.uid
const collectionPath = `users/${authUserId}/contacts`

const fetchContacts = (dispatch: AppDispatch) => {
  // get contacts realtime
  const q = query(collection(db, collectionPath));

  const unsubscribe = onSnapshot(q, (querySnapshot: QuerySnapshot) => {
    const contacts: Contact[] = [];

    querySnapshot.forEach((doc) => {
      contacts.push({
        id: doc.id,
        ...doc.data() as Contact
      });
    });

    dispatch(setContacts({
      contacts
    }))
  });

  return unsubscribe;

};


const fetchContact = async (id: string) => {
  const docRef = doc(db, collectionPath, id)

  return await getDoc(docRef) // returns the contact object
}

const createContact = async (contact: Contact) => {
  // send request to firebase cloud firestore to add contact
  const docRef = await addDoc(collection(db, collectionPath), contact)

  return docRef
}

const updateContact = async (contact: Contact) => {
  // use non-null assertion operator ('!') to enforce id is not undefined
  const id = contact.id!

  // send request to firebase cloud firestore to update contact
  await setDoc(doc(db, collectionPath, id), contact)
}

const deleteContact = async (id: string) => {
  await deleteDoc(doc(db, collectionPath, id))
}

const contactsService = {
  fetchContacts,
  fetchContact,
  createContact,
  updateContact,
  deleteContact
}

export default contactsService