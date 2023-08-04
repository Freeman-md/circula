import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface ContactsState {
    contacts: Array<object>
}


const initialState: ContactsState = {
    contacts: []
}

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        setContacts: (state, action: PayloadAction<ContactsState>) => {
            state.contacts = action.payload.contacts
        }
    }
})

export const { setContacts } = contactsSlice.actions

export default contactsSlice