import { Outlet } from 'react-router-dom'
import { useState } from 'react';

import ContactsSidebar from '../components/ContactsSidebar';
import { ReactComponent as Hamburger } from '../assets/svgs/bars-2.svg'
import { ReactComponent as SignOut } from '../assets/svgs/arrow-right-on-rectangle.svg'
import Snackbar from '../components/Snackbar';
import { useAppSelector } from '../hooks/useReduxHooks';
import { generateProfilePhoto } from '../utils';


const DefaultLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const user = useAppSelector(state => state.user.user)

    const [ firstName, lastName ] = user ? user?.displayName.split(' ') : []

    const profilePhotoUrl = user?.photoURL || generateProfilePhoto(firstName, lastName)

    const toggleSidebarHandler = () => {
        setIsSidebarOpen(prevState => !prevState)
    }

    let sidebarClasses: string = 'fixed z-30 md:static md:w-1/4 md:block h-screen bg-white shadow'


    return <div className='flex h-screen overflow-hidden relative'>
        <button onClick={toggleSidebarHandler} className='fixed z-20 right-4 bottom-4 w-10 h-10 rounded-full flex items-center justify-center bg-secondary/20 transition duration-200 hover:bg-secondary/30'>
            <Hamburger />
        </button>

        <div className='fixed z-20 right-4 top-4 flex items-center justify-center space-x-4'>
            <img className='w-8 h-8 rounded-full' src={profilePhotoUrl} alt={user?.displayName} />
            <span>Welcome, <strong>{user?.displayName}</strong></span>

            <button title='Logout' className='w-10 h-10 rounded-full flex items-center justify-center bg-secondary/20 transition duration-200 hover:bg-secondary/30'>
                <SignOut />
            </button>
        </div>

        <ContactsSidebar classes={sidebarClasses} />

        <main className='w-full md:w-3/4 h-screen overflow-scroll container'>
            <Outlet />
        </main>

        <Snackbar />
    </div>
}

export default DefaultLayout