import { Outlet } from 'react-router-dom'
import { useEffect } from 'react';

import ContactsSidebar from '../components/ContactsSidebar';
import { getContacts } from '../store/contacts/contactsActions';
import { useAppDispatch } from '../hooks/useReduxHooks';

const DefaultLayout = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getContacts())
    }, [dispatch])

    return <div className='flex h-screen overflow-hidden'>
        <ContactsSidebar classes='w-1/4 h-screen' />
        <main className='w-3/4 h-screen overflow-scroll'>
            <Outlet />
        </main>
    </div>
}

export default DefaultLayout