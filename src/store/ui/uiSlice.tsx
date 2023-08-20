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
    },
    modal: {
        show: boolean,
        qrcodeValue: string
    }
}

const initialState: UIState = {
    snackbar: {
        type: SnackbarTypes.Success,
        content: ''
    },
    modal: {
        show: false,
        qrcodeValue: '',
    }
}

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setSnackbar(state, { payload, type }) {
            state.snackbar.type = payload.snackbar.type
            state.snackbar.content = payload.snackbar.content
        },
        clearSnackbar(state) {
            state.snackbar.type = SnackbarTypes.Success
            state.snackbar.content = ''
        },
        toggleModal(state, { payload }) {
            state.modal.show = !state.modal.show
            state.modal.qrcodeValue = payload.modal.qrcodeValue ?? ''

        }
    }
})

export const { setSnackbar, clearSnackbar, toggleModal } = uiSlice.actions

export { SnackbarTypes }
export default uiSlice