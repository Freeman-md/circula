import { createSlice } from "@reduxjs/toolkit";
import { User } from "../types";

interface InitialState {
    user: User | null,
    token: string | null,
}

const initialState: InitialState = {
    user: null,
    token: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, { payload }) {
            state.user = payload.user
        },
        resetUser(state) {
            state.user = initialState.user
        }
    }
})

export const { setUser, resetUser } = userSlice.actions

export default userSlice