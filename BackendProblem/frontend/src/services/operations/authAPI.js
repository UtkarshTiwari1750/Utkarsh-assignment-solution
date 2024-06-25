import toast from "react-hot-toast";
import {setLoading, setToken } from "../../slices/authSlice";
import { setProfile, setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiconnector"
import { endpoints } from "../apis";

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    GET_USER_API
} = endpoints;

//Email Authentication 
export function sendOtp(email, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST", SENDOTP_API, {
                email,
                checkUserPresent: true,
            });
            console.log("SENDOTP API RESPONSE............", response);

            console.log(response.data.success)

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("OTP Sent Successfully");
            navigate("/verify-email");
            

        }catch(error){
            console.log("SENDOTP API ERROR............", error);
            toast.error("Could Not Send OTP");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function signUp(
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate
) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading....");
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST", SIGNUP_API, {
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp,
            });
            console.log("SIGNUP API RESPONSE............", response)
            
            if(!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Signup Successful");
            navigate("/login");

        }catch(error){
            console.log("SIGNUP API ERROR............", error)
            toast.error("Signup Failed");
            navigate("/signup");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
};

export function login(email, password, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading....");
        dispatch(setLoading(true));

        try{
            const response = await apiConnector("POST", LOGIN_API, {
                email,
                password
            });

            console.log("LOGIN API RESPONSE............", response);
            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Login Successful");
            dispatch(setToken(response.data.token));
            const userImage = response.data?.user?.image 
            ? response.data?.user?.image
            : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user?.firstName} ${response.data.user?.lastName}`
            
            dispatch(setUser({...response.data.user, image:userImage}));

            sessionStorage.setItem("token", JSON.stringify(response.data.token));
            sessionStorage.setItem("user", JSON.stringify({...response.data.user, image:userImage}));

            navigate("/dashboard/my-profile");
        }catch(error){
            console.log("LOGIN API ERROR............", error);
            toast.error("Login Failed");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function logout(navigate){
    return (dispatch) => {
        dispatch(setToken(null));
        dispatch(setUser(null));
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        toast.success("Logged Out");
        navigate("/");
    }
}

export async function getUser(token, dispatch){
    const toastId = toast.loading("Loading....");
    let result = null;
    try{
        const response = await apiConnector("POST", GET_USER_API, null, {
            Authorization: `Bearer ${token}`
        });
        console.log("GET USER API RESPONSE............", response);
        if(!response.data.success){
            throw new Error(response.data?.message);
        }
        toast.success("User Fetched Successfully", {
            id: "1"
        });
        sessionStorage.setItem("profile", JSON.stringify(response.data.data));
        dispatch(setProfile(response.data.data));
        result = response.data.data;
    } catch(error){
        console.log("GET USER API ERROR............", error);
        toast.error("Could Not Get User", {
            id: "1"
        });
    }
    toast.dismiss(toastId);
    return result;
}
