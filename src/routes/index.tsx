import { createBrowserRouter } from 'react-router-dom'
import DefaultLayout from '../layouts/default'
import Home from '../pages/Home'
import Create, { action as createAction } from '../pages/contacts/Create'
import ErrorPage from '../pages/Error'
import View, { loader as getContactLoader, action as deleteContactAction } from '../pages/contacts/View'
import Edit, { action as editContactAction } from '../pages/contacts/Edit'

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
                action: createAction,
            },
            {
                path: '/:id/',
                id: 'get-contact',
                loader: getContactLoader,
                children: [
                    {
                        index: true,
                        element: <View />,
                        action: deleteContactAction
                    },
                    {
                        path: 'edit',
                        element: <Edit />,
                        action: editContactAction
                    },
                ]
            }
        ]
    }
])

export default router