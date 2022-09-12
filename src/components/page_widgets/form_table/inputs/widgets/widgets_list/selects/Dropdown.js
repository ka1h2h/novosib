import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import AsyncSelect from 'react-select/async'
import React from "react";
import getCookie from '../../../../../../Cookie/getCookie';
import { baseurl } from '../../../../../../../../config';

function Dropdown({ 
    value,
    updateValueM2mTable,
    updateValue,
    name,
    type,
    label,
    refs,
    required,
    labelKey,
    refKey
}) {

 
   
    const [valid, setValid] = useState({ validate: null, error: '' })
    const [loading, setLoading] = useState(false)
    const [options, setOptions] = useState()
    const validStatus = () => {
        if (valid.validate === false) {
            return 'is-invalid'
        }
        if (valid.validate === true) {
            return 'is-valid'
        }
    }
 
    let data 
    if (!value) {   
        data = { value: null, label: 'Не выбрано' }
    }
    else { 
        data = { value: [value], label: value.name || value.lp }
    }


    const [selectedOption2, setSelectedOption] = useState(data) 


    useEffect(() => {   
        const loadOptions = []
        let dataOptions;
        let response = fetch(`${baseurl}/${refs}`, {
            headers: {
                'Authorization': `Bearer ${getCookie('session')}`
            }
        })
            .then(response => response.json())
            .then(json => {
                dataOptions = json._children
                for (let i = 0; i < dataOptions.length; i++) {
                    let object = {}
                        object["value"] = dataOptions[i].id 
                    if (type === 'M2mTable') {
                        object["value"] = dataOptions[i].id 
                    }
                    object["label"] = dataOptions[i].name || dataOptions[i][labelKey]
                    loadOptions.push(object)
                }
                setOptions(loadOptions)
            })
    }, [])


    async function Options() { 
        let dataOptions;
        let response = await fetch(`${baseurl}/${refs}`, {
            headers: {
                'Authorization': `Bearer ${getCookie('session')}`
            }
        });
        let json = await response.json();
        dataOptions = json._children
        for (let i = 0; i < dataOptions.length; i++) {
            let object = {}
            object["value"] = dataOptions[i].id
            object["label"] = dataOptions[i].name || dataOptions[i]
            options.push(object)
        }
        return new Promise((resolve) => {
            resolve(options)
        })
    }   

    const ChangeSelect = selectedOption => { 
        if (String(typeof type) !== 'undefined') {
            setSelectedOption({ value: selectedOption.value, label: options[value] })
            updateValueM2mTable([name], selectedOption.value, null, setValid)
        }
        if (String(typeof updateValue) === 'undefined') {
            updateValueM2mTable(name, selectedOption.value, null, setValid) 
            setSelectedOption({ value: [selectedOption.value], label: options[value] })
            return
        }
        if (String(typeof selectedOption.value) !== 'undefined') {
            setSelectedOption({ value: selectedOption.value, label: options[value] })
            updateValue(name, selectedOption.value, null, setValid) 
            return
        }
        if (selectedOption2.value === null) {
            setSelectedOption({ value: selectedOption.value, label: options[value] }) 
            updateValue(name, selectedOption.value, null, setValid) 
        }
    
     
        return
    }

    const handleBlur = () => {   
        if (String(typeof type) === 'M2mTable') {
            updateValueM2mTable(name, selectedOption.value, null, setValid)
        }
        if (String(typeof type) === 'undefined') {
            updateValue(name, selectedOption2.value, null, setValid) 
        }
    }


    return (
        <>
            <div>
                {type ? '' : <label for={name} className={'mb-2 form-label fw-bold d-flex'}>{required ? <div className="requiredField">*</div> : ''}&nbsp;{label}</label>}
                <AsyncSelect
                    className={`basic-single mb-2  ${validStatus()}`}
                    classNamePrefix="select "
                    defaultValue={selectedOption2}
                    defaultOptions={options}
                    loadOptions={Options}
                    isSearchable={true}
                    isLoading={loading}
                    options={options}
                    name={name}
                    onChange={ChangeSelect}
                    onSelect={handleBlur}
                />
                <div class="invalid-feedback">{valid.error}</div>
            </div>
        </>
    )
}

export default Dropdown;