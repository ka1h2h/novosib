import React from 'react'

function Toolbar({openSidebar}) {

  return (
    <svg className='toolbar' onClick={openSidebar} fill="#FCFAF5" viewBox="0 0 50 50" width="15px" height="20px">
    <path d="M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 Z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 Z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 Z"/></svg>

  )
}

export default Toolbar