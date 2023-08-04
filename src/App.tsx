import { RouterProvider } from 'react-router-dom'
import { useEffect } from 'react';
import { useAppDispatch } from './hooks/useReduxHooks';

import router from './routes';
import { fetchContacts } from './store/contacts/contactsActions';

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchContacts())
  }, [dispatch])

  return (
      <RouterProvider router={router} />
  );
}

export default App;
