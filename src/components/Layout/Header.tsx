import { ReactComponent as Logo } from "../../assets/svgs/logo.svg"

const Header = () => {
    return <header className="fixed top-0 inset-x-0 border-b-2 border-primary">
            <div className="container flex items-center justify-center py-4">
                <Logo className="w-40" />
            </div>
    </header>
}

export default Header