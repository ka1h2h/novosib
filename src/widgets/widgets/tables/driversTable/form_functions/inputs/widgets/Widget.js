import React from "react"
import AnyText from './widgets_list/inputs/AnyText';
import Dropdown from './widgets_list/selects/Dropdown'
import Text from './widgets_list/textarea/text'
import File from "./widgets_list/inputs/File";
import Orders from "./widgets_list/orders/Orders";
import Description from "./widgets_list/description/Description";
import M2mTable from "./widgets_list/compound/M2mTable";


function Widget({                // это виджет контроллер, который проверяет, какой к нему виджет в данный момент прилетел и соответственно отрисовывает его
    value,
    fetchDataById,
    updateValue,
    updateValueM2mTable,
    name,
    filter,
    table_name,
    label,
    widget,
    readOnly,
    required,
    placeholderField,
    scheme,
    refs,
    SchemeDataAll,
    method,
    type,
    labelKey,
    refKey,

  
}) {

  
    if (widget === 'dropdown') {             
        return (
            <Dropdown
                value={value}
                updateValue={updateValue}
                name={name}
                label={label}
                refs={refs}
                labelKey={labelKey}
                updateValueM2mTable={updateValueM2mTable}
                type={type}
                required={required}
                refKey={refKey}
               

            />
        )
    }
    
    if (widget === 'string') {  
        return (
            <AnyText
                value={value}
                fetchDataById={fetchDataById}
                updateValue={updateValue}
                name={name}
                label={label}
                readOnly={readOnly}
                required={required}
                placeholderField={placeholderField}
                
            />
        )
    }
    if (widget === 'text') {  
        return (
            <Text
                fetchDataById={fetchDataById}
                updateValue={updateValue}
                name={name}
                label={label}
                required={required}
                placeholderField={placeholderField}
              
                
            />
        )
    }  
    if (widget === 'file') {       
        return (
            <File
                name={name}
                label={label}
                updateValue={updateValue}
                value={value}
                required={required}
              
            />
        )
    }

    if (widget === 'table') {
        
        return (
            <Orders
                fetchDataById={fetchDataById}
                filter={filter}
                table_name={table_name}

            />
        )
    }
    if (widget === 'M2mTable') {   
        return (
            <M2mTable
                fetchDataById={fetchDataById}
                name={name}
                SchemeDataAll={SchemeDataAll}
                method={method} 
                
                />
        )
    }
    if (widget === 'description') {  
        return (
            <Description
                value={value}
                updateValue={updateValue}
                name={name}
                label={label}
                
            />
        )
    }

    return (              
        <AnyText value={value}
            fetchDataById={fetchDataById}
            updateValue={updateValue}
            required={required}
            name={name}
            label={label}
            readOnly={readOnly}
            placeholderField={placeholderField}
           
           
 />
    )
}

export default Widget