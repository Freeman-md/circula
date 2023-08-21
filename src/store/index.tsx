import { configureStore } from '@reduxjs/toolkit'
import contactsSlice from './contacts/contactsSlice'
import uiSlice from './ui/uiSlice'
import userSlice from './userSlice'

export const store = configureStore({
    reducer: {
        contacts: contactsSlice.reducer,
        ui: uiSlice.reducer,
        user: userSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch