import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { questionApi } from "../api's/questionApi";

export const loadQuestionsAsync = createAsyncThunk(
    "question/load",
     async (data) => {
        const res = await questionApi(data);
        return res.data;
     }
)
  

export const questionReducer = createSlice({
  name: "question",
  initialState: {
    loaded: false,
    questions: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    //    builder.addCase(loadQuestionsAsync.fu, (state,action)=>{
    //     state.questions = action.payload
    //    })
    builder.addCase(loadQuestionsAsync.fulfilled, (state,action)=>{
        state.questions = action.payload
        state.loaded = true
    })
  },
});

export default questionReducer.reducer;
