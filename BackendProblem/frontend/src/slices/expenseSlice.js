import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    expense: sessionStorage.getItem("expense") ? JSON.parse(sessionStorage.getItem("expense")) : null,
    category: sessionStorage.getItem("category") ? JSON.parse(sessionStorage.getItem("category")) : null,
};

const expenseSlice = createSlice( {
    name:"expense",
    initialState: initialState,
    reducers:{
        setExpense(state, value) {
            state.expense = value.payload;
        },
        setCategory(state, value) {
            state.category = value.payload;
        }
    }
})

export const {setExpense, setCategory} = expenseSlice.actions;
export default expenseSlice.reducer;
