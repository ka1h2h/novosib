import React, { useEffect, useState } from 'react'
import './../../../../../src/App.css'
import WidgetsController from './Widgets/WidgetsController'


function FiltersCreator({ filters, applyFilters, filterHidden }) { 
    const [linkParams, setLinksParams] = useState({});

    const filterBtn = () => {
        if (!filterHidden) {
            return 'filters-container-hidden'
        }
        if (filterHidden) {
            return 'filters-container'
        }
    }


    useEffect(() => {
        setLinksParams({})
    }, [filters])

    function generateLinkParams(field, typeFilter, values) {  // функция, которая генерирует ссылку для отрисовки таблицы в нужном виде
        let paramValues = []
        if (!values) {
            return;
        }
        if (!typeFilter) {
            return;
        }
        if (typeFilter === 'comma') {
            if (Array.isArray(values)) {
                if (typeof values[0].value !== undefined) {
                    for (let i = 0; i < values.length; i++) {
                        paramValues.push(values[i].value)
                    }
                    linkParams[field] = { values: paramValues, typeFilter: typeFilter }
                } else {

                    linkParams[field] = { values: paramValues, typeFilter: typeFilter }
                }

            } else {
                if (typeof values.value !== undefined) {
                    paramValues.push(values.value)
                } else {
                    paramValues.push(values)
                }
                linkParams[field] = { values: paramValues, typeFilter: typeFilter }
            }

        }

        if (typeFilter === 'range') {
            if (Array.isArray(values)) {
                linkParams[field] = { values: values, typeFilter: typeFilter }

            }
        }

    }

    function applyFiltersLocal() {  // функция, которая генерирует ссылку для отрисовки таблицы локально
        let paramsLink = '?'
        if (!linkParams) {
            return console.warn('Filters params is not valid')
        }
        let et = ''
        for (const fieldParam in linkParams) {
            if (typeof linkParams[fieldParam].typeFilter == undefined && typeof linkParams[fieldParam].values == undefined) {
                return console.warn('Filters params is not valid')
            } else {
                if (linkParams[fieldParam].values.length > 0) {
                    paramsLink += `${et}${fieldParam}=`
                    if (linkParams[fieldParam].typeFilter === 'comma') {
                        paramsLink += linkParams[fieldParam].values.join(',')
                    }
                    if (linkParams[fieldParam].typeFilter === 'range') {
                        paramsLink += linkParams[fieldParam].values.join('~')
                    }
                    et = '&';
                }
            }
        }
        applyFilters(paramsLink)
    }


    const filtersList = filters.map((filter) =>
    (
        <>
            <div className='filters-inputs ms-3'>
                <div className='mt-0 mb-2'>{filter.label}</div>
                <WidgetsController filter={filter} generateLinkParams={generateLinkParams} />
                <hr />
            </div>
        </>
    )
    );

    return (
        <div>

            <div className={`${filterBtn()}`}>
                <div className="filters d-flex" >
                    <hr />
                    {filtersList}
                </div>
                <button className="btn btn-primary mx-3 mb-3" onClick={applyFiltersLocal}>Применить</button>
            </div>
        </div>
    )
}

export default FiltersCreator