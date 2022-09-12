import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

const Password = (props) => { 
    const [checkPassword, setCheckPassword] = useState(false)
    const [passwordError, setPasswordError] = useState('* пароль не может быть пустым') 
 

    const blurHandler = (e) => {  
        switch (e.target.name) {
            case 'password':
                setCheckPassword(true);
                break
        }
    }

    const passwordHandler = (e) => {    
        setCheckPassword(true)
        props.setValue(e.target.value)
        if (e.target.value.length < 3 || e.target.value.length > 55) {
            setPasswordError('* пароль должен быть не менее 3 и не более 55')
            if (!e.target.value) {
                setPasswordError('* пароль не может быть пустым')
            }
        } else {
            setPasswordError('')
        }
    }

  
    return (
        <>
            {(checkPassword && passwordError) ? <p className='error'>{passwordError}</p> : <label>Пароль</label>}
            <input className='inputs' value={props.value} onChange={passwordHandler} onBlur={e => blurHandler(e)}
                type={props.type} name={props.name} />
        </>
    )
}

export default Password