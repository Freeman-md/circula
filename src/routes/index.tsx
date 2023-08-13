import { createBrowserRouter } from 'react-router-dom'
import DefaultLayout from '../layouts/default'
import Home from '../pages/Home'
import Create from '../pages/contacts/Create'
import ErrorPage from '../pages/Error'
import View, { loader as viewContactLoader } from '../pages/contacts/View'

const router = createBrowserRouter([
    {
        element: <DefaultLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/create',
                element: <Create />,
            },
            {
                path: '/:id',
                element: <View />,
                loader: viewContactLoader
            }
        ]
    }
])

export default router