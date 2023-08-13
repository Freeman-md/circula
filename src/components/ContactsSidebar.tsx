import { useState, useEffect } from 'react'

import { useAppSelector } from '../hooks/useReduxHooks'
import ContactsPane from './ContactsPane'
import SearchPane from './SearchPane'
import { Contact, GroupedContacts } from '../types'
import { groupAndSortContactsByFirstLetter } from '../utils'

interface Props {
    classes?: string
}

const ContactsSidebar = ({ classes = 'h-screen w-1/4' }: Props) => {
    const [searchText, setSearchText] = useState<string>('')
    const [filteredContacts, setFilteredContacts] = useState<GroupedContacts>({})

    const contacts: Contact[] = useAppSelector(state => state.contacts.contacts)

    useEffect(() => {
        setFilteredContacts(() =>
            groupAndSortContactsByFirstLetter(
                contacts
                    .filter(contact => contact.firstName.includes(searchText))
            )
        )
    }, [searchText, contacts])

    return <div className={[classes, 'space-y-4 pt-10 pb-2'].join(' ')}>
        <SearchPane />
        <ContactsPane contacts={filteredContacts} />
    </div>
}

export default ContactsSidebar