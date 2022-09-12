
class StorageProvider { 
    constructor() {
        this.data = []
    }


    get(key, fallbackValue) {   
        fallbackValue = fallbackValue || null
        try {
            let json = localStorage.getItem(key)
            return JSON.parse(json)
        } catch (e) {
            console.error(e)
        }
        return fallbackValue
    }

    put(key, value) { 
        localStorage.setItem(key, JSON.stringify(value))
    }
}

export default new StorageProvider()