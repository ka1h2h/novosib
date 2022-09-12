import React, { useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { baseurl } from "../../../../../../../../config";
import getCookie from "../../../../../../Cookie/getCookie";



function File({           
    name,  
    label,
    updateValue,
    value,
    required
}) {
    
    const [valid, setValid] = useState({ validate: null, error: '' })  
    const [photo, setPhoto] = useState()
    const [loader, setLoader] = useState(false)
    console.log(photo)
    async function SendFile(e) { 
        const formData = new FormData();
        formData.append("file", e.target.files[0])
        try {
            setLoader(true)
            const res = axios.post(`${baseurl}/files/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${getCookie('session')}`
                }
            })
                .then(res => {
                    const data = res.data.fullurl 
                    setPhoto((...v) => [data])
                    updateValue(name, data, null, setValid)
                    if (!res.data.fullurl) {
                        setPhoto((...v) => [null])
                    }
                    setLoader(false)

                })
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <>
            {loader ?                                                         
                <div class="spinner-border text-primary mt-2" role="status"> 
                    <span class="sr-only "></span>
                </div> : <div class="mb-3 input-group custom-file-button">
                    <label className="input-group-text mt-2" for="inputGroupFile" >{label}</label>
                    {photo || value ? '' :  <input type="file"
                        className={`form-control mt-2`}
                        id={name}
                        name={name}
                        key={name}
                        onChange={(e) => SendFile(e)}
                    />}
                </div>
            }
            {photo || value ? <div><label className="fw-bold form-label mt-2 d-flex" style={{ marginBottom: '-25px' }}>{required ? <div className="requiredField">*</div> : ''}&nbsp;{label}</label>
                <img className="w-25" src={value ? value : photo} /></div> : ''} 
            <div className="invalid-feedback">
                {valid.error}
            </div>
        </>

    )
}

export default File;