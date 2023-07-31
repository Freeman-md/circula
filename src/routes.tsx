import { createBrowserRouter } from 'react-router-dom'
import DefaultLayout from './layouts/default'
import Home from './pages/Home'
import CreateContact from './pages/CreateContact'

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path: '/create',
                element: <CreateContact />
            }
        ]
    }
])

export default router