import React, {useState, useEffect} from 'react'
import { Routes, Route } from 'react-router-dom'
import { baseurl } from '../../../config'
import DriversWidget from '../DriversWidget'
import 'bootstrap/dist/css/bootstrap.min.css';
import FormContainer from './tables/driversTable/FormContainer'
import Authorization from '../../components/authorization/Authorization';
import DashboardWidgetsCreator from '../../main_menu/DashboardWidgetsCreator'
import SchemesRepo from '../../../repositories/SchemesRepo'
import { useSelector } from 'react-redux';



const WidgetsPage = ({ SetAlert, auth }) => {  
const schemes = useSelector(state => state.schemeSlice.SchemesRepoState)
useEffect(() => [schemes])
    const arr = Object.keys(schemes).map((key) => {
        return (
            <>
                <Route                  
                    path='/'
                    element={<DashboardWidgetsCreator />}
                />
                <Route                     
                    path={schemes[key].routes.allTable.path}
                    element={
                        <>
                            <DriversWidget  
                                auth={auth}  
                                apiUrl={`${baseurl}/${key}`} 
                                pageUrl={schemes[key].routes.allTable.path}  
                                scheme={schemes[key].scheme} 
                            />
                        </>
                    }
                />
                <Route 
                    path={schemes[key].routes.table.path}
                    element={
                        <>
                            <div className='m-5 fs-4'>Просмотр папки</div>
                            <DriversWidget  
                                auth={auth}
                                apiUrl={`${baseurl}/${key}`} 
                                pageUrl={schemes[key].routes.allTable.path} 
                                scheme={schemes[key].scheme} 
                                method={'edit'} 
                                SetAlert={SetAlert} /> 
                        </>
                    }
                />
                {String(typeof schemes[key].scheme.fields.types) === "undefined" ? (
                    <>
                        <Route
                            path={schemes[key].routes.add.path}
                            element={
                                <>
                                    <div className='m-5 fs-4'>Создать запись</div>
                                    <FormContainer   
                                        auth={auth}
                                        apiUrl={`${baseurl}/${key}`}
                                        pageUrl={schemes[key].routes.add.path} 
                                        method={'add'}  
                                        scheme={schemes[key].scheme} 
                                        SetAlert={SetAlert} /> 
                                </>
                            }
                        />
                    </>
                ) : (
                    <>
                        <Route
                            path={schemes[key].routes.add_file.path}
                            element={
                                <>
                                    <div className='m-5 fs-4'>Создать файл</div>
                                    <FormContainer 
                                        auth={auth}
                                        apiUrl={`${baseurl}/${key}`} 
                                        pageUrl={schemes[key].routes.add_file.path} 
                                        method={'add'}
                                        scheme={schemes[key].scheme}
                                        SetAlert={SetAlert}
                                        types={1}
                                    />
                                </>
                            }
                        />
                        <Route
                            path={schemes[key].routes.add_folder.path}
                            element={
                                <>
                                    <div className='m-5 fs-4'>Создать папку</div>
                                    <FormContainer 
                                        auth={auth}
                                        apiUrl={`${baseurl}/${key}`} 
                                        pageUrl={schemes[key].routes.add_folder.path} 
                                        method={'add'}  
                                        scheme={schemes[key].scheme} 
                                        SetAlert={SetAlert}
                                    />
                                </>
                            }
                        />
                    </>
                )
                }
                <Route
                    path={schemes[key].routes.edit.path}
                    element={
                        <>
                            <div className='m-5 fs-4'>Редактирование</div>
                            <FormContainer 
                                auth={auth}
                                apiUrl={`${baseurl}/${key}`} 
                                pageUrl={schemes[key].routes.edit.path} 
                                method={'edit'} 
                                scheme={schemes[key].scheme} 
                                SetAlert={SetAlert} />
                        </>
                    }
                />
            </>
        )
    })

    return (
        <Routes>
            {arr}
            <Route
                path='authorization'
                element={
                    <>
                        <Authorization
                        />
                    </>
                }
            />
        </Routes >
    )
}

export default WidgetsPage