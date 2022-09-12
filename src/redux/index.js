import { configureStore } from "@reduxjs/toolkit";
import schemeSlice from "./schemeSlice";
import userSlice from './slices'


export const store = configureStore({  
    reducer: {
       userSlice: userSlice, 
       schemeSlice: schemeSlice
    }
})

window.store = store