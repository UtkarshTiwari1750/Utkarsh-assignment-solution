import toast from "react-hot-toast";
import {setLoading, setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiconnector"
import { expenseEndpoints } from "../apis";
import { setCategory, setExpense } from "../../slices/expenseSlice";

const {
    CREATE_EXPENSE,
    UPDATE_EXPENSE,
    DELETE_EXPENSE,
    CREATE_CATEGORY,
    GET_CATEGORIES,
    GET_EXPENSES
} = expenseEndpoints

export const createExpense = async (data, token, dispatch) => {
    const toastId = toast.loading("Loading...");
    let result = []
    try{
        const response = await apiConnector("POST", CREATE_EXPENSE, data, {
            Authorization: `Bearer ${token}`
        });
        console.log("CREATE EXPENSE RESPONSE............", response);

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        dispatch(setExpense(response.data?.data));
        sessionStorage.setItem("expense", JSON.stringify(response.data?.data));
        toast.success("Expense Created Successfully",
            {id: "1"}
        );
        result = response.data.data;
    } catch(error) {
        console.log("CREATE EXPENSE ERROR............", error);
        toast.error("Could Not Create Expense",
            {id: "1"}
        );
    }
    toast.dismiss(toastId);
    return result;
}

export const updateExpense = async (data, token, dispatch) => {
    const toastId = toast.loading("Loading...");
    let result = []
    try{
        const response = await apiConnector("POST", UPDATE_EXPENSE, data, {
            Authorization: `Bearer ${token}`
        });
        console.log("UPDATE EXPENSE RESPONSE............", response);

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        
        dispatch(setExpense(response.data.data));
        sessionStorage.setItem("expense", JSON.stringify(response.data.data));
        toast.success("Expense Updated Successfully",
            {id: "1"}
        );
        result = response.data.data;
    } catch(error) {
        console.log("UPDATE EXPENSE ERROR............", error);
        toast.error("Could Not Update Expense",
            {id: "1"}
        );
    }
    toast.dismiss(toastId);
    return result;
}

export const deleteExpense = async (data, token, dispatch) => {
    console.log("EXPENSE DATA............", data)
    const toastId = toast.loading("Loading...");
    let result = []
    try{
        const response = await apiConnector("POST", DELETE_EXPENSE, data,{
            Authorization: `Bearer ${token}`
        });
        console.log("DELETE EXPENSE RESPONSE............", response);

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        
        dispatch(setExpense(response.data.data));
        sessionStorage.setItem("expense", JSON.stringify(response.data.data));
        toast.success("Expense Deleted Successfully",
            {id: "1"}
        );
        result = response.data.data;
    } catch(error) {
        console.log("DELETE EXPENSE ERROR............", error);
        toast.error("Could Not Delete Expense",
            {id: "1"}
        );
    }
    toast.dismiss(toastId);
    return result;
}

export const getExpenses = async (token, dispatch) => {
    const toastId = toast.loading("Loading...");
    let result = []
    try{
        const response = await apiConnector("POST", GET_EXPENSES, null, {
            Authorization: `Bearer ${token}`
        });
        console.log("GET EXPENSES RESPONSE............", response);

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        sessionStorage.setItem("expense", JSON.stringify(response.data.data));
        toast.success("Expenses Fetched Successfully",
            {id: "1"}
        );
        result = response.data.data;
    } catch(error) {
        console.log("GET EXPENSES ERROR............", error);
        toast.error("Could Not Fetch Expenses",
            {id: "1"}
        );
    }
    toast.dismiss(toastId);
    return result;
}

export const createCategory = async (data, token, dispatch) => {
    const toastId = toast.loading("Loading...");
    let result = []
    try{
        const response = await apiConnector("POST", CREATE_CATEGORY, data,{
            Authorization: `Bearer ${token}`
        });
        console.log("CREATE CATEGORY RESPONSE............", response);

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        dispatch(setCategory(response.data.data));
        sessionStorage.setItem("category", JSON.stringify(response.data.data));
        toast.success("Category Created Successfully",
            {id: "1"}
        );
        result = response.data.data;
    } catch(error) {
        console.log("CREATE CATEGORY ERROR............", error);
        toast.error("Could Not Create Category",
            {id: "1"}
        );
    }
    toast.dismiss(toastId);
    return result;
}

export const getCategories = async (token, dispatch) => {
    const toastId = toast.loading("Loading...");
    let result = []
    try{
        const response = await apiConnector("POST", GET_CATEGORIES, null,{
            Authorization: `Bearer ${token}`
        });
        console.log("GET CATEGORIES RESPONSE............", response);

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        sessionStorage.setItem("category", JSON.stringify(response.data.data));
        toast.success("Categories Fetched Successfully",
            {id: "1"}
        );
        result = response.data.data;
    } catch(error) {
        console.log("GET CATEGORIES ERROR............", error);
        toast.error("Could Not Fetch Categories",
            {id: "1"}
        );
    }
    toast.dismiss(toastId);
    return result;
}
