import { Outlet } from 'react-router-dom'

import Header from '../components/Layout/Header';
import Sidebar from '../components/Layout/Sidebar';

const DefaultLayout = () => {
    return <div className='flex h-screen overflow-hidden'>
        <Sidebar classes='w-1/4 h-screen' />
        <main className='w-3/4 h-screen overflow-scroll'>
            <Outlet />
        </main>
    </div>
}

export default DefaultLayout