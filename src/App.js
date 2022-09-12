import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Routes, Route } from 'react-router-dom';
import SidebarContainer from './sidebar/SidebarContainer';
import Content from './main_menu/Content';
import HeaderBar from './navbar/HeaderBar';
import getCookie from './components/Cookie/getCookie';
import { useNavigate } from 'react-router-dom';
import Authorization from './components/authorization/Authorization';

function App() {
    const [auth, setAuth] = useState(getCookie('session'))  
    const [closeSidebar, setCloseSidebar] = useState(false) 
    const navigate = useNavigate() 

    const toggleSidebar = () => {   
        setCloseSidebar((prevState) => !prevState)
    }

    let ident
    if (closeSidebar) {
        ident = { paddingRight: '75px' }
    }

    useEffect(() => {  
        if (getCookie('session') === undefined) {
            setAuth(false)
            return navigate('/authorization')
        } else {
            setAuth(getCookie('session'))
        }
    }, [])

    if (!auth) {
        return (
            <div className='authorization-page'>
                <Routes>
                    <Route path='/authorization' element={<Authorization setAuth={setAuth} />} />
                </Routes>
            </div>
        )
    } else {
        return (
            <section class="vh-100 page open-menu ">
                <HeaderBar setAuth={setAuth} openSidebar={toggleSidebar} />
                <section className=" position-relative d-flex w-100 vh-100">
                    <SidebarContainer closeSidebar={closeSidebar} />
                    <div className="content" style={ident}>
                        <Content />
                    </div>

                </section>
            </section >
        )
    }

}

export default App