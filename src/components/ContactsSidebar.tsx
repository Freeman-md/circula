import { useState, useEffect, ChangeEvent } from 'react'

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
                    .filter(contact => contact.firstName.toLowerCase().includes(searchText) || contact.lastName.toLowerCase().includes(searchText))
            )
        )
    }, [searchText, contacts])

    const onSearchTextChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value.toLowerCase().trim())
    }

    return <div className={[classes, 'space-y-4 pt-10 pb-2'].join(' ')}>
        <SearchPane onChangeHandler={onSearchTextChangeHandler} />
        <ContactsPane contacts={filteredContacts} searchText={searchText} />
    </div>
}

export default ContactsSidebar