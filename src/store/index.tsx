import { configureStore } from '@reduxjs/toolkit'
import contactsSlice from './contacts/contactsSlice'

export const store = configureStore({
    reducer: {
        contacts: contactsSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch