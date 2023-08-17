import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react';

import ContactsSidebar from '../components/ContactsSidebar';
import { getContacts } from '../store/contacts/contactsActions';
import { useAppDispatch } from '../hooks/useReduxHooks';
import { ReactComponent as Hamburger } from '../assets/svgs/bars-2.svg'
import Snackbar from '../components/Snackbar';


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
        <button onClick={toggleSidebarHandler} className='fixed z-40 right-4 bottom-4 w-10 h-10 rounded-full flex items-center justify-center bg-secondary/20 transition duration-200 hover:bg-secondary/30'>
            <Hamburger />
        </button>

        <ContactsSidebar classes={sidebarClasses} />

        <main className='w-full md:w-3/4 h-screen overflow-scroll container'>
            <Outlet />
        </main>

        <Snackbar />
    </div>
}

export default DefaultLayout