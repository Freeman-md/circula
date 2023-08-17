import { createSlice } from "@reduxjs/toolkit";

enum SnackbarTypes {
    Error = 'error',
    Success = 'success',
    Warning = 'warning'
}

interface SnackbarState {
    type: SnackbarTypes,
    content: string,
}

const initialState: SnackbarState = {
    type: SnackbarTypes.Success,
    content: ''
}

const snackbarSlice = createSlice({
    name: "snackbar",
    initialState,
    reducers: {
        setSnackbar(state, { payload, type } : { payload: SnackbarState, type: string }) {
            state.type = payload.type
            state.content = payload.content
        },
        clearSnackbar(state) {
            state.type = SnackbarTypes.Success
            state.content = ''
        }
    }
})

export const { setSnackbar, clearSnackbar } = snackbarSlice.actions

export { SnackbarTypes }
export default snackbarSlice