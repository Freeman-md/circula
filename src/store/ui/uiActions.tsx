import { AppDispatch } from ".."
import { SnackbarTypes, clearSnackbar, setSnackbar } from "./uiSlice"

export const showSnackbar = ({ type, content }: { type: SnackbarTypes, content: string }) => {
    return async (dispatch: AppDispatch) => {
        dispatch(setSnackbar({
            snackbar: {
                type,
                content
            }
        }))

        setTimeout(() => {
            dispatch(clearSnackbar());
        }, 3000);
    }
}