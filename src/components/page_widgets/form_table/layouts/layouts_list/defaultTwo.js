import React from 'react'

function layout(props) {
  return (
    <>
      <div className='row'>
        <div className="col-12">
          {props.object.main}
        </div>
        <div className="col-12">
          {props.object.left}
        </div>
        <div className="col-12">
          {props.object.right}
        </div>
      </div>
    </>
  )
}

export default layout