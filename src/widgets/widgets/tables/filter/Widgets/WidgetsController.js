import React from 'react'
import Dropdown from './dropdowns/dropdown'
import DateRange from './date/date_range'

function WidgetsController({filter, generateLinkParams}) {   
  if(filter.widget === "dropdown"){
    return Dropdown({filter, generateLinkParams})
  }
  if(filter.widget === "date_range"){
    return DateRange({filter, generateLinkParams})
  }
  return (
    ''
  )
}

export default WidgetsController