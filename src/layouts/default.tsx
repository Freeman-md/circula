import { Outlet } from 'react-router-dom'
import { useState } from 'react';

import ContactsSidebar from '../components/ContactsSidebar';
import { ReactComponent as Hamburger } from '../assets/svgs/bars-2.svg'
import { ReactComponent as UserCircle } from '../assets/svgs/user-circle.svg'
import { ReactComponent as GoogleIcon } from '../assets/svgs/google-icon.svg'
import Snackbar from '../components/Snackbar';
import Modal from '../components/Modal';
import { signInWithGoogle } from '../lib/auth';


const DefaultLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const toggleSidebarHandler = () => {
        setIsSidebarOpen(prevState => !prevState)
    }

    const toggleModalHandler = async () => {
        // open modal
        setIsModalOpen(prevState => !prevState)
    }

    let sidebarClasses: string = 'fixed z-30 md:static md:w-1/4 md:block h-screen bg-white shadow'


    return <div className='flex h-screen overflow-hidden relative'>
        <button onClick={toggleSidebarHandler} className='fixed z-20 right-4 bottom-4 w-10 h-10 rounded-full flex items-center justify-center bg-secondary/20 transition duration-200 hover:bg-secondary/30'>
            <Hamburger />
        </button>

        <button onClick={toggleModalHandler} className='fixed z-20 right-4 top-4 w-10 h-10 rounded-full flex items-center justify-center transition duration-200 text-gray-500 hover:text-black'>
            <UserCircle />
        </button>

        <ContactsSidebar classes={sidebarClasses} />

        <main className='w-full md:w-3/4 h-screen overflow-scroll container'>
            <Outlet />
        </main>

        <Snackbar />

        <Modal isOpen={isModalOpen} onClose={toggleModalHandler}>
            <div className='flex flex-col justify-center items-center pb-4'>
                <h2 className="text-2xl font-semibold mb-4 text-center">Sign in</h2>

                <button className='flex items-center justify-center py-3 px-5 space-x-2 rounded border' onClick={signInWithGoogle}> 
                    <GoogleIcon className='w-8' />
                    <span>Sign in with Google</span>
                </button>
            </div>
        </Modal>
    </div>
}

export default DefaultLayout