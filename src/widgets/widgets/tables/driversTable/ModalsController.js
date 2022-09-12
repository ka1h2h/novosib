import React, { useState } from 'react'
import { AdminTable } from '../AdminTable'
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from '../../../../components/alerts/Alerts';
import DriversForm from './driversForm'


function ModalsController({ apiUrl, scheme, pageUrl, setView, view }) {
    const [add, setAdd] = useState(false)
    const [edit, setEdit] = useState(false)
    const [modal, setModal] = useState(true)

    const [alertResult, setAlertResult] = useState(false)
    const [dataAlert, setDataAlert] = useState({ message: '', type: '' })

    function SetAlert({ message, type }) {
        setDataAlert({ message: message, type: type })
        setAlertResult(true)
    }




    if (add === true && modal !== false) {
        return (
            <div className="px-4 m-5 position-absolute top-0 start-3 w-100 h-75 bg-light"
                style={{
                    zIndex: 7,
                    outline: "1000px solid #0006"
                }}>
                {alertResult ? <Alert message={dataAlert.message} type={dataAlert.type} setAlertResult={setAlertResult} /> : ''
                }
                <DriversForm
                    method={'add'}
                    pageUrl={pageUrl}
                    apiUrl={apiUrl}
                    scheme={scheme}
                    SetAlert={SetAlert}
                    setModal={setModal}
                    types={'modal'} />
            </div >
        )
    }
    if (edit !== false && modal !== false) {
        return (
            <div className="px-4 m-5 position-absolute top-0 start-3 w-75 h-75 bg-light"
                style={{
                    zIndex: 7,
                    outline: "1000px solid #0006"
                }}>
                {alertResult ? <Alert message={dataAlert.message} type={dataAlert.type} setAlertResult={setAlertResult} /> : ''}
                <DriversForm
                    method={'edit'}
                    pageUrl={pageUrl}
                    apiUrl={apiUrl}
                    scheme={scheme}
                    editId={edit}
                    SetAlert={SetAlert}
                    setModal={setModal}
                    modal={modal}
                    types={'modal'}
                    setView={setView} />
            </div>

        )
    }
    if (modal) {
        return (

            <div className="px-4 mt-5 py-4 rounded overflow-auto position-absolute top-0 start-0 w-100 h-100"
                style={{
                    zIndex: 5,
                    outline: "1000px solid #0006",
                    backgroundColor: "rgba(0, 0, 0, 0.3)"
                }}>
                <AdminTable
                    types={'modal'}
                    setAdd={setAdd}
                    setEdit={setEdit}
                    pageUrl={pageUrl}
                    apiUrl={apiUrl}
                    scheme={scheme}
                    setModal={setModal}
                    edit={edit}
                    modal={modal} />
            </div>

        )
    }
}

export default ModalsController