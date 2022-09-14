import { createSlice } from "@reduxjs/toolkit";
import schemes from './../../gsf/allSchemes.json'


const schemeSlice = createSlice({  
    name: 'fetch',
    initialState: {
        SchemesRepoState: JSON.parse(localStorage.getItem('schemes')) || schemes

    },
    reducers: {
        initSchemesRepo: (state) => {
           
           
        },
        updateSchemesRepo: (state, action) => {
            Object.keys(action.payload).map((schemeKey) => {
                let schemeViews = action.payload[schemeKey].views || null
                if (schemeViews != null) {
                    Object.keys(schemeViews).map((viewKey) => {
                        state.SchemesRepoState[schemeKey].scheme.views[viewKey] = schemeViews[viewKey]
                    })
                }
            })
            localStorage.setItem('schemes', JSON.stringify(state.SchemesRepoState))
        },
        removeSchemesRepo: () => {
            localStorage.removeItem('schemes')
        }
    },
    extraReducers: {
       

    }
})

export const { initSchemesRepo, updateSchemesRepo, removeSchemesRepo } = schemeSlice.actions
export default schemeSlice.reducer