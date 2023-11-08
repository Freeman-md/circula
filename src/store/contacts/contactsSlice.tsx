import { createSlice } from '@reduxjs/toolkit'
import { IContact } from '../../types'

type ContactsState = {
    contacts: IContact[]
}


const initialState: ContactsState = {
    contacts: []
}

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        setContacts: (state, { payload, type }: { payload: ContactsState, type: string }) => {
            state.contacts = payload.contacts
        }
    }
})

export const { setContacts } = contactsSlice.actions

export default contactsSlice