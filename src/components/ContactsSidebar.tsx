import { useState, useEffect, ChangeEvent } from 'react'

import { useAppDispatch, useAppSelector } from '../hooks/useReduxHooks'
import ContactsPane from './ContactsPane'
import SearchPane from './SearchPane'
import { IContact, GroupedContacts } from '../types'
import { groupAndSortContactsByFirstLetter } from '../utils'
import { Link } from 'react-router-dom'
import { toggleSidebar } from '../store/ui/uiSlice'

type ContactsSidebarProps = {
    classes?: string
}

const ContactsSidebar = ({ classes = 'h-screen w-1/4' }: ContactsSidebarProps) => {
    const [searchText, setSearchText] = useState<string>('')
    const [filteredContacts, setFilteredContacts] = useState<GroupedContacts>({})
    const dispatch = useAppDispatch()

    const contacts: IContact[] = useAppSelector(state => state.contacts.contacts)

    const onSearchTextChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value?.toLowerCase().trim())
    }

    const toggleSidebarHandler = () => {
        dispatch(toggleSidebar())
    }

    useEffect(() => {
        setFilteredContacts(() =>
            groupAndSortContactsByFirstLetter(
                contacts
                    .filter(contact => contact?.firstName.value.toLowerCase().includes(searchText) || contact?.lastName.value.toLowerCase().includes(searchText))
            )
        )
    }, [searchText, contacts])

    return <div id='contacts-sidebar' className={[classes, 'space-y-4 pt-6 pb-2'].join(' ')}>
        <div className='container flex justify-between items-center space-x-4'>
            <Link to="/" className='text-xl font-semibold hover:underline' onClick={toggleSidebarHandler}>Contacts</Link>
            <Link to="/create" className='btn btn-sm' onClick={toggleSidebarHandler}>+ New</Link>
        </div>
        <SearchPane onChangeHandler={onSearchTextChangeHandler} />
        <ContactsPane contacts={filteredContacts} searchText={searchText} />
    </div>
}

export default ContactsSidebar