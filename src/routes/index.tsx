import { createBrowserRouter } from 'react-router-dom'
import DefaultLayout from '../layouts/default'
import Home from '../pages/Home'
import Create from '../pages/contacts/Create'
import ErrorPage from '../pages/Error'
import View, { loader as getContactLoader } from '../pages/contacts/View'
import Edit from '../pages/contacts/Edit'

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
                path: '/:id/',
                id: 'get-contact',
                loader: getContactLoader,
                children: [
                    {
                        index: true,
                        element: <View />,
                    },
                    {
                        path: 'edit',
                        element: <Edit /> 
                    }
                ]
            }
        ]
    }
])

export default router