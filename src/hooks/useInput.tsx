import { ChangeEvent, useReducer } from "react"

interface InputState {
    value: string,
    error: string,
    isValid: boolean,
}
interface InputAction {
    type: string,
    payload: string,
}

const useInput = (validationLogic: Function, errorMessage: string, required: boolean = true) => {
    const initialInputState: InputState = {
        value: '',
        error: '',
        isValid: !required // set input to valid at default if input is not required
    }

    const inputReducer = (state: InputState, action: InputAction) => {
        switch (action.type) {
            case 'INPUT':
                const value = action.payload
                let isInputValid: boolean = state.isValid
                
                // validate input only if it is required
                if (required) {
                    isInputValid = validationLogic(value)
                }

                return {
                    error: value && !isInputValid ? errorMessage : '',
                    isValid: isInputValid, 
                    value,
                }
            default:
                break;
        }

        return state
    }

    const [value, dispatch] = useReducer(inputReducer, initialInputState)

    const valueOnChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch({
            type: 'INPUT',
            payload: e.target.value
        })
    }

    const clearInput = () => dispatch({
        type: 'INPUT',
        payload: ''
    })

    return {
        valueOnChangeHandler,
        clearInput,
        state: value, // state object with properties value, isValid, and error
        validateInput: validationLogic
    }
}

export default useInput