import { useEffect } from 'react';
import { RouterProvider, json } from 'react-router-dom'

import router from './routes';
import { useAppDispatch, useAppSelector } from './hooks/useReduxHooks';
import { getContacts } from './store/contacts/contactsActions';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/auth';
import { UsageModes, resetUser, setUser } from './store/userSlice';
import { showSnackbar } from './store/ui/uiActions';
import { SnackbarTypes } from './store/ui/uiSlice';

const App = () => {
  const dispatch = useAppDispatch()
  const usageMode = useAppSelector(state => state.user.mode)

  if (usageMode === UsageModes.Neutral) dispatch(getContacts())

  // get contacts
  useEffect(() => {
    // set up hook to listen for auth changes
    onAuthStateChanged(auth, user => {
      try {
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
      } catch (error: any) {
        dispatch(showSnackbar({
          type: SnackbarTypes.Error,
          content: 'An error has occurred'
        }))

        throw json({ message: error.message })
      }
    })
  }, [dispatch])

  return (
    <RouterProvider router={router} />
  );
}

export default App;
