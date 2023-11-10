import { ReactComponent as Logo } from "../assets/svgs/logo.svg"
import { ReactComponent as GoogleIcon } from '../assets/svgs/google-icon.svg'
import { signInWithGoogle } from "../lib/auth"
import { useAppDispatch } from "../hooks/useReduxHooks"
import { setModeToVisitor } from "../store/userSlice"

const Guest = () => {
    const dispatch = useAppDispatch()

    const visitorModeHandler = async () => {
        await dispatch(setModeToVisitor())
    }

    return <div className="h-screen flex flex-col space-y-6 items-center justify-center">
        <Logo className="w-80" />

        <h2 className="text-2xl text-primary text-center">Elevate Your Contacts with Simplicity and Sophistication!</h2>

        <div className="flex flex-wrap items-center justify-center">
        <button className='flex items-center justify-center py-3 px-5 space-x-2 rounded border' onClick={signInWithGoogle}> 
                    <GoogleIcon className='w-8' />
                    <span>Sign in with Google</span>
                </button>
        </div>

        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative" role="alert">
        Explore features as a visitor – public contacts. Continue with Google for personal contacts, exclusively yours!
        </div>
        
        <button className="underline" onClick={visitorModeHandler}>Continue as a visitor</button>

        <footer className='fixed bottom-2 inset-x-0'>
            <p className='text-center text-sm'>
            Designed & Developed by <a className='underline text-base font-medium' href="https://freemancodz.netlify.app">Freemancodz</a>
            </p>
            </footer>
    </div>
}

export default Guest