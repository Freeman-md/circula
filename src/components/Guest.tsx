import { ReactComponent as Logo } from "../assets/svgs/logo.svg"
import { ReactComponent as GoogleIcon } from '../assets/svgs/google-icon.svg'
import { signInWithGoogle } from "../lib/auth"

const Guest = () => {
    return <div className="h-screen flex flex-col space-y-6 items-center justify-center">
        <Logo className="w-80" />
        <h2 className="text-2xl text-primary text-center">Elevate Your Contacts with Simplicity and Sophistication!</h2>

        <div className="flex flex-wrap items-center justify-center">
        <button className='flex items-center justify-center py-3 px-5 space-x-2 rounded border' onClick={signInWithGoogle}> 
                    <GoogleIcon className='w-8' />
                    <span>Sign in with Google</span>
                </button>
        </div>
    </div>
}

export default Guest