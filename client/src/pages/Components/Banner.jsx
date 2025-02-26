import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const Banner = () => {
  return (
    <div className="relative my-10">
      <Carousel
        infiniteLoop={true}
        centerMode={true}
        className="rounded-lg"
        showThumbs={false}
        showStatus={false}
        showIndicators={true}
        useKeyboardArrows={true}
      >
        <div className="relative">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2z-Qg3pe-RY9Lv8kQ4Ik3uFlebhYk4I9R0Q&s"
            alt="Banner 1"
          />
          <p className="absolute bottom-6 left-6 text-3xl text-[#FA8649] font-bold bg-[#001C27] bg-opacity-50 p-2 rounded-lg">
            Legend 1
          </p>
        </div>
        <div className="relative">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2z-Qg3pe-RY9Lv8kQ4Ik3uFlebhYk4I9R0Q&s"
            alt="Banner 2"
          />
          <p className="absolute bottom-6 left-6 text-3xl text-[#FA8649] font-bold bg-[#001C27] bg-opacity-50 p-2 rounded-lg">
            Legend 2
          </p>
        </div>
        <div className="relative">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2z-Qg3pe-RY9Lv8kQ4Ik3uFlebhYk4I9R0Q&s"
            alt="Banner 3"
          />
          <p className="absolute bottom-6 left-6 text-3xl text-[#FA8649] font-bold bg-[#001C27] bg-opacity-50 p-2 rounded-lg">
            Legend 3
          </p>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
