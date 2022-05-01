import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./authReducer";
import { tradesReducer } from "./tradesReducer";
import { uiReducer } from "./uiReducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    trades: tradesReducer,
    ui: uiReducer
})