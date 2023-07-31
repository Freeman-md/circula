import { Link } from 'react-router-dom'

import Empty from "./Empty"
import { ReactComponent as PlusCircle } from '../assets/svgs/plus-circle.svg'

const ContactsEmpty = () => {
    return <div className="flex flex-col pt-20 pb-10 space-y-4 items-center justify-center overflow-scroll">
        <Empty message="You have no contacts" />
        <button className="btn">
            <PlusCircle className="w-8" />
            <Link to="/create">Add Contact</Link>
        </button>
    </div>
}

export default ContactsEmpty