import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import AdCard from './AdCard';
import { Link } from 'react-router';
const TypeTab = () => {
  return (
    <div className="my-4 ">
      <Tabs>
    <TabList>
      <Tab>Services</Tab>
      <Tab>Events</Tab>
    </TabList>

    <div className="my-10">
 
    <TabPanel>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <AdCard></AdCard>
           <AdCard></AdCard>
           <AdCard></AdCard>
           <AdCard></AdCard>
           </div>
           <div className='my-4 text-center' >
           <Link to="/all-ads">
  <button className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition w-60">
     All Services
    </button>
  </Link>
           </div>
           
    </TabPanel>
    <TabPanel>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <AdCard></AdCard>
           <AdCard></AdCard>
           </div>
           <div className='my-4 text-center' >
           <Link to="/all-ads">
  <button className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition w-60">
     All Events
    </button>
  </Link>
           </div>
    </TabPanel>
    </div>
  </Tabs>
    </div>
  )
}

export default TypeTab
