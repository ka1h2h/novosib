import React from 'react'
import { AdminTable } from './admin_table/AdminTable'

function TableWidget({ scheme, apiUrl, pageUrl }) { // контейнер для таблиц
    return (
        <>
            <AdminTable
                apiUrl={apiUrl}
                pageUrl={pageUrl}
                scheme={scheme} />
        </>
    )
}

export default TableWidget

