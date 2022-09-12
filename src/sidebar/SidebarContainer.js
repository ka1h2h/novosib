import React from 'react'
import SidebarListItems from './SidebarListItems'
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';



function SidebarContainer({ closeSidebar }) {  
    function TogggleSidebar() {  
        if (!closeSidebar) {
            return "left-sidebar"
        }
        if (closeSidebar) {
            return "left-sidebar-close"
        }
    }
    return (
        <>
            <section className={` ${TogggleSidebar()}`}>
                <nav>
                    <ul className="list-group list-group-custom border-0">
                        <NavLink to={'/'} >           
                            <li className={`list-group-item hover-text d-flex align-items-center p-3`}> 
                                <i className="material-icons"> home &nbsp;</i> 
                                <span className='list-group-item-text'>Главная</span>
                                {closeSidebar ? <span className="tooltip-text" id="right">Главная</span> : ''}
                            </li>
                        </NavLink>
                        {/* <SidebarListItems closeSidebar={closeSidebar} />   */}
                    </ul>
                </nav>
            </section>
        </>
    )
}

export default SidebarContainer