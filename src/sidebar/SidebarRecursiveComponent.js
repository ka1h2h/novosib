import React from "react"
import { NavLink, useLocation } from "react-router-dom"
import './css/main.css'

export const RecursiveComponent = ({ item, url, title, icon }) => {  
  const { pathname } = useLocation() 
  const path = url; 
  
  return (

    <li className={`list-group-item hover-text d-flex align-items-center p-3  ${path === pathname ? 'active' : ''} `}>
      <i className="material-icons">{icon} &nbsp;</i>
      <NavLink to={url}><span className='list-group-item-text'>{title}</span></NavLink>
      {Array.isArray(item) ? (
        <>
          {item.map(item => (
            <>
              <li className="list-group-item hover-text d-flex align-items-center p-3"><RecursiveComponent key={item.title} {...item} /></li>
            </>
          ))}
        </>
      ) : null}
    </li>



  )
}