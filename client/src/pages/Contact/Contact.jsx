import React from 'react'
import { Helmet } from 'react-helmet-async'
import Breadcrumb from '../Components/Breadcrumb'

const Contact = () => {
  return (
    <div>
        <Helmet>
                          <title>Contact</title>
          </Helmet>
          <div className='space-y-4 mb-4'>
      <Breadcrumb
       title={"Contact Us"}
       subTitle={"Sent us a message"}>
       </Breadcrumb>
    </div>
    </div>
  )
}

export default Contact
