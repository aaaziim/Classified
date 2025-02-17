import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel,infiniteLoop,centerMode } from 'react-responsive-carousel';
const Banner = () => {
  return (
    <div>
       <Carousel infiniteLoop={true} centerMode={true}>
                <div>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2z-Qg3pe-RY9Lv8kQ4Ik3uFlebhYk4I9R0Q&s" />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2z-Qg3pe-RY9Lv8kQ4Ik3uFlebhYk4I9R0Q&s" />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2z-Qg3pe-RY9Lv8kQ4Ik3uFlebhYk4I9R0Q&s" />
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
    </div>
  )
}

export default Banner
