import { useState, useEffect, ChangeEvent } from 'react'

import { useAppSelector } from '../hooks/useReduxHooks'
import ContactsPane from './ContactsPane'
import SearchPane from './SearchPane'
import { Contact, GroupedContacts } from '../types'
import { groupAndSortContactsByFirstLetter } from '../utils'
import { Link } from 'react-router-dom'

type ContactsSidebarProps = {
    classes?: string
}

const ContactsSidebar = ({ classes = 'h-screen w-1/4' }: ContactsSidebarProps) => {
    const [searchText, setSearchText] = useState<string>('')
    const [filteredContacts, setFilteredContacts] = useState<GroupedContacts>({})

    const contacts: Contact[] = useAppSelector(state => state.contacts.contacts)

    useEffect(() => {
        setFilteredContacts(() =>
            groupAndSortContactsByFirstLetter(
                contacts
                    .filter(contact => contact?.firstName.toLowerCase().includes(searchText) || contact?.lastName.toLowerCase().includes(searchText))
            )
        )
    }, [searchText, contacts])

    const onSearchTextChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value?.toLowerCase().trim())
    }

    return <div id='contacts-sidebar' className={[classes, 'space-y-4 pt-6 pb-2'].join(' ')}>
        <div className='container flex justify-between items-center space-x-4'>
            <Link to="/" className='text-xl font-semibold hover:underline'>Contacts</Link>
            <Link to="/create" className='btn btn-sm'>+ New</Link>
        </div>
        <SearchPane onChangeHandler={onSearchTextChangeHandler} />
        <ContactsPane contacts={filteredContacts} searchText={searchText} />
    </div>
}

export default ContactsSidebar