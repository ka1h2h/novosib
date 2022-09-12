import React, { useEffect, useState } from 'react'
import getCookie from '../../../../../../../../../components/Cookie/getCookie';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { baseurl } from '../../../../../../../../../../config';
import SchemesRepo from '../../../../../../../../../../repositories/SchemesRepo';

function Orders({  
    fetchDataById,
    table_name,
    filter,

}) {

    const [fetchData, setFetchData] = useState(false) 


    let id = fetchDataById.id
    const schemeHeaders = SchemesRepo.getItems()[table_name].scheme.views.table

    function placeholder(obj, str) {     
        const arr = str.match(/{{\s*[\w\.]+\s*}}/g).map(function (x) { return x.match(/[\w\.]+/)[0]; })
        for (let i = 0; i < arr.length; i++) {
            str = str.replaceAll('{{' + arr[i] + '}}', obj[arr[i]])
        }
        return str
    }


    let url = `${baseurl}/${table_name}`
    if (String(typeof filter) !== 'undefined') {
        url += '?' + placeholder(fetchDataById, filter)
    }



    async function getData() {
        try {
            const res = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${getCookie('session')}`
                }
            })
            const data = res.data
            return setFetchData(data._children)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getData()
    }, [id])

    function OrdersWidget() {
        return (
            <div className='card bg-light  rounded overflow-auto' >
                <div className='card-body py-3 '>
                    <div className='d-flex justify-content-end'>
                    </div>
                    <div className='table-responsive'>
                        <table className='table table-borderless'>
                            <thead>
                                <tr className=''>
                                    {Object.keys(schemeHeaders).map((header, index) => {
                                        return (
                                            <th key={index}>{schemeHeaders[header].title}</th>
                                        )
                                    })}

                                </tr>
                            </thead>
                            <tbody>
                                {fetchData.map((tableRow, rowIndex) => {
                                    return (
                                        <>
                                            <tr key={rowIndex} className='border-1 border-top-0 border-start-0 border-end-0'>
                                                {Object.keys(schemeHeaders).map((columnName, columnIndex) => {
                                                    return (
                                                        ((() => {
                                                            if (String(typeof fetchData[rowIndex][columnName]) === 'object' && fetchData[rowIndex][columnName] !== null) {
                                                                if (String(typeof fetchData[rowIndex][columnName].name) !== 'undefined') {
                                                                    return <td className='text-dark p-3 align-middle' key={columnIndex}>{fetchData[rowIndex][columnName].name}</td>
                                                                }
                                                            }
                                                            if (String(typeof fetchData[rowIndex][columnName]) === 'object' && fetchData[rowIndex][columnName] !== null) {
                                                                return <td className='text-dark p-3 align-middle' key={columnIndex}>{fetchData[rowIndex][columnName].name || fetchData[rowIndex][columnName].id}</td>
                                                            }
                                                            if (String(typeof fetchData[rowIndex][columnName]) === 'object' && fetchData[rowIndex][columnName] !== null) {
                                                                return <td className='p-3 align-middle' key={columnIndex}>{fetchData[rowIndex][columnName].name}</td>
                                                            }
                                                            if (String(typeof fetchData[rowIndex][columnName]) === 'name') {
                                                                return (
                                                                    <td className='p-3 align-middle' key={columnIndex}>{tableRow.name}</td>
                                                                )
                                                            }
                                                            if (columnName === 'id') {
                                                                return (
                                                                    <td className='p-3 align-middle' key={columnIndex}><Link to={`${fetchData[rowIndex].id}`}>
                                                                        <button className='btn btn-primary'>{fetchData[rowIndex][columnName]}</button></Link></td>
                                                                )
                                                            }
                                                            return <td className='text-dark p-3 align-middle' key={columnIndex}>{fetchData[rowIndex][columnName]}</td>
                                                        })())
                                                    )
                                                })
                                                }
                                            </tr>
                                        </>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div >
        )
    }
    return (
        <>
            {fetchData ? <OrdersWidget /> : ''
            }
        </>
    )

}

export default Orders