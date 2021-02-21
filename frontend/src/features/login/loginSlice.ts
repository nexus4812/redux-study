import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppThunk, RootState} from '../../app/store';
import axios from 'axios';

const hostUrl = 'http://127.0.0.1:8000/';
const loginUrl = `${hostUrl}authen/jwt/create`;
const registerUrl = `${hostUrl}authen/jwt/create`;
const myselfUrl = `${hostUrl}authen/jwt/create`;

export type auth = {
    username: string,
    password: string,
}


type loginState = {
    auth: auth,
    isLoginView: boolean,
    profile: {
        id: number,
        username: string
    }
}

const initialState: loginState = {
    auth: {
        username: '',
        password: '',
    },
    isLoginView: true,
    profile: {
        id: 0,
        username: ''
    }
};

export const fetchAsyncLogin = createAsyncThunk<{access: string}, auth>(
    "login/post",
    async (auth) => {
    const res = await axios.post(loginUrl, auth, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return res.data;
});


export const fetchAsyncRegister = createAsyncThunk<auth, auth>(
    "login/register",
    async (auth) => {
    const res = await axios.post(registerUrl, auth, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return res.data;
});

export const fetchAsyncProfile = createAsyncThunk(
    "login/profile",
    async (token) => {
        const res = await axios.get(myselfUrl, {
            headers: {
                'Authorization': `JWT ${token}`
            }
        });

        return res.data;
    });

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        editUserName: (state, action) => {
            state.auth.username = action.payload
        },
        editUserPassword: (state, action) => {
            state.auth.password = action.payload
        },
        toggleMode: (state) => {
            state.isLoginView = !state.isLoginView
        }
    },

    extraReducers: (builder) => {
        builder.addCase(fetchAsyncLogin.fulfilled, (state, action) => {
            localStorage.setItem("localJWT", action.payload.access);
            action.payload.access && (window.location.href = "/task");
        });
        builder.addCase(fetchAsyncProfile.fulfilled, (state, action) => {
            state.profile = action.payload;
        });
    }
});

export const {editUserName, editUserPassword, toggleMode} = loginSlice.actions;
export const selectAuthen = (state: RootState) => state.login.auth;
export const selectIsLoginView = (state: RootState) => state.login.isLoginView;
export const selectProfile = (state: RootState) => state.login.profile;


export default loginSlice.reducer;
