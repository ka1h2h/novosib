import React, { useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';

function Text({ 
  fetchDataById,
  updateValue,
  name,
  label,
  required

}) {

  const [valid, setValid] = useState({ validate: null, error: '' })
  const validStatus = () => {  
    if (valid.validate === false) {
      return 'is-invalid'
    }
    if (valid.validate === true) {
      return 'is-valid'
    }
    return ''
  }

  return (
    <>
      <div className="mb-4">
        <label htmlFor={name} className="d-flex form-label">{required ? <div className="requiredField">*</div> : ''}&nbsp;{label}</label> 
        <textarea type="text" className={`form-control input-custom mt-2 ${validStatus()} snow-input`}
          name={name}
          key={name}
          onChange={(event) => { updateValue(name, event.target.value, null, setValid) }}
          defaultValue={fetchDataById[name]}
        />
        <div className="invalid-feedback">  
          {valid.error}
        </div>
      </div>

    </>
  )
}

export default Text;