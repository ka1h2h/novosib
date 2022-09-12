import StorageProvider from '../providers/StorageProvider'
import schemes from './../gsf/allSchemes.json'


class MainmenuRepo {            
    constructor() {
        this.data = []
    }

    items() {                         
        if (this.data.length == 0) {   
            this.data = StorageProvider.get("mainmenu")  
        }
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