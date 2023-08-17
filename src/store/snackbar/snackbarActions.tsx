import { AppDispatch } from ".."
import { SnackbarTypes, clearSnackbar, setSnackbar } from "./snackbarSlice"

export const showSnackbar = ({ type, content } : { type: SnackbarTypes, content: string }) => {
    return async (dispatch: AppDispatch) => {
        dispatch(setSnackbar({
            type,
            content
        }))

        setTimeout(() => {
            dispatch(clearSnackbar());
          }, 3000);
    }
}