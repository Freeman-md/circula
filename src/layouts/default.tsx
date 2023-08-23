import { Outlet } from 'react-router-dom'
import { useEffect } from 'react';

import ContactsSidebar from '../components/ContactsSidebar';
import { ReactComponent as Hamburger } from '../assets/svgs/bars-2.svg'
import { ReactComponent as SignOut } from '../assets/svgs/arrow-right-on-rectangle.svg'
import { useAppDispatch, useAppSelector } from '../hooks/useReduxHooks';
import { generateProfilePhoto } from '../utils';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/auth';
import { showSnackbar } from '../store/ui/uiActions';
import { SnackbarTypes, toggleSidebar } from '../store/ui/uiSlice';
import { resetUser } from '../store/userSlice';


const DefaultLayout = () => {
    const dispatch = useAppDispatch()
    const isSidebarOpen = useAppSelector(state => state.ui.sidebar.show)
    const user = useAppSelector(state => state.user.user)
    

    const [firstName, lastName] = user ? user?.displayName.split(' ') : []

    const profilePhotoUrl = user?.photoURL || generateProfilePhoto(firstName, lastName)

    let sidebarClasses: string = 'fixed z-30 md:w-1/4 md:block md:static h-screen bg-white shadow transition-transform duration-200 transform '

    !isSidebarOpen ? sidebarClasses += '-translate-x-full md:translate-x-0' : sidebarClasses += 'translate-x-0'

    const toggleSidebarHandler = () => {
        dispatch(toggleSidebar())
    }

    const logoutHandler = () => {
        signOut(auth)

        dispatch(resetUser())

        dispatch(showSnackbar({
            type: SnackbarTypes.Success,
            content: 'Logged out successfully!'
        }))
    }

    return <div className='flex h-screen overflow-hidden relative'>
        <button onClick={toggleSidebarHandler} className='md:hidden fixed z-20 right-4 bottom-4 w-10 h-10 rounded-full flex items-center justify-center bg-secondary/20 transition duration-200 hover:bg-secondary/30'>
            <Hamburger />
        </button>

        <div className='fixed z-20 right-4 top-4 flex items-center justify-center space-x-4 filter bg-white/30 backdrop-blur-md p-1'>
            <img className='w-8 h-8 rounded-full' src={profilePhotoUrl} alt={user?.displayName} />
            <span>Welcome, <strong>{user?.displayName || 'Visitor'}</strong></span>

            <button onClick={logoutHandler} title='Logout' className='w-10 h-10 rounded-full flex items-center justify-center bg-secondary/20 transition duration-200 hover:bg-secondary/30'>
                <SignOut />
            </button>
        </div>

        <ContactsSidebar classes={sidebarClasses} />

        <main className='w-full pt-10 md:w-3/4 h-screen overflow-scroll container'>
            <Outlet />
        </main>

        <footer className='fixed bottom-2 inset-x-0'>
            <p className='text-center text-sm'>
                Designed & Developed by <a className='underline text-base font-medium' href="https://freemancodz.netlify.app">Freemancodz</a>
            </p>
        </footer>
    </div>
}

export default DefaultLayout