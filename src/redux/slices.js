import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseurl } from "../../config";
import getCookie from "../components/Cookie/getCookie";
    

export const getLoginNameUser = createAsyncThunk(          
    'fetch/getLoginNameUser',
    async function (id) {
        try {
            const response = await axios.get(`${baseurl}/users/${id}`, {
                headers: {
                    'Authorization': `Bearer ${getCookie('session')}`
                }
            })
            const data = response.data
            return data
        } catch (e) {
            console.error(e)
        }
    }
)
const userSlice = createSlice({  
    name: 'fetch',
    initialState: {
        user: [],
        validate: '',
        front_config: {}
    },
    reducers: {
        validation:(state, action) => {       
            action.payload.validate = state.validate 
        },
        loading(state) {
            state.loadData = true
        },
        unloading(state) {
            state.loadData = false
        }
    },
    extraReducers: {
        [getLoginNameUser.fulfilled]: (state, action) => {
            state.user = action.payload.name
            localStorage.setItem('worker', action.payload.name)
        }

    }
})

export const { loading, unloading, validation } = userSlice.actions
export default userSlice.reducer