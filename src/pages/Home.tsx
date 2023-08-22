import { ReactComponent as Logo } from "../assets/svgs/logo.svg"
import { ReactComponent as ViewFinder } from '../assets/svgs/viewfinder-circle.svg'
import { ReactComponent as UserPlus } from '../assets/svgs/user-plus.svg'
import { ReactComponent as QrCode } from '../assets/svgs/qr-code.svg'
import { Link } from "react-router-dom"
import { useAppDispatch } from "../hooks/useReduxHooks"
import { toggleSidebar } from "../store/ui/uiSlice"

const Home = () => {
    const dispatch = useAppDispatch()

    const toggleSidebarHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation(); // Prevent the click event from propagating to the window

        dispatch(toggleSidebar())
    }

    return <div className="h-screen flex flex-col space-y-6 items-center justify-center">
        <Logo className="w-80" />
        <h2 className="text-2xl text-primary text-center">Elevate Your Contacts with Simplicity and Sophistication!</h2>
        <div className="flex flex-wrap items-center justify-center">
            <button onClick={toggleSidebarHandler} className="w-28 h-28 sm:w-32 sm:h-32 flex flex-col items-center justify-center space-y-2 transition duration-200 bg-secondary/10 rounded-lg hover:bg-primary hover:text-white mr-10 mb-10">
                <ViewFinder className="w-6 sm:w-10" />
                <p className="text-sm px-2">View contacts</p>
            </button>

            <Link to="/create" className="w-28 h-28 sm:w-32 sm:h-32 flex flex-col items-center justify-center space-y-2 transition duration-200 bg-secondary/10 rounded-lg hover:bg-primary hover:text-white mr-10 mb-10">
                <UserPlus className="w-6 sm:w-10" />
                <p className="text-sm px-2">Create contact</p>
            </Link>

            <button className="w-28 h-28 sm:w-32 sm:h-32 flex flex-col items-center justify-center space-y-2 transition duration-200 bg-secondary/10 rounded-lg hover:bg-primary hover:text-white mr-10 mb-10">
                <QrCode className="w-6 sm:w-10" />
                <p className="text-sm px-2">Personal contact</p>
            </button>
        </div>
    </div>
}

export default Home