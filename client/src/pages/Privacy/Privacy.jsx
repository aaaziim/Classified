import React from 'react'
import Breadcrumb from '../Components/Breadcrumb'
import DynamicTitlePage from '../Components/DynamicTitlePage'

const Privacy = () => {
  return (
    <div>
         <div className='space-y-4 mb-4'>
         <DynamicTitlePage title={`Privacy Policy | SideGurus`} />

      <Breadcrumb
       title={"Privacy Policy"}
       subTitle={"Here you can read safety information"}>
       </Breadcrumb>
    </div>
   
   
    </div>
  )
}

export default Privacy
