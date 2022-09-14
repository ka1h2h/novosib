import React from 'react'

function TableCalculator({schemeHeaders, field, fetchData}) { 
    let sum = 0;
    for (let item in fetchData) {
     if (schemeHeaders[field].sum) {
         if(String(typeof parseInt(fetchData[item][field])) === "number" && fetchData[item][field] !== '') {
             sum += parseInt(fetchData[item][field])
         }
     }
    }

   if (field === 'id') {
    return <td>Итого</td>
   }
   if (schemeHeaders[field].sum) {
    return <td>{sum}</td>
   }
    else {
      return <td></td>
      }
}

export default TableCalculator