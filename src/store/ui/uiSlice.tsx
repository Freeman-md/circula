import { createSlice } from "@reduxjs/toolkit";

enum SnackbarTypes {
    Error = 'error',
    Success = 'success',
    Warning = 'warning'
}

type UIState = {
    snackbar: {
        type: SnackbarTypes,
        content: string,
    },
    sidebar: {
        show: boolean
    },
}

const initialState: UIState = {
    snackbar: {
        type: SnackbarTypes.Success,
        content: ''
    },
    sidebar: {
        show: false
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
        },
        toggleSidebar(state) {
            state.sidebar.show = !state.sidebar.show
        }
    }
})

export const { setSnackbar, clearSnackbar, toggleSidebar } = uiSlice.actions

export { SnackbarTypes }
export default uiSlice