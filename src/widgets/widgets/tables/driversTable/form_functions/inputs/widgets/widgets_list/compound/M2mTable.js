import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Widget from '../../Widget';
import { useParams } from 'react-router-dom';
import getCookie from '../../../../../../../../../components/Cookie/getCookie';
import axios from 'axios';
import WidgetFieldValidation from '../../../../../../../../../validation/WidgetFieldValidation';
import { baseurl } from '../../../../../../../../../../config';


function M2mTable({    //  Виджет “M2mTable” – виджет, который позволяет установить связь «многие ко многим» (см. пользовательскую документацию)
    fetchDataById,
    name,
    SchemeDataAll,
    method
}) {


    const WidgetData = SchemeDataAll[name]  // присваиваем переменной данные внутри параметров виджета, которые лежат в схеме
    const [fetchDataM2mTable, setfetchDataM2mTable] = useState({ disabled: -1 })  // стейт, позволяющий делать кнопку "Сохранить" disabled при сохранении и отправки данных на сервер
    const [dataId, setDataId] = useState({})  
    const { id } = useParams()
    const [rows, setRows] = useState([])
    const [loader, setLoader] = useState(true)
    const [isDisabled, setIsDisabled] = useState({ disabled: [] })

    const handleClick = (i) => {    // функция, позволяющая сделать кнопку "Сохранить" disabled (принмает в себя индекс кнопки)
        setIsDisabled(currentState => ({
            disabled: [...currentState.disabled, i],
        }));
    }


    async function updateM2mTable(e, index) {   
        let controller_name = WidgetData.ref
        let url = `${baseurl}/${controller_name}/0/add`
        fetchDataM2mTable['_document'] = fetchDataById.id || 0
        fetchDataM2mTable['driver'] = fetchDataById.id || 0
        const res = axios({
            url: url,
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${getCookie('session')}`
            },
            data: fetchDataM2mTable
        })
            .then(response => {
                const data = response.data
            })
        setfetchDataM2mTable({ disabled: index })
    }




    function updateValueM2mTable(fieldName, fieldValue, depend, setValid) { 
        fetchDataM2mTable[fieldName] = fieldValue;
        setDataId(fetchDataM2mTable[fieldName])
        let options
        if (String(typeof WidgetData) !== 'undefined') {
            options = {
                min: 0,
                max: 127,
                mask: false
            }
        }
        const data = { fieldName: fieldName, fieldValue: fieldValue }
        const validateAnswer = WidgetFieldValidation({ options: options, data: data, fetchDataM2mTable: fetchDataM2mTable })
        setValid(validateAnswer)
        if (depend) {
            document.querySelector(`input[name="${fieldName}"]`).value = fieldValue
        }
    }


    useEffect(() => {  
        let refKey = WidgetData.refKey || '_document'
        let refTable = WidgetData.ref
        axios({
            method: 'GET',
            url: `${baseurl}/${refTable}/?${refKey}=${id}`,
            headers: {
                'Authorization': `Bearer ${getCookie('session')}`
            },
        }).then((response) => {
            const rowsData = []
            for (let i = 0; i < response.data._children.length; i++) {
                let newrow = {}
                for (const item in WidgetData.columns) {
                    newrow[item] = response.data._children[i][item]
                    response.data._children[i][item]["disabled"] = true
                }
                rowsData.push(newrow)
            }
            setRows(rowsData)
            setLoader(false)
        })
    }, [])


    function addRow() {   
        let newrow = {}
        for (const item in WidgetData.columns) {
            newrow[item] = ''
        }
        setRows((currentValue) => [...currentValue, newrow])
    }

    return (
        loader ? '' : (
            <>
                <table className='table table-sm'>
                    <thead className='thead-dark '>
                        <tr>
                            <th style={{ width: '10px' }}>
                                {method === 'add' ? '' : <button className='btn btn-primary mt-2' onClick={addRow}>+</button>}
                            </th>

                            {Object.keys(WidgetData.columns).map((key) => {
                                return (
                                    <th className='p-3'>{WidgetData.columns[key].title}</th>
                                )
                            })}
                            <th ></th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {rows.map((row, index) => {
                            if (row[name].lp !== null) {
                                return (
                                    <>
                                        <tr>
                                            <td className='p-4'>
                                                {++index}
                                            </td>
                                            {Object.keys(row).map((field) => {
                                                return (
                                                    <>
                                                        <td className='ps-2 px-2 pt-3'>
                                                            <Widget
                                                                type={'M2mTable'}
                                                                fetchDataM2mTable={fetchDataM2mTable}
                                                                name={name}
                                                                fieldName={field}
                                                                refs={WidgetData.columns[field].ref}
                                                                updateValueM2mTable={updateValueM2mTable}
                                                                value={row[field]}
                                                                widget={WidgetData.columns[field].widget}
                                                                labelKey={WidgetData.columns[field].labelKey}
                                                            />
                                                        </td>
                                                    </>
                                                )
                                            }
                                            )}
                                            <td style={{ width: '15px', }}>
                                                <button className={`btn btn-success `} disabled={row[name].disabled || isDisabled.disabled.includes(index) || false} style={{ marginTop: '12px' }} onClick={(e) => { updateM2mTable(e, index), handleClick(index) }}>Сохранить</button>
                                            </td>
                                        </tr>
                                    </>

                                )
                            }
                        })}
                    </tbody>
                    {method === 'add' ? <tfoot>
                        <tr>
                            <td className='text-center' colspan={Object.keys(WidgetData.columns).length + 2}>
                                <span>Редактирование данных в этой таблице станет доступным после сохранения документа</span>
                            </td>
                        </tr>
                    </tfoot>
                        : ''}
                </table>

            </>
        )
    )
}

export default M2mTable