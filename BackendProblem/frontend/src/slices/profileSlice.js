import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : null,
    profile: sessionStorage.getItem("profile") ? JSON.parse(sessionStorage.getItem("profile")) : null,
    loading: false,
};

const profileSlice = createSlice( {
    name:"profile",
    initialState: initialState,
    reducers:{
        setUser(state, value) {
            state.user = value.payload;
        },
        setProfile(state, value) {
            state.profile = value.payload;
        },
        setLoading(state, value) {
            state.loading = value.payload;
        },
    }
})

export const {setUser, setLoading, setProfile} = profileSlice.actions;
export default profileSlice.reducer;

