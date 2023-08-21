import { createSlice } from "@reduxjs/toolkit";

enum SnackbarTypes {
    Error = 'error',
    Success = 'success',
    Warning = 'warning'
}

interface UIState {
    snackbar: {
        type: SnackbarTypes,
        content: string,
    }
}

const initialState: UIState = {
    snackbar: {
        type: SnackbarTypes.Success,
        content: ''
    }
}

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setSnackbar(state, { payload }) {
            state.snackbar.type = payload.snackbar.type
            state.snackbar.content = payload.snackbar.content
        },
        clearSnackbar(state) {
            state.snackbar.type = SnackbarTypes.Success
            state.snackbar.content = ''
        }
    }
})

export const { setSnackbar, clearSnackbar } = uiSlice.actions

export { SnackbarTypes }
export default uiSlice