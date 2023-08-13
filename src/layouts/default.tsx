import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react';

import ContactsSidebar from '../components/ContactsSidebar';
import { getContacts } from '../store/contacts/contactsActions';
import { useAppDispatch } from '../hooks/useReduxHooks';
import { ReactComponent as Hamburger } from '../assets/svgs/bars-2.svg'

const DefaultLayout = () => {
    const dispatch = useAppDispatch()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    useEffect(() => {
        dispatch(getContacts())
    }, [dispatch])

    const toggleSidebarHandler = () => {
        setIsSidebarOpen(prevState => !prevState)
    }

    let sidebarClasses: string = 'fixed z-50 md:static md:w-1/4 md:block h-screen bg-white shadow'


    return <div className='flex h-screen overflow-hidden relative'>
        <button onClick={toggleSidebarHandler} className='fixed z-50 right-4 top-4'>
            <Hamburger />
        </button>
        <ContactsSidebar classes={sidebarClasses} />
        <main className='w-full md:w-3/4 h-screen overflow-scroll container'>
            <Outlet />
        </main>
    </div>
}

export default DefaultLayout