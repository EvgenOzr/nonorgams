import { configureStore } from "@reduxjs/toolkit";
import nonoReducer from './nonoSlice'

export const store = configureStore({
    reducer: nonoReducer
})

export type RootState = ReturnType<typeof store.getState>