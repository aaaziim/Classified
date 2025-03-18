import React from 'react'
import HowItWorks from './HowItWorks'
import Breadcrumb from '../Components/Breadcrumb'
import DynamicTitlePage from '../Components/DynamicTitlePage'

const About = () => {
  return (
    <div>
    
          <div className='space-y-4 mb-4'>
      <DynamicTitlePage title="About | SideGurus" />

      <Breadcrumb
       title={"About Us"}
       subTitle={"Welcome to Website, where talent meets opportunity!"}>
       </Breadcrumb>
    </div>
   <div className="space-y-2 my-4 px-4">


    <div >
     <div className='space-y-2'>
     <p className="text-xl text-justify">
      We believe that everyone has a skill, a passion, or a hustle that deserves to be seen. Whether you’re a seasoned professional, a self-taught expert, or someone just getting started, Website empowers individuals and small businesses to showcase their services and connect with clients in their local community.
      </p>
      <p className="text-xl text-justify">
     
      Our platform is designed to make it easier than ever to turn your side hustle into a thriving business. From hairstylists and tutors to personal trainers, handymen, and creatives—Website is where local talent shines.
      </p>
     </div>
    

    </div>
    <div className='px-10 py-4'>
      <h2 className="text-2xl font-semibold my-2">
      Why Choose Website?
      </h2>
          <div className="text-xl text-justify">
            <ul className='list-disc'>
              <li>
              Empowerment – We give individuals and small businesses a platform to promote their skills and earn on their own terms.
              </li>
              <li>
              Local Connections – Build lasting relationships with clients in your own community.
              </li>
              <li>
              No Middleman – Connect directly with customers and keep more of what you earn.
              </li>
              <li>
              Simple & Affordable – No complicated processes, just a straightforward way to advertise your services.
              </li>

            
            </ul>
         
 

          </div>
          <p className='text-xl text-justify'>
          At Website, we believe that your talent is valuable, your skills deserve recognition, and your side hustle can be your next big success.
Post today and start turning your expertise into income—one gig at a time! 🚀 

          </p>
         <div className='text-xl font-semibold space-y-2 mt-4'>
         <p >
          <strong>Help Us Grow!  </strong>
          </p>
          <p className=' text-red-600'>
<a href="#">Print it.</a> Post it. Spread the word! 📌


</p>
         </div>
     </div>
     <div className='text-xl text-justify' >
      <p className=' my-2'>Website is your go-to platform for local gigs, side hustles, and skilled services. Whether you're a professional or just starting out, we connect you with clients who need your expertise!
Support our mission—download our flyer, share it in your community, and help us grow! 💼💡

</p>
<p>
Let’s build opportunities together. Visit us today! 🎯
</p>
     </div>
     <HowItWorks></HowItWorks>
    </div>
    </div>
 
  )
}

export default About
