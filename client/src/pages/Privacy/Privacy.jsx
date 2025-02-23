import React from 'react'
import { Helmet } from 'react-helmet-async'
import Breadcrumb from '../Components/Breadcrumb'

const Privacy = () => {
  return (
    <div>
         <div className='space-y-4 mb-4'>
      <Breadcrumb
       title={"Privacy Policy"}
       subTitle={"Here you can read safety information"}>
       </Breadcrumb>
    </div>
        <Helmet>
                          <title>Privacy</title>
          </Helmet>
    </div>
  )
}

export default Privacy
