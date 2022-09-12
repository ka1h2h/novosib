import React from "react"

function layout(props) {
      return (
            <>
                  <div className='row mb-3'>
                        {props.object.main ? <div className="col">{props.object.main}</div> : ''}
                        {props.object.left ? <div className="col">{props.object.left}</div> : ''}
                        {props.object.right ? <div className="col">{props.object.right}</div> : ''}
                  </div>
                  <div className='row'>
                        {props.object.bottom ? <div className="col">{props.object.bottom}</div> : ''}
                  </div>
            </>
      )
}

export default layout