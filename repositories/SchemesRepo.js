import StorageProvider from '../providers/StorageProvider'
import { store } from '../src/redux'
// import { initSchemesRepo, updateSchemesRepo } from '../src/redux/slices'
import schemesImport from './../gsf/allSchemes1.json'



class SchemesRepo {
    constructor() {
        this.init()
    }
    init() {
        // store.dispatch(initSchemesRepo(schemesImport))
    }

    setView(schemeKey, viewKey, viewData) {
        // let scheme = store.getState().SchemesRepoState
        scheme[schemeKey].scheme.views[viewKey] = viewData 
    }

    getItems() {
    //   return store.getState().SchemesRepoState
    }

}

export default new SchemesRepo() 