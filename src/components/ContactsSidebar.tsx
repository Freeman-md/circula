import { useState, useEffect } from 'react'

import { useAppSelector } from '../hooks/useReduxHooks'
import ContactsPane from './ContactsPane'
import SearchPane from './SearchPane'
import { Contact } from '../types'

interface Props {
    classes?: string
}

const ContactsSidebar = ({ classes = 'h-screen w-1/4' }: Props) => {
    const [searchText, setSearchText] = useState<string>('')
    const [filteredContacts, setFilteredContacts] = useState<Contact[]>([])

    const contacts: Contact[] = useAppSelector(state => state.contacts.contacts)

    useEffect(() => {
        setFilteredContacts(() => {
            return contacts
                .filter(contact => contact.firstName.includes(searchText))
                .sort((a, b) => {
                    if (a.firstName > b.firstName) return 1
                    else if (a.firstName < b.firstName) return -1
                    else return 0
                })
        })
    }, [searchText, contacts])

    return <div className={[classes, 'container flex flex-col space-y-4 py-10'].join(' ')}>
        <SearchPane />
        <ContactsPane contacts={filteredContacts} />
    </div>
}

export default ContactsSidebar