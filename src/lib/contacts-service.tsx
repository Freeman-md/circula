import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  query,
  setDoc,
  onSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
import { Contact, ContactModel } from "../types";
import { db } from "../db/firebase";
import { AppDispatch } from "../store";
import { setContacts } from "../store/contacts/contactsSlice";
import { auth } from "./auth";

class ContactsService {
  static collectionPath = "";

  static getCollectionPath() {
    const authUserId = auth.currentUser?.uid;

    // store contacts in shared collection if no user is available (visitor mode)
    if (!authUserId) {
      return 'contacts'
    }

    return `users/${authUserId}/contacts`;
  }

  static fetchContacts(dispatch: AppDispatch) {
    this.collectionPath = this.getCollectionPath();
    const q = query(collection(db, this.collectionPath));

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot: QuerySnapshot) => {
        const contacts: Contact[] = [];

        querySnapshot.forEach((doc) => {
          contacts.push({
            id: doc.id,
            ...doc.data() as Contact,
          });
        });

        dispatch(setContacts({ contacts }));
      }
    );

    return unsubscribe;
  }

  static async fetchContact(id: string) {
    this.collectionPath = this.getCollectionPath();
    const docRef = doc(db, this.collectionPath, id);
    
    return await getDoc(docRef);
  }

  static async createContact(contact: Contact) {
    this.collectionPath = this.getCollectionPath();

    // extract contact data without ID from newly created contact as ID is undefined
    const { id, ...contactData } = (new ContactModel(contact)).toJSON()

    // save new document to firebase which automatically creates an ID for the document
    const docRef = await addDoc(collection(db, this.collectionPath), contactData);

    return docRef;
  }

  static async updateContact(contact: Contact) {
    this.collectionPath = this.getCollectionPath();
    const id = contact.id!;
    await setDoc(doc(db, this.collectionPath, id), contact);
  }

  static async deleteContact(id: string) {
    this.collectionPath = this.getCollectionPath();
    await deleteDoc(doc(db, this.collectionPath, id));
  }
}

export default ContactsService;
