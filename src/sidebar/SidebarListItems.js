import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import 'material-design-icons/iconfont/material-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RecursiveComponent } from './SidebarRecursiveComponent'
import './css/main.css'

import MainmenuRepo from '../../repositories/MainmenuRepo';




function SidebarListItems() {  


  return (
    <>
      {MainmenuRepo.items().map(element => (
        <RecursiveComponent key={`${element.item}`} {...element} />   
        )
      )}
    </>
  )
}

export default SidebarListItems