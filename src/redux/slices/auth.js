import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios.js'


export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
    const {data} = await axios.post('/auth/login', params)
    return data
})

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
    const {data} = await axios.post('/auth/register', params)
    return data
})

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    const {data} = await axios.get('/auth/me')
    return data
})
export const fetchUpdateMe = createAsyncThunk('auth/fetchUpdateMe', async (fields) => {
    const {data} = await axios.patch('/personal/edit', fields)
    return data
})
export const fetchLogout = createAsyncThunk('auth/fetchLogout', async (params) => {
    const {data} = await axios.patch('/auth/logout', params)
    return data
})


const initialState = {
    data: null,
    status: 'loading'
}

const authSlise = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: { 

        // авторизация
        [fetchAuth.pending]: (state, action) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchAuth.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchAuth.rejected]: (state, action) => {
            state.status = 'error'
            state.data = null
        },

        // logout
        [fetchLogout.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = null
        },

        // проверка авторизации
        [fetchAuthMe.pending]: (state, action) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchAuthMe.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchAuthMe.rejected]: (state, action) => {
            state.status = 'error'
            state.data = null
        },

        // регистрация
        [fetchRegister.pending]: (state, action) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchRegister.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchRegister.rejected]: (state, action) => {
            state.status = 'error'
            state.data = null
        },

        // изменение данных аккаунта
        // [fetchUpdateMe.pending]: (state, action) => {
        //     state.status = 'loading'
        //     state.data = null
        // },
        [fetchUpdateMe.fulfilled]: (state, action) => {
            state.status = 'loaded'
            // const data = state.data
            // debugger
            
            state.data = {...state.data, ...action.meta.arg}
            // debugger
        },
        [fetchUpdateMe.rejected]: (state, action) => {
            state.status = 'error'
            state.data = null
        },
    }
})

console.log(authSlise.reducer)
export const {logout} = authSlise.actions
export const selectIsAuth = state => Boolean(state.auth.data)
export const authReducer = authSlise.reducer