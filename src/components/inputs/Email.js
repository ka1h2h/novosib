import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

const Email = (props) => {  



    const [checkEmail, setCheckEmail] = useState(false) 
    const [emailError, setEmailError] = useState('* e-mail не может быть пустым') 

    const blurHandler = (e) => {                             
        switch (e.target.name) {
            case 'email':
                setCheckEmail(true);
                break
        }
    }
    const emailHandler = (e) => {       
        setCheckEmail(true)
        props.setValue(e.target.value)
        if (e.target.value.length < 3 || e.target.value.length > 55) {
            setEmailError('* email должен быть не менее 3 и не более 55')
            if (!e.target.value) {
                setEmailError('* email не может быть пустым')
            }
        } else {
            setEmailError('')
        }
    }

    return (
        <>
            {(checkEmail && emailError) ? <p className='error'>{emailError}</p> : <label>E-mail</label>}
            <input className='inputs' value={props.value} onChange={emailHandler}
                onBlur={e => blurHandler(e)} type={props.type} name={props.name} />
        </>
    )
}

export default Email