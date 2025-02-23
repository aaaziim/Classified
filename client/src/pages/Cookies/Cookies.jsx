import React from 'react'
import { Helmet } from 'react-helmet-async'
import Breadcrumb from '../Components/Breadcrumb'

const Cookies = () => {
  return (
    <div>
        <Helmet>
                                <title>Cookies Policy</title>
                </Helmet>
        <h1 className="text-6xl">Cookies</h1>
        <div className='space-y-4 mb-4'>
      <Breadcrumb
       title={"Cookies Policy"}
       subTitle={"Here you can .."}>
       </Breadcrumb>
    </div>

    </div>
  )
}

export default Cookies
