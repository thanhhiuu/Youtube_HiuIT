import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    loading: false,
    error: null
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true
        },
        loginSuccess: (state, action) => {
            state.loading = false
            state.currentUser = action.payload
        },
        loginError: (state) => {
            state.loading = false;
            state.error = true;

        },
        loginOut: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;

        },
        subscription: (state, action) => {
            if (state.currentUser.subscribersUser.includes(action.payload)) {
                state.currentUser.subscribersUser.splice(
                    state.currentUser.subscribersUser.findIndex(
                        (channel) => channel === action.payload
                    )
                )
            } else {
                state.currentUser.subscribersUser.push(action.payload)
            }
        },
        subscriber: (state, action) => {
            if (state.currentUser.subscribers.includes(action.payload)) {
                state.currentUser.subscribers.splice(
                    state.currentUser.subscribers.findIndex(
                        (channel) => channel === action.payload
                    )
                )
            } else {
                state.currentUser.subscribers.push(action.payload)
            }
        }

    }
})



export const { loginStart, loginSuccess, loginError, subscription } = userSlice.actions

export default userSlice.reducer
