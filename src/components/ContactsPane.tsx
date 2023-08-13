import { Link } from 'react-router-dom'

import ContactsEmpty from "./ContactsEmpty"
import { GroupedContacts } from "../types"
import ContactCard from "./ContactCard"
import { isObjectEmpty } from "../utils"

import Empty from "./Empty"
import { ReactComponent as PlusCircle } from '../assets/svgs/plus-circle.svg'

const ContactsPane = ({ contacts: groupedContacts, searchText }: { contacts: GroupedContacts, searchText: string }) => {

    return <div className="h-full overflow-scroll overflow-x-hidden pb-10">
        {
            isObjectEmpty(groupedContacts)
                ? <div className="flex flex-col pt-20 pb-10 space-y-4 items-center justify-center overflow-scroll">
                    <Empty message={searchText ? `No search results for: ${searchText}` : 'You have no contacts'} />
                    <button className="btn">
                        <PlusCircle className="w-8" />
                        <Link to="/create">Add Contact</Link>
                    </button>
                </div>
                : Object.keys(groupedContacts)
                    .map(
                        group => <div className="space-y-2 pb-4 px-2" key={group}>
                            <p>{group}</p>
                            <hr />

                            {
                                groupedContacts[group].map(contact => <ContactCard key={contact.id} contact={contact} />)
                            }

                        </div>
                    )
        }

    </div>
}

export default ContactsPane