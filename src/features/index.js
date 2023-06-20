import { combineReducers } from "@reduxjs/toolkit";
import itemSlice from "./user/items/itemSlice";
import loginSlice from "./user/loginSlice";
import { userReducer } from "./user/userReducer";

export const rootReducer = combineReducers({
    user:loginSlice,
    items:itemSlice
})