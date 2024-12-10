import { createSlice } from "@reduxjs/toolkit";

const authStore = createSlice({
    name: "auth",
    initialState: {
        isLogged: false,
        username: null,
        access: null,
        refresh: null,
    },
    reducers: {
        login: (state, action) => {
            state.isLogged = true;
            state.access = action.payload.access;
            state.refresh = action.payload.refresh
            state.username = action.payload.username;
        },
        logout: (state) => {
            state.isLogged = false;
            state.username = null;
            state.access = null;
            state.refresh = null;
        }
    }
})

export default authStore.reducer
export const { login, logout } = authStore.actions;
// export const authAction = authStore.actions




