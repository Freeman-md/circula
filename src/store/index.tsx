import { configureStore } from '@reduxjs/toolkit'
import contactsSlice from './contacts/contactsSlice'
import snackbarSlice from './snackbar/snackbarSlice'

export const store = configureStore({
    reducer: {
        contacts: contactsSlice.reducer,
        snackbar: snackbarSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch