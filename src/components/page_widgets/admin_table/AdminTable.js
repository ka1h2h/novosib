import React, { useEffect, useState } from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import getCookie from '../../../components/Cookie/getCookie';
import edit from '../../../icons/edit.png'
import folder from '../../../icons/folder.svg'
import file from '../../../icons/file.svg'
import Moment from 'react-moment';
import FiltersCreator from './filter/FiltersCreator';
import TableCalculator from './calculator/TableCalculator';



const AdminTable = ({ apiUrl, scheme, pageUrl, types  }) => {   
  const { id } = useParams()  
  const location = useLocation()  
  const typesSupport = scheme.fields.types || undefined  
  location.pathname = '/' + String(location.pathname).split('/')[1]  
  const schemeHeaders = scheme.views.table  
  const [fetchData, setFetchData] = useState(false)
  const [filterHidden, setFilterHidden] = useState(false) 
  const [load, setLoad] = useState(false) 
  const [query, setQuery] = useState('')  
  const navigate = useNavigate()  

  async function getData(filter) { 
    let url = apiUrl  
    if (!filter) {           
      if (String(typeof id) !== 'undefined') {
        url += `/${id}`
      }
    } else {
      url += `/${filter}`
    }
    try {
      const response = await axios.get(url, {
        headers: {   
          'Authorization': `Bearer ${getCookie('session')}`
        }
      })
      const data = response.data
      return setFetchData(data._children)   
    } catch (e) {
      console.error(e)
    }
  }
  async function applyFilters(linkParams) { 
    getData(linkParams)   
    setFilterHidden(true)
  }



  useEffect(() => {   
    setFetchData(false)
    getData() 
    setLoad(true) 
  }, [id, apiUrl, scheme])

  function Table() {    
    return (
      <tbody>
       {fetchData.filter((post) => {  
            if (query === '') {
              return post;
            } else if (post.name.toLowerCase().includes(query.toLowerCase())) {
              return post
            }
        }).map((tableRow, rowIndex) => { 
          let color
          if (tableRow.status !== 'undefined' && tableRow.status) {
            color = tableRow.status.color
          }
 
          return (
            <>
              <tr key={rowIndex} onClick={() => { navigate(`${pageUrl}/${fetchData[rowIndex].id}/edit`) || `${pageUrl}/${fetchData[rowIndex].uid}/edit)`}} className='border-1 border-top-0 border-start-0 border-end-0' style={{ backgroundColor: color }}>
                {
                  typesSupport === undefined ? (
                    ''
                  ) : (
                    (() => {  
                      switch (String(typeof fetchData[rowIndex].types) !== 'undefined' && fetchData[rowIndex].types.name) {
                        case "file": return <td className='text-dark py-2 align-middle'><img src={file} height="28px" /></td>;
                        case "folder": return <td className='text-dark py-2 align-middle'><img src={folder} height="28px" /></td>;
                        default: return "";
                      }
                    })()
                  )
                }
                {Object.keys(schemeHeaders).map((columnName, columnIndex) => {   
         
                  return (
                    ((() => {
                      if (String(typeof fetchData[rowIndex][columnName]) === 'object' && fetchData[rowIndex][columnName] !== null) {
                        if (String(typeof fetchData[rowIndex][columnName].name) !== 'undefined') {
                          return <td className='text-dark p-2 align-middle' key={columnIndex}>{fetchData[rowIndex][columnName].name}</td>
                        }
                      }

                      if (String(typeof fetchData[rowIndex][columnName]) === 'object' && fetchData[rowIndex][columnName] !== null) {
                      
                        return <td className='text-dark p-2 align-middle' key={columnIndex}>{fetchData[rowIndex][columnName].name || fetchData[rowIndex][columnName].lp || fetchData[rowIndex][columnName].id}</td>
                      }
                      if (columnName === 'name') {
                        if (String(typeof fetchData[rowIndex].types) !== 'undefined') {
                          if (fetchData[rowIndex].types.name === 'folder') {
                            return (
                              <td className='p-2 align-middle' key={columnIndex}><Link to={`${pageUrl}/${fetchData[rowIndex].id}/edit`} className="text-decoration-none">
                                {fetchData[rowIndex][columnName]}</Link></td>
                            )
                          } else {
                            return (
                              <td className='p-2 align-middle' key={columnIndex}><Link to={`${pageUrl}/${fetchData[rowIndex].id }/edit`} className="text-decoration-none">
                                {fetchData[rowIndex][columnName]}</Link></td>
                            )
                          }
                        }
                        return (
                          <td className='p-2 align-middle' key={columnIndex}><Link to={`${pageUrl}/${fetchData[rowIndex].id}/edit`} className="text-decoration-none">
                            {fetchData[rowIndex][columnName]}</Link></td>
                        )
                      }


                      if (columnName === 'created') {
                        return <td className='text-dark p-2 align-middle' key={columnIndex}><Moment format='DD.MM.YYYY HH:mm'>{fetchData[rowIndex][columnName]}</Moment></td>
                      }
                      if (columnName === 'updated') {
                        return <td className='text-dark p-2 align-middle' key={columnIndex}><Moment format='DD.MM.YYYY HH:mm'>{fetchData[rowIndex][columnName]}</Moment></td>
                      }
                      if (columnName === 'id' && types !== 'modal') {
                        if (String(typeof fetchData[rowIndex].types) !== 'undefined') {
                          if (fetchData[rowIndex].types.name === 'folder') {
                            return (
                              <td className='p-2 align-middle' key={columnIndex}><Link to={`${pageUrl}/${fetchData[rowIndex].id}`} className="text-decoration-none">
                                {fetchData[rowIndex][columnName]}</Link></td>
                            )
                          } else {
                            return (
                              <td className='p-2 align-middle' key={columnIndex}><Link to={`${pageUrl}/${fetchData[rowIndex].id}/edit`} className="text-decoration-none">
                                {fetchData[rowIndex][columnName]}</Link></td>
                            )
                          }
                        }
                        return (
                          <td className='p-2 align-middle' key={columnIndex}><Link to={`${pageUrl}/${fetchData[rowIndex].id}/edit`} className="text-decoration-none">
                            {fetchData[rowIndex][columnName]}</Link></td>
                        )
                      }
                      if (columnName === 'id' && types === 'modal') {
                        if (String(typeof fetchData[rowIndex].types) !== 'undefined') {
                          if (fetchData[rowIndex].types === 'folder') {
                            return (
                              <td className='p-2 align-middle' key={columnIndex}><Link to={`${pageUrl}/${fetchData[rowIndex].id}`} className="text-decoration-none">
                                {fetchData[rowIndex][columnName]}</Link></td>
                            )
                          } else {
                            return (
                              <td className='p-2 align-middle' key={columnIndex}><Link to={`${pageUrl}/${fetchData[rowIndex].id}/edit`} className="text-decoration-none">
                                {fetchData[rowIndex][columnName]}</Link></td>
                            )
                          }
                        }
                        return (
                          <td className='p-2 align-middle' key={columnIndex}><Link to={`${pageUrl}/${fetchData[rowIndex].id}/edit`} className="text-decoration-none">
                            {fetchData[rowIndex][columnName]}</Link></td>
                        )
                      }
                      if (columnName === 'filters') {
                        return ''
                      }
                      return <td className='text-dark p-2 align-middle' key={columnIndex}>{fetchData[rowIndex][columnName]}</td>
                    })())
                  )
                })
                }
                <td className='text-dark p-2 align-middle '><Link to={`${pageUrl}/${tableRow.id}/edit`}><img src={edit} height="22px" /></Link></td>

              </tr>
            </>
          )
        })}
      </tbody>
    )
  }

  if (!load) { 
    return ('')
  }
  return (
    <>

      <div className='contianer-fluid table-bg px-5  overflow-auto '>
        <div className=" table-bg folders w-100 ">
          <div className="row">
            <div className="d-flex justify-content-between mt-4">
              <div className=' fs-4 text-center'>{scheme.title ? scheme.title : scheme.scheme}</div>
              {
                typesSupport === undefined ? (
                  <div className='d-flex'>
                    {schemeHeaders.filters ? <button className='btn btn-black mx-2 d-block' onClick={() => {
                      if (!filterHidden) {
                        setFilterHidden(true)
                      } else {
                        setFilterHidden(false)
                      }
                    }}>{filterHidden ? 'Скрыть' : 'Фильтры'}</button> : ''}
                    {scheme.views.form_add ?  <Link to={`${location.pathname}/${id || 0}/add`} className="btn btn-black m-0">Создать запись</Link> : ''}
                   
                  </div>
                ) : (
                  <>
                    <Link to={`${location.pathname}/${id || 0}/add/file`} className="btn btn-black btn-file">Создать файл</Link>
                    <Link to={`${location.pathname}/${id || 0}/add/folder`} className="btn btn-black btn-folder m-0">Создать папку</Link>
                  </>
                )
              }
            </div>
            {(() => {  
              if (String(typeof schemeHeaders.filters) !== 'undefined') {
                return (
                  <>
                    <div className='position-relative'>
                      <FiltersCreator filters={schemeHeaders.filters} applyFilters={applyFilters} filterHidden={filterHidden} /> 
                    </div>
                  </>
                )
              }
            })()}
          </div>
          <hr />
          <div className="table-responsive table-bg">
            <table className="table table-admin  " style={{ boxShadow: "none" }}>
              <thead>
        {/* <input className="mb-2 inputform" type="search" placeholder="Поиск"
            aria-label="Search" onChange={event => setQuery(event.target.value)} /> */}
          <tr className='' >
            {
              typesSupport === undefined ? (
                ''
              ) : (
                <>
                  <th style={{ width: '20px' }}></th>
                </>
              )
            }
            {Object.keys(schemeHeaders).map((header, index) => {
              return (
                header === "filters" ? '' : <th key={index}>{schemeHeaders[header].title}</th>
              )

            })}
            <th>Опции</th>
          </tr>
        </thead>
        {fetchData ? <Table /> : ''} 
        {schemeHeaders.total ? <tfoot>
          <tr>
            {Object.keys(schemeHeaders).map((header, index) => {
              return (
                <TableCalculator schemeHeaders={schemeHeaders} field={header} fetchData={fetchData} /> 
              )
            })}
          </tr>
        </tfoot> : ''}
      </table>
    </div>
  </div>
</div >
</>
)
}

export { AdminTable }
