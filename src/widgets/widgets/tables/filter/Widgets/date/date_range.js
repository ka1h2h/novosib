import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker"
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css"

function DateRange({ filter, generateLinkParams }) {  
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
  const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']

  const locale = {
    localize: {
      day: n => days[n],
      month: n => months[n]
    },
    formatLong: {
      date: () => 'mm/dd/yyyy'
    }
  }


  function selectDate(dateRange) {
    setDateRange(dateRange)
    if(dateRange[0] !== null && dateRange[1] !== null){
    const date1 = parseInt(dateRange[0].getTime() / 1000)
    const date2 = parseInt(dateRange[1].getTime() / 1000 + 86399)
    const dateRangeTimestamp = [date1,date2]
    generateLinkParams(filter.field, 'range', dateRangeTimestamp)
    }
  }

  useEffect(()=>{
    setDateRange[null, null]
  },[filter])

  return (
    <>
      <DatePicker
        className="border input-custom"
        dateFormat="yyyy-dd-MM"
        selectsRange={true}
        onChange={(update) => {
          selectDate(update);
        }}
        locale={locale}
        maxDate={new Date()}
        isClearable={true}
        startDate={startDate}
        endDate={endDate}
      />
    </>
  );
}

export default DateRange