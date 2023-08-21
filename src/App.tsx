import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom'

import router from './routes';
import { useAppDispatch } from './hooks/useReduxHooks';
import { getContacts } from './store/contacts/contactsActions';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/auth';
import { resetUser, setUser } from './store/userSlice';

const App = () => {
  const dispatch = useAppDispatch()

  // get contacts
  useEffect(() => {
    // set up hook to listen for auth changes
    onAuthStateChanged(auth, user => {
      if (user) {
        // user logged in
        dispatch(setUser({
          user: {
            id: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL
          }
        }))

        dispatch(getContacts())
      } else {
        // no one's logged in
        dispatch(
          resetUser()
        )
      }
    })
  }, [dispatch])

  return (
    <RouterProvider router={router} />
  );
}

export default App;
