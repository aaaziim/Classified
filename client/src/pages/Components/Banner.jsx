import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router";
import carousel1 from "../../assets/images/carousel1.jpg";
import carousel2 from "../../assets/images/carousel2.jpg";
import carousel3 from "../../assets/images/carousel3.jpg";

const Banner = () => {
  return (
    <div className="relative my-4 rounded-2xl">
      <Carousel
        infiniteLoop={true}
        className="rounded-lg"
        showThumbs={false}
        showStatus={false}
        showIndicators={true}
        useKeyboardArrows={true}
      >
        <div className="relative">
          <img
            src={carousel1}
            alt="Banner 1"
            className="w-full h-full object-cover rounded-2xl"
          />
          {/* Color Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black   to-transparent rounded-2xl"></div>
          {/* Content */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
            <h2 className="text-lg md:text-3xl font-bold text-[#FA8649]">Browse Available Services</h2>
            <p className="text-sm md:text-xl font-semibold text-[#FFE5D5] ">Explore a wide range of services offered by professionals near you.</p>
            <Link to="/all-services">
              <button className="mt-2 md:mt-6 px-6 md:py-2 bg-[#FA8649] text-white font-semibold rounded-md hover:bg-[#014D48] transition-colors">
                View All Services
              </button>
            </Link>
          </div>
        </div>
        <div className="relative">
          <img
            src={carousel2}
            alt="Banner 2"
            className="w-full h-full object-cover rounded-2xl"
          />
          {/* Color Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black   to-transparent rounded-2xl"></div>
          {/* Content */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
            <h2 className="text-lg md:text-3xl font-bold text-[#FA8649]">Discover Exciting Events</h2>
            <p className="text-sm md:text-xl font-semibold text-[#FFE5D5] ">Find all the amazing events happening around you.</p>
            <Link to="/all-events">
              <button className="mt-2 md:mt-6 px-6 md:py-2 bg-[#FA8649] text-white font-semibold rounded-md hover:bg-[#014D48] transition-colors">
                View All Events
              </button>
            </Link>
          </div>
        </div>
        <div className="relative">
          <img
            src={carousel3}
            alt="Banner 3"
            className="w-full h-full object-cover rounded-2xl"
          />
          {/* Color Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black   to-transparent rounded-2xl"></div>
          {/* Content */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
            <h2 className="text-lg md:text-3xl font-bold text-[#FA8649]">Share Your Services</h2>
            <p className="text-sm md:text-xl font-semibold text-[#FFE5D5] ">Post your services and reach thousands of potential customers today</p>
            <Link to="/post-services">
              <button className="mt-2 md:mt-6 px-6 md:py-2 bg-[#FA8649] text-white font-semibold rounded-md hover:bg-[#014D48] transition-colors">
                Post Your Service
              </button>
            </Link>
          </div>
        </div>
        <div className="relative">
          <img
            src={carousel2}
            alt="Banner 4"
            className="w-full h-full object-cover rounded-2xl"
          />
          {/* Color Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black   to-transparent rounded-2xl"></div>
          {/* Content */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
            <h2 className="text-lg md:text-3xl font-bold text-[#FA8649]">Create Your Event</h2>
            <p className="text-sm md:text-xl font-semibold text-[#FFE5D5] ">Promote your upcoming events and gather the crowd you need.</p>
            <Link to="/post-events">
              <button className="mt-2 md:mt-6 px-6 md:py-2 bg-[#FA8649] text-white font-semibold rounded-md hover:bg-[#014D48] transition-colors">
                Post Your Event
              </button>
            </Link>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
