import React from 'react'
import { AdminTable } from './widgets/tables/AdminTable'

function DriversWidget({ scheme, apiUrl, pageUrl }) { // контейнер для таблиц

    return (
        <>
            <AdminTable
                apiUrl={apiUrl}
                pageUrl={pageUrl}
                scheme={scheme} />
        </>
    )
}

export default DriversWidget

