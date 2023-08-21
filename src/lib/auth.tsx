import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app as firebaseApp } from '../db/firebase';

export const auth = getAuth(firebaseApp)

const provider = new GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })

export const signInWithGoogle = () => signInWithPopup(auth, provider)