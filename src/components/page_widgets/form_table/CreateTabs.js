
import React, { useEffect, useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap'
import Inputs from './inputs/Inputs'
import LayoutsController from './layouts/LayoutsController'



export default function CreateTabs({ SchemeFormTabs, SchemeDataAll, updateValue, fetchDataById, scheme, method }) {  
    const [objectSlots, setobjectSlots] = useState();
    useEffect(() => {
        let object = {}
        for (const zoneName in SchemeFormTabs) {
            object[zoneName] = {}
            SchemeFormTabs[zoneName].tabs.forEach((element, index) => {
                object[zoneName][index] = {}
                for (const slotName in element.slots) {
                    object[zoneName][index][slotName] = []
                    for (const nameField in element.slots[slotName]) {
                        object[zoneName][index][slotName].push(<Inputs scheme={scheme}  method={method} field={nameField} updateValue={updateValue} fetchDataById={fetchDataById} SchemeDataAll={SchemeDataAll} />)
                    }
                }
            });
        }
        setobjectSlots(object)
    }, [])
 
    function RenderTabs() {  
        return (
            <div className='m-5 mb-1'>
                {
                    Object.keys(SchemeFormTabs).map((value, index) => 
                    
                   
                        <div>
                            {SchemeFormTabs[value].tabs.length < 2 ? <LayoutsController layout={SchemeFormTabs[value].tabs[0].layout} object={objectSlots[value][0]} /> : (
                            <Tabs defaultActiveKey={SchemeFormTabs[value].tabs[0].title} id="uncontrolled-tab-example" className="mb-3" key={index}>
                                {Object.keys(SchemeFormTabs[value].tabs).map((key2, index2) =>
                                    <Tab eventKey={SchemeFormTabs[value].tabs[key2].title} title={SchemeFormTabs[value].tabs[key2].title} key={index2}>
                                        <LayoutsController layout={SchemeFormTabs[value].tabs[key2].layout} object={objectSlots[value][key2]} />
                                    </Tab>
                                )}
                            </Tabs>
                            )}
                        </div>
                    )
                }
            </div>
        )
    }

    return (
        <>
            {!objectSlots ? '' : <RenderTabs />}
        </>
    )
}
