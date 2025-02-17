import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import AdCard from './AdCard';
const TypeTab = () => {
  return (
    <div className="my-4">
      <Tabs>
    <TabList>
      <Tab>All Ads</Tab>
      <Tab>Services</Tab>
      <Tab>Events</Tab>
    </TabList>

    <div className="my-10">
    <TabPanel >
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <AdCard></AdCard>
           <AdCard></AdCard>
           <AdCard></AdCard>
           <AdCard></AdCard>
           <AdCard></AdCard>
           <AdCard></AdCard>
           <AdCard></AdCard>
           </div>
    </TabPanel>
    <TabPanel>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <AdCard></AdCard>
           <AdCard></AdCard>
           <AdCard></AdCard>
           <AdCard></AdCard>
           </div>
    </TabPanel>
    <TabPanel>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <AdCard></AdCard>
           <AdCard></AdCard>
           </div>
    </TabPanel>
    </div>
  </Tabs>
    </div>
  )
}

export default TypeTab
