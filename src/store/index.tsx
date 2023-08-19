import { configureStore } from '@reduxjs/toolkit'
import contactsSlice from './contacts/contactsSlice'
import uiSlice from './ui/uiSlice'

export const store = configureStore({
    reducer: {
        contacts: contactsSlice.reducer,
        ui: uiSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch