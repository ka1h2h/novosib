import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

function Number({ 
    amount,
    size,
    title,
    suffix,
    prefix,
    background,
    progress,
    dataId }) {
  
    let sizes = size.split('*')
    let width = (150 * sizes[0]) + 'px'
    let height = (150 * sizes[1]) + 'px'

    return (
        <div className='dashboard' style={{width: width, height:height}}>
            <div className='dashboard__title'>
                <div>
                    <div className='dashboard-title'>{title}</div>
                </div>
            </div>
            <div className='dashboard-amount'>{amount}</div>
        </div>
    )
}

export default Number