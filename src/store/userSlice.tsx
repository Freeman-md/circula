import { createSlice } from "@reduxjs/toolkit";
import { User } from "../types";

enum UsageModes {
    Visitor = 'visitor',
    Member = 'member',
    Neutral = 'neutral'
}


type InitialState = {
    user: User | null,
    token: string | null,
    mode: UsageModes
}

const initialState: InitialState = {
    user: null,
    token: null,
    mode: UsageModes.Neutral
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, { payload }) {
            state.user = payload.user
            state.mode = UsageModes.Member
        },
        resetUser(state) {
            state.user = initialState.user
            state.mode = UsageModes.Neutral
        },
        setModeToVisitor(state) {
            state.mode = UsageModes.Visitor
        }
    }
})

export const { setUser, resetUser, setModeToVisitor } = userSlice.actions
export { UsageModes }

export default userSlice