import React from 'react'

function Table({ size, title, data, th }) { 
    let sizes = size.split('*')
    let width = (150 * sizes[0]) + 'px'
    let height = (150 * sizes[1]) + 'px'

    return (
        <div className='dashboard-table' style={{ width: width, height: height }}>
            <div className="table-responsive">
                <table className='table-mamble'>
                    <thead>
                        <tr>
                            {Object.keys(data[0]).map((key) => {
                                return <th className='table-widget'>{key}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row) => {
                            return (
                                <tr>
                                    {Object.keys(row).map((key) => {
                                        return (
                                            <>
                                                <td className='text-dark'>{row[key]}</td>
                                            </>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                        <tr>

                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table