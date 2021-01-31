import {CaseReducer, createAsyncThunk, createSlice, PayloadAction, SliceCaseReducers} from '@reduxjs/toolkit';
import axios from 'axios';
import {RootState} from "../../app/store";

const apiUrl = 'https://jsonplaceholder.typicode.com/users';

type user = {
    "id": number,
    "name": string,
    "username": string,
    "email": string,
}

type fetchState = {
    users: user[]
}

const initialState = {
    users: []
} as fetchState;

export const fetchAsyncGet = createAsyncThunk('fetch/get', async () => {
    const res = await axios.get(apiUrl);
    return res.data;
});

const fetchSlice = createSlice({
    name: 'fetch',
    reducers: {},
    initialState,
    extraReducers : (builder) => {
        builder.addCase(fetchAsyncGet.fulfilled, (state: fetchState, action) => {
           return {
               ...state,
               users: action.payload
           }
        });
    }
});

export const selectUsers = (state: RootState) => state.fetch.users;
export default fetchSlice.reducer;