import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import AdCard from './AdCard';
import { Link } from 'react-router';
import EventCard from './EventCard';

const TypeTab = () => {
  return (
    <div className="my-4">
      <Tabs>
        <TabList className="flex justify-center space-x-8 mb-6">
          <Tab
            className="cursor-pointer text-lg py-2 px-4 rounded-md hover:bg-gray-200 transition relative"
            selectedClassName="bg-[#014D48] text-white"
          >
            Services
          </Tab>
          <Tab
            className="cursor-pointer text-lg py-2 px-4 rounded-md hover:bg-gray-200 transition relative"
            selectedClassName="bg-[#014D48] text-white"
          >
            Events
          </Tab>
        </TabList>

        <div className="my-10">
          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <AdCard />
              <AdCard />
              <AdCard />
              <AdCard />
            </div>
            <div className="my-4 text-center">
              <Link to="/all-services">
                <button className="px-6 py-3 bg-[#014D48] text-white rounded-lg shadow-md hover:bg-[#FA8649] transition w-60">
                  All Services
                </button>
              </Link>
            </div>
          </TabPanel>

          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <EventCard />
              <EventCard />
            </div>
            <div className="my-4 text-center">
              <Link to="/all-events">
                <button className="px-6 py-3 bg-[#014D48] text-white rounded-lg shadow-md hover:bg-[#FA8649] transition w-60">
                  All Events
                </button>
              </Link>
            </div>
          </TabPanel>
        </div>
      </Tabs>
    </div>
  );
};

export default TypeTab;
