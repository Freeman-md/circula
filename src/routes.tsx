import { createBrowserRouter } from 'react-router-dom'
import DefaultLayout from './layouts/default'
import Home from './pages/Home'
import CreateContact from './pages/CreateContact'
import Error from './layouts/error'

const router = createBrowserRouter([
    {
        element: <DefaultLayout />,
        errorElement: <Error />,
        children: [
            {
                path: '/',
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