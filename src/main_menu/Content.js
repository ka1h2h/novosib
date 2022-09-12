import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from '../components/alerts/Alerts';
import WidgetsPage from './../components/page_widgets/WidgetsPage'


function Content({ setAuth }) {                     
    const [alertResult, setAlertResult] = useState(false)  
    const [dataAlert, setDataAlert] = useState({ message: '', type: '' })  

    function SetAlert({ message, type }) { 
        setDataAlert({ message: message, type: type })
        setAlertResult(true)
    }
    return (
        <>
            {alertResult ? <Alert message={dataAlert.message} type={dataAlert.type} setAlertResult={setAlertResult} /> : ''}
            <WidgetsPage SetAlert={SetAlert} setAuth={setAuth} />  
        </>
    )
}

export default Content