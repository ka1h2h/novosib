import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { baseurl } from '../../../../../../../config'
import AsyncSelect from 'react-select/async'
import getCookie from '../../../../../../components/Cookie/getCookie'
import axios from 'axios';

function Dropdown({filter, generateLinkParams}) {  

    const [filterState, setFilterState] = useState()
    const [selectedOption, setSelectedOption] = useState('')

    useEffect(() => {    
        const loadOptions = []
        axios.get(`${baseurl}/${filter.ref}`,{
            headers:{
                'Authorization': `Bearer ${getCookie('session')}`
            }
        }).then(({data})=>{
            for (let i = 0; i < data._children.length; i++) {
                let object = {}
                object["value"] = data._children[i].id
                object["label"] = data._children[i].name
                loadOptions.push(object)
            }
            setFilterState(loadOptions)
        }).catch((e)=>{
            console.log('oops')
        })

        setSelectedOption('')
    }, [filter])
 
    function selectOptions(e){ 
        setSelectedOption(e)
        generateLinkParams(filter.field, 'comma', e)  
    }

    return (
        <>
            {(() => {
                return (
                    <>
                        <AsyncSelect
                            className='async-select fs-6'
                            value={selectedOption}
                            defaultOptions={filterState}
                            options={filterState}
                            onChange={(e)=>{selectOptions(e)}}
                            isMulti={filter.multiply || false}
                            noOptionsMessage={()=>{ return "Ничего не найдено"}}
                            placeholder={'Выбрать'}
                        />
                    </>
                )
            }
            )()}
        </>
    )
}


export default Dropdown