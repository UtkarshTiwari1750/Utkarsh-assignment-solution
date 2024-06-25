import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    signupData: null,
    loading: false,
    result: "",
    token: sessionStorage.getItem("token") ? JSON.parse(sessionStorage.getItem("token")) : null,
};

const authSlice = createSlice( {
    name:"auth",
    initialState: initialState,
    reducers:{
        setSignupData(state, value) {
            state.signupData = value.payload;
        },
        setToken(state, value) {
            state.token = value.payload;
        },
        setLoading(state, value) {
            state.loading = value.payload;
        },
        setResult(state, value) {
            state.result = value.payload
        }
    }
})

export const {setToken, setLoading, setSignupData, setResult} = authSlice.actions;
export default authSlice.reducer;


