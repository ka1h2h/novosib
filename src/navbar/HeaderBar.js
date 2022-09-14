import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './assets/logo.png'
import './../App.css'
import removeCookie from '../components/Cookie/removeCookie';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import Svg from './assets/Svg';
import Toolbar from './Toolbar';
import { removeSchemesRepo } from '../redux/schemeSlice';


function HeaderBar({ setAuth, openSidebar }) { 
    const work = useSelector(state => state.user)  
    const [worker, setWorker] = useState()  
    const dispatch = useDispatch()
    useEffect(() => {              
        setWorker(localStorage.getItem('worker'))
    }, [worker])


    return (
        <nav className="navbar py-3 px-2">
            <div className="container-fluid d-flex justify-content-end items-align-center">
            <div className='brand-name ms-4 mt-1 d-flex align-items-center'>
            <Toolbar openSidebar={openSidebar}/>  
                    <span className="mx-3 logo-text"></span><img className='logo' /></div>
                <ul className='d-flex align-items-center m-0 p-0'>
                    <li className="nav-item me-4 list-unstyled">
                        <span className='text-dark fw-bold'>{worker || work}</span>
                    </li>
                    <Link to='/authorization' className='border-0 text-primary text-decoration-none text-danger m-1 px-2' onClick={() => { removeCookie('session'), dispatch(removeSchemesRepo()), setAuth(false) }}>выйти</Link>  
                </ul>
            </div>
        </nav>
    )
}

export default HeaderBar