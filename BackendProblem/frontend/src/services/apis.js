const BASE_URL = process.env.REACT_APP_BASE_URL

// AUTH ENDPOINTS
export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login", 
    GET_USER_API: BASE_URL + "/auth/getUser",
}


// AUTH ENDPOINTS
export const expenseEndpoints = {
    CREATE_EXPENSE: BASE_URL + "/expense/create",
    UPDATE_EXPENSE: BASE_URL + "/expense/update",
    DELETE_EXPENSE: BASE_URL + "/expense/delete", 
    GET_EXPENSES: BASE_URL + "/expense/getExpenses",

    CREATE_CATEGORY: BASE_URL + "/expense/createCategory",
    GET_CATEGORIES: BASE_URL + "/expense/getCategory",
}