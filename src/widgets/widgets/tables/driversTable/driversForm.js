import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateTabs from './form_functions/CreateTabs'
import createZone from './form_functions/createZone';
import WidgetFieldValidation from '../../../../validation/WidgetFieldValidation';
import getCookie from '../../../../components/Cookie/getCookie';



const DriversForm = ({ apiUrl, method, SetAlert, scheme, editId, types }) => {  
    const [fetchDataById, setFetchDataById] = useState(false)  
    const [send, setSend] = useState()
    const navigate = useNavigate() 
    let { SchemeFormTabs, SchemeData } = createZone(scheme.views, method);  
    const { id } = useParams()  
    const { pathname } = useLocation() 

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
        const splitUrl = String(pathname).split('/')
        if (splitUrl[splitUrl.length - 1] === 'file' || splitUrl[splitUrl.length - 1] === 'folder') {
            object += `"types":"${types}",`
        }
        if (id) {
            object += `"pid":"${id}",`
        }
        object = object.substring(0, object.length - 1)
        object += "}"
        setFetchDataById(JSON.parse(object)) 
    }

    async function getData() {  
        try {
            const res = await axios({
                method: 'GET',
                url: apiUrl + '/' + currentId,
                headers: {
                    'Authorization': `Bearer ${getCookie('session')}`
                },
            })
            const data = res.data
            setFetchDataById(data) 
        } catch (error) {
            console.error('Ошибка:', error);

        }
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
 

    async function SendData() {  
        let url;
        if (method === 'edit') {  
            url = `${apiUrl}/${currentId}/save`;
        }
        if (method === 'add') { 
            url = `${apiUrl}/${currentId}/add`;
        }
        console.log(currentId)
        try {
            const response = await axios({
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${getCookie('session')}`
                },
                url: url,
                data: fetchDataById
            });
            const json = response.data
            if (!json.result) {       
                SetAlert({ message: json.error, type: 'error' })
            }
            SetAlert({ message: json.message, type: 'success' })
            return json
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }


    async function SaveAndExit() {  // временно не используется
       await SendData()
    }

    async function SaveAndEdit() {  
        let data = await SendData()
        if (method === 'add') {  
            navigate(`/${scheme.scheme}/${data.insertId}/edit`)
            navigate(0)
        }
        if (method === 'edit') { 
            navigate(0)
        }
    }

    useEffect(() => {  
        if (method === 'add') {
            setData()
        }
        if (method === 'edit') {
            getData()
        }
    }, [currentId])

    


    return (
        <>
            {fetchDataById ? <CreateTabs SchemeFormTabs={SchemeFormTabs} SchemeDataAll={SchemeData} scheme={scheme} updateValue={updateValue} fetchDataById={fetchDataById} method={method}   /> : ''} 
            <div className='d-flex justify-content-sm-between btn-drivers-form'>
                <div>
                    <><button className={`btn btn-primary ms-5 mx-3 mt-3 mb-4`} onClick={() => { SendData(),  navigate(`/${scheme.scheme}`)}}>
                        Сохранить и выйти</button>
                        <button className="btn btn-primary  mt-3 mb-4" onClick={() => SaveAndEdit()}>Сохранить</button></>
                </div>
                <button className="btn btn-secondary mx-5 mt-3 mb-4" onClick={() => navigate(-1)}>Отмена</button>
            </div>

        </>
    )
}


export default DriversForm



