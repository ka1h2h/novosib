import React from "react"
import Widget from "./widgets/Widget";

function Inputs({ SchemeDataAll, scheme, updateValue, fetchDataById, field, method }) {
    return (
        <>
            {
                (() => {
                    const settings = SchemeDataAll[field].widget_settings

                    if (String(typeof SchemeDataAll[field].table_name) === 'undefined') {
                        SchemeDataAll[field].table_name = 'none'
                    }
                    if (String(typeof SchemeDataAll[field].filter) === 'undefined') {
                        SchemeDataAll[field].filter = 'none'
                    }


                    if (settings !== undefined && settings !== null && settings.length !== 0 && String(settings) !== 'undefined') {
                        return (
                            <Widget
                                value={fetchDataById[field]}
                                fetchDataById={fetchDataById}
                                updateValue={updateValue}
                                name={field}
                                filter={SchemeDataAll[field].filter}
                                table_name={SchemeDataAll[field].table_name}
                                label={SchemeDataAll[field].title}
                                widget={SchemeDataAll[field].widget}
                                widget_settings={SchemeDataAll[field].widget_settings}
                                readOnly={SchemeDataAll[field].readOnly}
                                required={SchemeDataAll[field].required}
                                placeholderField={SchemeDataAll[field].placeholder}
                                refKey={SchemeDataAll[field].refKey}
                                scheme={scheme}
                                refs={SchemeDataAll[field].ref}
                                SchemeDataAll={SchemeDataAll}
                                method={method}
                            />
                        )
                    }

                    return (
                        <Widget value={fetchDataById[field]}
                            fetchDataById={fetchDataById}
                            updateValue={updateValue}
                            name={field}
                            filter={SchemeDataAll[field].filter}
                            table_name={SchemeDataAll[field].table_name}
                            label={SchemeDataAll[field].title}
                            widget={SchemeDataAll[field].widget}
                            refs={SchemeDataAll[field].ref}
                            dependent_child={SchemeDataAll[field].dependent_child}
                            readOnly={SchemeDataAll[field].readOnly}
                            required={SchemeDataAll[field].required}
                            placeholderField={SchemeDataAll[field].placeholder}
                            refKey={SchemeDataAll[field].refKey}
                            scheme={scheme}
                            widget_list={SchemeDataAll[field].widget_list}
                            SchemeDataAll={SchemeDataAll}
                            method={method}
                        />
                    )

                }
                )()
            }
        </>
    )





}
export default Inputs