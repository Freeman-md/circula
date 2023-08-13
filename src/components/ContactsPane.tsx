import ContactsEmpty from "./ContactsEmpty"
import { GroupedContacts } from "../types"
import ContactCard from "./ContactCard"

const ContactsPane = ({ contacts: groupedContacts }: { contacts: GroupedContacts }) => {
    
    return <div className="h-full overflow-scroll overflow-x-hidden">
        {
            !groupedContacts
                ? <ContactsEmpty />
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