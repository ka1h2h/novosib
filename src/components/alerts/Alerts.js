import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css'



function Alert({ message, type, setAlertResult }) {        
  const [animated, setAnimated] = useState('animate__animated animate__fadeInDown')
  setTimeout(() => {
    setAnimated('animate__animated animate__fadeOutUp')
    setTimeout(() => { setAlertResult(false) }, 500)
  }, 2000)
  if (type === 'error') {
    return (
      <div className={`alert alert-danger fixed-top ${animated}`} role="alert">
        {message}
      </div>
    )
  }
  if (type === 'success') {
    return (
      <div className={`alert alert-success fixed-top ${animated}`} role="alert">
        {message}
      </div>
    )
  }
}

export default Alert