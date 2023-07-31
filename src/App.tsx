import { RouterProvider } from 'react-router-dom'


import ContactsPane from './components/ContactsPane';
import router from './routes';

function App() {
  return (
    <RouterProvider  router={router}/>
  );
}

export default App;
