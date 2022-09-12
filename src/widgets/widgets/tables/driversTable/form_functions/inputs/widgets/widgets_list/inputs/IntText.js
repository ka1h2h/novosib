import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function IntText({ name,
  fetchDataById,
  updateValue,
  label,
  readOnly,
  required
}) {


  return (
    <div className="form-floating mb-4 " for="validationCustomUsername">
      <input type="number" min="0" className="form-control input-custom "
        name={name}
        key={name}
        onChange={(event) => { updateValue(name, event.target.value) }}
        defaultValue={fetchDataById[name]}
        readOnly={readOnly || false}
      />
      <label htmlFor={name} className="fw-bold form-label" for="validationCustomUsername">{required ? <div className="requiredField">*</div> : ''}&nbsp;{label}</label>

    </div>
  )
}

export default IntText;