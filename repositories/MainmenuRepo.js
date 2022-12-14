import StorageProvider from '../providers/StorageProvider'
import { store } from '../src/redux'
import SchemesRepo from './SchemesRepo'


class MainmenuRepo {            
    constructor() {
        this.data = store.getState().schemeSlice.SchemesRepoState
    }
        
    items() {       
        this.data = StorageProvider.get("mainmenu") 
        const schemes = store.getState().schemeSlice.SchemesRepoState  

        if (!Array.isArray(this.data) || this.data.length == 0) {
            this.data = Object.keys(schemes).map((key) => {
                return {
                    "title": schemes[key].scheme.title || key,
                    "url": "/" + key,
                    "icon": schemes[key].scheme.icon || "backup"
                }
            })
        }
        return this.data
    }

    setItems(data) { 
        StorageProvider.put("mainmenu", data)
        if (Array.isArray(data) && data.length > 0) {
            this.data = data
        }
    }
}

export default new MainmenuRepo() 