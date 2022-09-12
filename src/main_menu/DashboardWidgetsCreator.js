import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseurl } from '../../config'
import getCookie from '../components/Cookie/getCookie'
import dashboard from './../../dashboard.json'
import ChartWidget from './dashboard-widget/Chart'
import { LineChart } from './dashboard-widget/LineChart'

import Number from './dashboard-widget/Number'
import { SumChart } from './dashboard-widget/SumChart'
import { SumChart2 } from './dashboard-widget/SumChart2'
import Table from './dashboard-widget/Table'

function DashboardWidgetsCreator() {  
    const [fetchData, setFetchData] = useState({})
    useEffect(() => {
        try {
            const res = axios.get(baseurl + '/dashboard', {
                headers: {
                    'Authorization': `Bearer ${getCookie('session')}`
                }
            })
                .then((res) => res.data)
                .then((data) => setFetchData(data))
        } catch (e) {
            console.error(e)

        }
    }, [])
    return (


        <>
            {fetchData?
                <>
                    {Object.keys(fetchData).map((key) => {
                        return (
                            ((() => {
                                if (fetchData[key].widget === 'number' && fetchData[key].data.length !== 0) {
                                    return <Number
                                        amount={fetchData[key].data}
                                        size={fetchData[key].size}
                                        title={fetchData[key].title}
                                        suffix={fetchData[key].suffix}
                                        prefix={fetchData[key].prefix}
                                        background={fetchData[key].background}
                                        progress={fetchData[key].progress}
                                        dataId={fetchData[key].dataId}
                                    />
                                }
                                if (fetchData[key].widget === 'table' && fetchData[key].data.length !== 0) {
                                    return <Table
                                        size={fetchData[key].size}
                                        title={fetchData[key].title}
                                        data={fetchData[key].data}
                                        th={fetchData[key].th}

                                    />
                                }



                            })

                            )())
                    })}  <ChartWidget /><div className='line-chart-widgets-container'> <LineChart /> <div><SumChart />  <SumChart2 /></div> </div>  </> : ''}

        </>

    )
}

export default DashboardWidgetsCreator