import React, { useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { disabledBtn } from "../../../../../driversForm";



function AnyText({
  value,
  fetchDataById,
  updateValue,
  name,
  label,
  required,
  placeholderField,
  readOnly,
  type
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



  let valueCheck = String(typeof fetchDataById)
  let currentValue = ""
  if (valueCheck !== 'undefined') {
    currentValue = fetchDataById[name]
  }
  return (
    <div className="mb-2">
      <label htmlFor={name} className="fw-bold form-label d-flex" for="validationCustomUsername">{required ? <div className="requiredField">*</div> : ''}&nbsp;{label}</label>
      <input type="text" className={`form-control input-custom mt-2 ${validStatus()} snow-input`}
        placeholder={placeholderField}
        name={name}
        onChange={type === 'M2mTable' ? (event) =>
          updateValueM2mTable(name, event.target.value, null, setValid) :
          (event) => updateValue(name, event.target.value, null, setValid)}
        defaultValue={value}
        readOnly={readOnly || false}
      />
      <div className="invalid-feedback">
        {valid.error}
      </div>

    </div>
  )
}

export default AnyText;