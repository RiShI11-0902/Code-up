import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./reducers/authReducer"
import  questionReducer  from "./reducers/questionReducer"

export const store = configureStore({
    reducer: {
        auth : authReducer,
        questions: questionReducer
    }
})