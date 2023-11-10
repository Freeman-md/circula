import { ChangeEvent, useReducer, useEffect } from "react"
import { E164Number } from 'libphonenumber-js/types';

type InputState = {
    value: string,
    visibility: boolean,
    error: string,
    isValid: boolean,
}
type InputAction = {
    type: string,
    payload: {
        value: string,
        visibility?: boolean,
    }
}

type ValueChangeHandler = (value: string | E164Number) => void; // Common type for value change handlers
type EventChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; // Event handler type

const useInput = (
    defaultValue: string = '',
    defaultVisibility: boolean = false,
    validationLogic: (value: string) => boolean = (value) => value.length !== 0,
    errorMessage: string = 'Invalid input',
    required: boolean = false
  ) => {
    const initialInputState: InputState = {
      value: defaultValue,
      visibility: defaultVisibility,
      error: '',
      isValid: !required,
    };
  
    const inputReducer = (state: InputState, action: InputAction) => {
      switch (action.type) {
        case 'INPUT':
          const value = action.payload.value;
          let isInputValid: boolean = state.isValid;
  
          if (required) {
            isInputValid = validationLogic(value);
          }
  
          return {
            ...state,
            error: !isInputValid ? errorMessage : '',
            isValid: isInputValid,
            value,
          };
        case 'TOGGLE_VISIBILITY':
          return {
            ...state,
            visibility: action.payload.visibility!,
          };
        default:
          return state;
      }
    };
  
    const [value, dispatch] = useReducer(inputReducer, initialInputState);
  
    useEffect(() => {
      if (!defaultValue) return;
  
      dispatch({
        type: 'INPUT',
        payload: { value: defaultValue },
      });
    }, [defaultValue]);
  
    const eventOnChangeHandler: EventChangeHandler = (e) => {
      dispatch({
        type: 'INPUT',
        payload: { value: e.target.value },
      });
    };
  
    const valueOnChangeHandler: ValueChangeHandler = (value) => {
      dispatch({
        type: 'INPUT',
        payload: { value },
      });
    };

    const toggleFieldVisibilityHandler = (visibility: boolean) => {
        dispatch({
        type: 'TOGGLE_VISIBILITY',
        payload: { visibility, value: initialInputState.value  }
      })
    }
    
  
    const clearInput = () => {
      dispatch({
        type: 'INPUT',
        payload: { value: '' },
      });
    };
  
    return {
      eventOnChangeHandler,
      valueOnChangeHandler,
      toggleFieldVisibilityHandler,
      clearInput,
      state: value,
      validateInput: validationLogic,
    };

}
  

export default useInput