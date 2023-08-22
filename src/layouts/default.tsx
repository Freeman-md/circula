import { Outlet } from 'react-router-dom'
import { useState } from 'react';

import ContactsSidebar from '../components/ContactsSidebar';
import { ReactComponent as Hamburger } from '../assets/svgs/bars-2.svg'
import { ReactComponent as SignOut } from '../assets/svgs/arrow-right-on-rectangle.svg'
import { useAppDispatch, useAppSelector } from '../hooks/useReduxHooks';
import { generateProfilePhoto } from '../utils';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/auth';
import { showSnackbar } from '../store/ui/uiActions';
import { SnackbarTypes } from '../store/ui/uiSlice';


const DefaultLayout = () => {
    const dispatch = useAppDispatch()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const user = useAppSelector(state => state.user.user)

    const [ firstName, lastName ] = user ? user?.displayName.split(' ') : []

    const profilePhotoUrl = user?.photoURL || generateProfilePhoto(firstName, lastName)

    const toggleSidebarHandler = () => {
        setIsSidebarOpen(prevState => !prevState)
    }

    const logoutHandler = () => {
        signOut(auth)

        dispatch(showSnackbar({
            type: SnackbarTypes.Success,
            content: 'Logged out successfully!'
        }))
    }

    let sidebarClasses: string = 'fixed z-30 md:static md:w-1/4 md:block h-screen bg-white shadow'


    return <div className='flex h-screen overflow-hidden relative'>
        <button onClick={toggleSidebarHandler} className='fixed z-20 right-4 bottom-4 w-10 h-10 rounded-full flex items-center justify-center bg-secondary/20 transition duration-200 hover:bg-secondary/30'>
            <Hamburger />
        </button>

        <div className='fixed z-20 right-4 top-4 flex items-center justify-center space-x-4 filter bg-white/30 backdrop-blur-md p-1'>
            <img className='w-8 h-8 rounded-full' src={profilePhotoUrl} alt={user?.displayName} />
            <span>Welcome, <strong>{user?.displayName}</strong></span>

            <button onClick={logoutHandler} title='Logout' className='w-10 h-10 rounded-full flex items-center justify-center bg-secondary/20 transition duration-200 hover:bg-secondary/30'>
                <SignOut />
            </button>
        </div>

        <ContactsSidebar classes={sidebarClasses} />

        <main className='w-full md:w-3/4 h-screen overflow-scroll container'>
            <Outlet />
        </main>
    </div>
}

export default DefaultLayout