import { ChangeEvent, useReducer, useEffect } from "react"
import { E164Number } from 'libphonenumber-js/types';

interface InputState {
    value: string,
    error: string,
    isValid: boolean,
}
interface InputAction {
    type: string,
    payload: string,
}

type ValueChangeHandler = (value: string | E164Number) => void; // Common type for value change handlers
type EventChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; // Event handler type

const useInput = (defaultValue: string = '', validationLogic: Function = (value: string) => value.length !== 0, errorMessage: string = 'Invalid input', required: boolean = false) => {
    const initialInputState: InputState = {
        value: defaultValue,
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
                    error: !isInputValid ? errorMessage : '',
                    isValid: isInputValid,
                    value,
                }
            default:
                break;
        }

        return state
    }

    const [value, dispatch] = useReducer(inputReducer, initialInputState)

    useEffect(() => {
        if (!defaultValue) return

        dispatch({
            type: 'INPUT',
            payload: defaultValue
        })
    }, [defaultValue])

    const eventOnChangeHandler: EventChangeHandler = (e) => {
        dispatch({
            type: 'INPUT',
            payload: e.target.value
        })
    }

    const valueOnChangeHandler: ValueChangeHandler = (value) => {
        dispatch({
            type: 'INPUT',
            payload: value
        })
      };

    const clearInput = () => dispatch({
        type: 'INPUT',
        payload: ''
    })

    return {
        eventOnChangeHandler,
        valueOnChangeHandler,
        clearInput,
        state: value, // state object with properties value, isValid, and error
        validateInput: validationLogic
    }
}

export default useInput