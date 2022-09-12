import React, { useState } from "react";
import { baseurl } from './../../../config'
import './index.css'
import Email from "../inputs/Email";
import Password from "../inputs/Password";
import brand from './assets/img_brand.png'
import car from './assets/img_car.png'
import MainmenuRepo from "../../../repositories/MainmenuRepo";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getLoginNameUser } from "../../redux/slices";
import { updateSchemesRepo } from "../../redux/schemeSlice";






const Authorization = ({ setAuth }) => {       
    const [email, setEmail] = useState('')       
    const [password, setPassword] = useState('') 
    const dispatch = useDispatch()               
    const navigate = useNavigate()               

    const handleFormSubmit = e => {             
        e.preventDefault();
    };

    async function login() {                       
        try {
            const res = await fetch(`${baseurl}/auth/login`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    login: email,
                    password: password
                })
            })
                .then(res => res.json())
                .then(res => {
                    let options = {
                        name: 'session',               
                        value: res.data.token,           
                        path: '/',                      
                        'max-age': 86400                 
                    }
                    let schemes = res.data.role.schemes || null
                    if (schemes != null) {
                        try {
                            schemes = JSON.parse(res.data.role.schemes)
                            dispatch(updateSchemesRepo(schemes))
                            
                        } catch (e) {
                            console.error(e)
                            

                        }
                    }

           
                    let frontConfig = null
                   
                    try {                                
                        frontConfig = JSON.parse(res.data.role.front_config) 
                    } catch (e) {
                        console.error(e)
                    }
                    if (frontConfig !== null && typeof frontConfig.mainmenu != undefined && Object.keys(frontConfig).length !== 0) {  
                        MainmenuRepo.setItems(frontConfig.mainmenu)
                    } else {    
                        MainmenuRepo.setItems([])
                    }

                 
                    
                    
                    //if (res.data.role.schemes !== null )




              
                    let updatedCookie = encodeURIComponent(options.name) + "=" + encodeURIComponent(options.value);                    
                    for (let optionKey in options) {
                        updatedCookie += "; " + optionKey;
                        let optionValue = options[optionKey];
                        if (optionValue !== true) {
                            updatedCookie += "=" + optionValue;
                        }
                    }
                    document.cookie = updatedCookie
                    setAuth(updatedCookie)
                    if (res.result) {               
                        dispatch(getLoginNameUser(res.data.user))
                    }
                    navigate('/')                   
                })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <div className='authorization'>
                <div><img className="authorization_brand-mobile"/></div>
                <form onSubmit={handleFormSubmit}>
                    <span>Вход</span>
                    <Email value={email} setValue={setEmail} type='text' name='email' />
                    <Password value={password} setValue={setPassword} type='password' name='password' />
                    <button type='submit' onClick={login}>Войти</button>
                </form>
                {/* <div className="authorization_img">
                    <div><img className="authorization_brand" /></div>
                    <div><img className="authorization_car" /></div>
                </div> */}
            </div>

        </>

    )

}

export default Authorization