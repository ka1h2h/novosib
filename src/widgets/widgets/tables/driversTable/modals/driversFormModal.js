import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateTabs from './form_functions/CreateTabs'
import createZone from './form_functions/createZone';
import WidgetFieldValidation from '../../../../validation/WidgetFieldValidation';
import { useDispatch } from 'react-redux';
import { sendDataById, update } from '../../../../redux/slices';


const DriversFormModal = ({ apiUrl, method, scheme, editId, setView, SetAlert }) => {
    const [fetchDataById, setFetchDataById] = useState(false)
    let { SchemeFormTabs, SchemeData } = createZone(scheme, method);
    const { id } = useParams()
    const dispatch = useDispatch()

    let currentId;
    if (String(typeof editId) === 'undefined') {
        currentId = id;
    } else {
        currentId = editId;
    }

    function setData() {
        let object = "{"
        for (const prop in SchemeData) {
            object += `"${prop}":"",`
        }
        object = object.substring(0, object.length - 1)
        object += "}"
        setFetchDataById(JSON.parse(object))
    }

    async function getData() {
        fetch(apiUrl + '/' + currentId)
            .then((response) => {
                return response.json();
            }).then((data) => {
                setFetchDataById(data)
            });
    }


    function updateValue(fieldName, fieldValue, depend, setValid) {
        fetchDataById[fieldName] = fieldValue;
        const options = {
            min: SchemeData[fieldName].min || 0,
            max: SchemeData[fieldName].max || 127,
            mask: SchemeData[fieldName].mask || false
        }
        const data = { fieldName: fieldName, fieldValue: fieldValue }
        const validateAnswer = WidgetFieldValidation({ options: options, data: data, fetchDataById: fetchDataById })
        setValid(validateAnswer)
        if (depend) {
            document.querySelector(`input[name="${fieldName}"]`).value = fieldValue
        }
    }

    let url;
    if (method === 'edit') {
        url = `${apiUrl}/${currentId}/save`;
    }
    if (method === 'add') {
        url = `${apiUrl}/${currentId}/add`;
    }

    useEffect(() => {
        if (method === 'add') {
            setData()
        }
        if (method === 'edit') {
            getData()
        }
    }, [currentId])


    function SaveData() {
        dispatch(sendDataById({ url, fetchDataById }))
        setTimeout(() => {
            setView(false)
        }, 1000)
        dispatch(update(fetchDataById))
    }

    return (
        <>
            {fetchDataById ? < CreateTabs SchemeFormTabs={SchemeFormTabs} SchemeDataAll={SchemeData} updateValue={updateValue} fetchDataById={fetchDataById} scheme={scheme} /> : ''}
            <a className="btn btn-primary mx-5 mt-3 mb-4" onClick={() => SaveData()}>
                {method === 'edit' ? 'Сохранить' : 'Добавить'}</a>

        </>
    )
}


export default DriversFormModal