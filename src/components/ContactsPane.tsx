import { Fragment } from "react"
import ContactsEmpty from "./ContactsEmpty"
import { Contact } from "../types"
import ContactCard from "./ContactCard"

const ContactsPane = ({ contacts }: { contacts: Contact[] }) => {
    return <Fragment>
        {
            !contacts
                ? <ContactsEmpty />
                : <div>
                    {
                        contacts.map(contact => <ContactCard key={contact.id} contact={contact} />)
                    }
                </div>
        }

    </Fragment>
}

export default ContactsPane