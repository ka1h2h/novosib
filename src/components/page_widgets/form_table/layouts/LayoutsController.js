import React from 'react';
import DefaultLayout from './layouts_list/default'
import DefaultLayoutTwo from './layouts_list/defaultTwo';

function LayoutsController(props) { 
    if (props.layout === 'default') {
        return (
            <DefaultLayout object={props.object} />
        )
    }
    if (props.layout === 'defaultTwo') {
        return (
            <DefaultLayoutTwo object={props.object} />
        )
    }
}

export default LayoutsController