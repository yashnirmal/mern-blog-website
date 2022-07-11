import actionTypes from "../constants/actionTypes";

export const login = (userData)=>{
    return {
        type:actionTypes.LOGIN,
        payload:userData
    }
}

export const logout = ()=>{
    return {
        type:actionTypes.LOGOUT
    }
}

