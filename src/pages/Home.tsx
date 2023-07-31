import { ReactComponent as Logo } from "../assets/svgs/logo.svg"

const Home = () => {
    return <div className="h-screen flex flex-col space-y-6 items-center justify-center">
        <Logo className="w-80" />
        <h2 className="text-2xl text-primary">Elevate Your Contacts with Simplicity and Sophistication!</h2>
    </div>
}

export default Home