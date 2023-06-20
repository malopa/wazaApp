import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   items:[],
}

const itemSlice = createSlice({
    name:'items',
    initialState,
    reducers:{
        addItem:(state,action)=>{
            return [...state,action.payload]
        },
        search:(state,action)=>{
            return state.filter(i=>i.id !== action.payload)
        },
        deleteItem:(state,action)=>{
            return state.filter(i=>i.id !== action.payload);
        }
    }
})



export const {addItem,search,deleteItem} = itemSlice.actions;

export default itemSlice.reducer;