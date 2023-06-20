import { createSlice } from "@reduxjs/toolkit";
const initialState = {
   user:{},
    isLogin:false,
    saleType:"Stock"
}


export const loginSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        login:(state,action)=>{
            return {...state,isLogin:true,user:action.payload}
        },
        updateSaleType:(state,action)=>{
            return {...state,user:action.payload}
        },
        register:(state,action)=>{

        },
        logout:(state,action)=>{
            return {...state,isLogin:false,user:{}}
        }
    }
})


export const {login,register,logout,updateSaleType} = loginSlice.actions;

export default loginSlice.reducer;